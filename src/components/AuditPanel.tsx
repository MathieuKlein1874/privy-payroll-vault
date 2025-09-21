import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Key,
  Lock,
  Unlock
} from "lucide-react";

interface AuditRecord {
  id: string;
  employeeId: string;
  amount: string;
  hash: string;
  timestamp: string;
  verified: boolean;
}

const mockAuditRecords: AuditRecord[] = [
  {
    id: "audit-1",
    employeeId: "emp-001",
    amount: "8500.00 USDC", 
    hash: "0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
    timestamp: "2024-03-15T10:30:00Z",
    verified: true
  },
  {
    id: "audit-2", 
    employeeId: "emp-002",
    amount: "7200.00 USDC",
    hash: "0xb2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1",
    timestamp: "2024-03-15T10:35:00Z", 
    verified: true
  },
  {
    id: "audit-3",
    employeeId: "emp-004", 
    amount: "9200.00 USDC",
    hash: "0xc3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2",
    timestamp: "2024-03-15T10:40:00Z",
    verified: false
  }
];

const AuditPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);

  const filteredRecords = mockAuditRecords.filter(record => 
    record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.hash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Audit Verification</h2>
          <p className="text-sm text-muted-foreground">Verify encrypted payroll transactions</p>
        </div>
        <Badge className="bg-verified text-verified-foreground">
          <Shield className="h-3 w-3 mr-1" />
          Audit Mode Active
        </Badge>
      </div>

      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by employee ID or transaction hash..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
      </Card>

      <div className="grid gap-4">
        {filteredRecords.map((record) => (
          <Card 
            key={record.id} 
            className={`p-4 cursor-pointer transition-all ${
              selectedRecord === record.id ? 'ring-2 ring-primary shadow-elevated' : 'shadow-card hover:shadow-elevated'
            }`}
            onClick={() => setSelectedRecord(record.id === selectedRecord ? null : record.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {record.verified ? (
                    <CheckCircle className="h-5 w-5 text-verified" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-pending" />
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">
                        Employee: {record.employeeId}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {record.amount}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(record.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {record.verified ? (
                  <Badge className="bg-verified text-verified-foreground">
                    <Unlock className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge className="bg-pending text-pending-foreground">
                    <Lock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                )}
                
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {selectedRecord === record.id && (
              <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Transaction Hash:</span>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-xs font-mono text-foreground break-all">
                    {record.hash}
                  </code>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline">
                    View on Explorer
                  </Button>
                  <Button size="sm" variant="outline">
                    Download Report
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AuditPanel;