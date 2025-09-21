import { ethers } from "hardhat";

async function main() {
  console.log("Deploying PrivyPayrollVault contract...");

  // Get the contract factory
  const PrivyPayrollVault = await ethers.getContractFactory("PrivyPayrollVault");

  // Deploy the contract with a verifier address (you can change this)
  const verifierAddress = process.env.VERIFIER_ADDRESS || "0x0000000000000000000000000000000000000000";
  const payrollVault = await PrivyPayrollVault.deploy(verifierAddress);

  await payrollVault.waitForDeployment();

  const contractAddress = await payrollVault.getAddress();
  console.log("PrivyPayrollVault deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifierAddress,
    network: "sepolia",
    deployedAt: new Date().toISOString(),
  };

  console.log("Deployment completed successfully!");
  console.log("Contract Address:", contractAddress);
  console.log("Verifier Address:", verifierAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
