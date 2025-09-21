// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract PrivyPayrollVault is SepoliaConfig {
    using FHE for *;
    
    struct Payroll {
        euint32 payrollId;
        euint32 employeeCount;
        euint32 totalAmount;
        bool isActive;
        bool isVerified;
        string name;
        string description;
        address employer;
        uint256 createdAt;
        uint256 lastProcessed;
    }
    
    struct Employee {
        euint32 employeeId;
        euint32 salary;
        euint32 bonus;
        euint32 totalPaid;
        bool isActive;
        address employeeAddress;
        string name;
        string position;
        uint256 addedAt;
    }
    
    struct Payment {
        euint32 paymentId;
        euint32 amount;
        euint32 payrollId;
        euint32 employeeId;
        address employee;
        address employer;
        uint256 timestamp;
        bool isProcessed;
    }
    
    struct AuditRecord {
        euint32 auditId;
        euint32 payrollId;
        euint32 totalProcessed;
        euint32 employeeCount;
        bool isVerified;
        string auditHash;
        address auditor;
        uint256 timestamp;
    }
    
    mapping(uint256 => Payroll) public payrolls;
    mapping(uint256 => Employee) public employees;
    mapping(uint256 => Payment) public payments;
    mapping(uint256 => AuditRecord) public auditRecords;
    mapping(address => euint32) public employerReputation;
    mapping(address => euint32) public employeeReputation;
    
    uint256 public payrollCounter;
    uint256 public employeeCounter;
    uint256 public paymentCounter;
    uint256 public auditCounter;
    
    address public owner;
    address public verifier;
    
    event PayrollCreated(uint256 indexed payrollId, address indexed employer, string name);
    event EmployeeAdded(uint256 indexed employeeId, uint256 indexed payrollId, address indexed employee);
    event PaymentProcessed(uint256 indexed paymentId, uint256 indexed payrollId, address indexed employee, uint32 amount);
    event AuditCompleted(uint256 indexed auditId, uint256 indexed payrollId, address indexed auditor);
    event PayrollVerified(uint256 indexed payrollId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createPayroll(
        string memory _name,
        string memory _description
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Payroll name cannot be empty");
        
        uint256 payrollId = payrollCounter++;
        
        payrolls[payrollId] = Payroll({
            payrollId: FHE.asEuint32(0), // Will be set properly later
            employeeCount: FHE.asEuint32(0),
            totalAmount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            name: _name,
            description: _description,
            employer: msg.sender,
            createdAt: block.timestamp,
            lastProcessed: 0
        });
        
        emit PayrollCreated(payrollId, msg.sender, _name);
        return payrollId;
    }
    
    function addEmployee(
        uint256 payrollId,
        address employeeAddress,
        string memory name,
        string memory position,
        externalEuint32 salary,
        externalEuint32 bonus,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(payrolls[payrollId].employer == msg.sender, "Only employer can add employees");
        require(payrolls[payrollId].isActive, "Payroll must be active");
        require(employeeAddress != address(0), "Invalid employee address");
        
        uint256 employeeId = employeeCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalSalary = FHE.fromExternal(salary, inputProof);
        euint32 internalBonus = FHE.fromExternal(bonus, inputProof);
        
        employees[employeeId] = Employee({
            employeeId: FHE.asEuint32(0), // Will be set properly later
            salary: internalSalary,
            bonus: internalBonus,
            totalPaid: FHE.asEuint32(0),
            isActive: true,
            employeeAddress: employeeAddress,
            name: name,
            position: position,
            addedAt: block.timestamp
        });
        
        // Update payroll employee count
        payrolls[payrollId].employeeCount = FHE.add(payrolls[payrollId].employeeCount, FHE.asEuint32(1));
        
        emit EmployeeAdded(employeeId, payrollId, employeeAddress);
        return employeeId;
    }
    
    function processPayment(
        uint256 payrollId,
        uint256 employeeId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(payrolls[payrollId].employer == msg.sender, "Only employer can process payments");
        require(payrolls[payrollId].isActive, "Payroll must be active");
        require(employees[employeeId].isActive, "Employee must be active");
        require(employees[employeeId].employeeAddress != address(0), "Employee does not exist");
        
        uint256 paymentId = paymentCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        payments[paymentId] = Payment({
            paymentId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            payrollId: FHE.asEuint32(0), // Will be set properly later
            employeeId: FHE.asEuint32(0), // Will be set properly later
            employee: employees[employeeId].employeeAddress,
            employer: msg.sender,
            timestamp: block.timestamp,
            isProcessed: true
        });
        
        // Update employee total paid
        employees[employeeId].totalPaid = FHE.add(employees[employeeId].totalPaid, internalAmount);
        
        // Update payroll totals
        payrolls[payrollId].totalAmount = FHE.add(payrolls[payrollId].totalAmount, internalAmount);
        payrolls[payrollId].lastProcessed = block.timestamp;
        
        emit PaymentProcessed(paymentId, payrollId, employees[employeeId].employeeAddress, 0); // Amount will be decrypted off-chain
        return paymentId;
    }
    
    function submitAudit(
        uint256 payrollId,
        euint32 totalProcessed,
        euint32 employeeCount,
        string memory auditHash
    ) public returns (uint256) {
        require(payrolls[payrollId].employer == msg.sender, "Only employer can submit audit");
        require(payrolls[payrollId].isActive, "Payroll must be active");
        
        uint256 auditId = auditCounter++;
        
        auditRecords[auditId] = AuditRecord({
            auditId: FHE.asEuint32(0), // Will be set properly later
            payrollId: FHE.asEuint32(0), // Will be set properly later
            totalProcessed: totalProcessed,
            employeeCount: employeeCount,
            isVerified: false,
            auditHash: auditHash,
            auditor: msg.sender,
            timestamp: block.timestamp
        });
        
        emit AuditCompleted(auditId, payrollId, msg.sender);
        return auditId;
    }
    
    function verifyPayroll(uint256 payrollId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify payrolls");
        require(payrolls[payrollId].employer != address(0), "Payroll does not exist");
        
        payrolls[payrollId].isVerified = isVerified;
        emit PayrollVerified(payrollId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is employer or employee based on context
        if (payrolls[payrollCounter - 1].employer == user) {
            employerReputation[user] = reputation;
        } else {
            employeeReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getPayrollInfo(uint256 payrollId) public view returns (
        string memory name,
        string memory description,
        uint8 employeeCount,
        uint8 totalAmount,
        bool isActive,
        bool isVerified,
        address employer,
        uint256 createdAt,
        uint256 lastProcessed
    ) {
        Payroll storage payroll = payrolls[payrollId];
        return (
            payroll.name,
            payroll.description,
            0, // FHE.decrypt(payroll.employeeCount) - will be decrypted off-chain
            0, // FHE.decrypt(payroll.totalAmount) - will be decrypted off-chain
            payroll.isActive,
            payroll.isVerified,
            payroll.employer,
            payroll.createdAt,
            payroll.lastProcessed
        );
    }
    
    function getEmployeeInfo(uint256 employeeId) public view returns (
        uint8 salary,
        uint8 bonus,
        uint8 totalPaid,
        bool isActive,
        address employeeAddress,
        string memory name,
        string memory position,
        uint256 addedAt
    ) {
        Employee storage employee = employees[employeeId];
        return (
            0, // FHE.decrypt(employee.salary) - will be decrypted off-chain
            0, // FHE.decrypt(employee.bonus) - will be decrypted off-chain
            0, // FHE.decrypt(employee.totalPaid) - will be decrypted off-chain
            employee.isActive,
            employee.employeeAddress,
            employee.name,
            employee.position,
            employee.addedAt
        );
    }
    
    function getPaymentInfo(uint256 paymentId) public view returns (
        uint8 amount,
        uint8 payrollId,
        uint8 employeeId,
        address employee,
        address employer,
        uint256 timestamp,
        bool isProcessed
    ) {
        Payment storage payment = payments[paymentId];
        return (
            0, // FHE.decrypt(payment.amount) - will be decrypted off-chain
            0, // FHE.decrypt(payment.payrollId) - will be decrypted off-chain
            0, // FHE.decrypt(payment.employeeId) - will be decrypted off-chain
            payment.employee,
            payment.employer,
            payment.timestamp,
            payment.isProcessed
        );
    }
    
    function getAuditInfo(uint256 auditId) public view returns (
        uint8 totalProcessed,
        uint8 employeeCount,
        bool isVerified,
        string memory auditHash,
        address auditor,
        uint256 timestamp
    ) {
        AuditRecord storage audit = auditRecords[auditId];
        return (
            0, // FHE.decrypt(audit.totalProcessed) - will be decrypted off-chain
            0, // FHE.decrypt(audit.employeeCount) - will be decrypted off-chain
            audit.isVerified,
            audit.auditHash,
            audit.auditor,
            audit.timestamp
        );
    }
    
    function getEmployerReputation(address employer) public view returns (uint8) {
        return 0; // FHE.decrypt(employerReputation[employer]) - will be decrypted off-chain
    }
    
    function getEmployeeReputation(address employee) public view returns (uint8) {
        return 0; // FHE.decrypt(employeeReputation[employee]) - will be decrypted off-chain
    }
    
    function deactivateEmployee(uint256 employeeId) public {
        require(employees[employeeId].employeeAddress != address(0), "Employee does not exist");
        require(payrolls[payrollCounter - 1].employer == msg.sender, "Only employer can deactivate employees");
        
        employees[employeeId].isActive = false;
    }
    
    function deactivatePayroll(uint256 payrollId) public {
        require(payrolls[payrollId].employer == msg.sender, "Only employer can deactivate payroll");
        
        payrolls[payrollId].isActive = false;
    }
    
    function encryptAndStoreData(
        uint256 payrollId,
        externalEuint32 encryptedData,
        bytes calldata inputProof,
        string memory dataType
    ) public returns (bool) {
        require(payrolls[payrollId].employer == msg.sender, "Only employer can store encrypted data");
        require(payrolls[payrollId].isActive, "Payroll must be active");
        
        // Convert external encrypted data to internal format
        euint32 internalData = FHE.fromExternal(encryptedData, inputProof);
        
        // Store encrypted data (this is just a placeholder - in real implementation,
        // you would store this in a mapping or emit an event)
        emit EncryptedDataStored(payrollId, dataType, block.timestamp);
        
        return true;
    }
    
    function verifyEncryptedData(
        uint256 payrollId,
        euint32 encryptedData1,
        euint32 encryptedData2
    ) public view returns (bool) {
        require(payrolls[payrollId].employer == msg.sender, "Only employer can verify data");
        
        // Perform homomorphic comparison without decrypting
        ebool isEqual = FHE.eq(encryptedData1, encryptedData2);
        
        // This would return the encrypted result
        // In a real implementation, you would emit an event with the encrypted result
        return true; // Placeholder - actual implementation would handle encrypted boolean
    }
    
    event EncryptedDataStored(uint256 indexed payrollId, string dataType, uint256 timestamp);
}
