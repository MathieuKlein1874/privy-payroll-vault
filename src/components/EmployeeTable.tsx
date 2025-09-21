import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  DollarSign, 
  Calendar,
  Shield,
  CheckCircle,
  Clock
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  department: string;
  salary: number;
  status: 'processed' | 'pending' | 'claimed';
  lastPayment: string;
  walletAddress?: string;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    department: "Engineering",
    salary: 8500,
    status: "processed",
    lastPayment: "2024-03-15",
    walletAddress: "0x742d35Cc12345678"
  },
  {
    id: "2", 
    name: "Michael Chen",
    department: "Design",
    salary: 7200,
    status: "claimed",
    lastPayment: "2024-03-15",
    walletAddress: "0x853e46Dd87654321"
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    department: "Marketing",
    salary: 6800,
    status: "pending",
    lastPayment: "2024-03-01",
  },
  {
    id: "4",
    name: "David Park",
    department: "Engineering",
    salary: 9200,
    status: "processed",
    lastPayment: "2024-03-15",
    walletAddress: "0x964f57Ee98765432"
  }
];

const EmployeeTable = () => {
  const [privacyStates, setPrivacyStates] = useState<Record<string, boolean>>({});
  
  const togglePrivacy = (employeeId: string) => {
    setPrivacyStates(prev => ({
      ...prev,
      [employeeId]: !prev[employeeId]
    }));
  };

  const formatSalary = (salary: number, isHidden: boolean) => {
    if (isHidden) {
      return "●●●●●●";
    }
    return `$${salary.toLocaleString()}`;
  };

  const getStatusBadge = (status: Employee['status']) => {
    switch (status) {
      case 'processed':
        return (
          <Badge className="bg-verified text-verified-foreground">
            <CheckCircle className="h-3 w-3 mr-1" />
            Processed
          </Badge>
        );
      case 'claimed':
        return (
          <Badge className="bg-accent text-accent-foreground">
            <DollarSign className="h-3 w-3 mr-1" />
            Claimed
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-pending text-pending-foreground">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Employee Payroll</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>All data encrypted at rest</span>
        </div>
      </div>

      <div className="grid gap-4">
        {mockEmployees.map((employee) => {
          const isPrivate = privacyStates[employee.id] !== false; // Default to private
          
          return (
            <Card key={employee.id} className="p-6 shadow-card hover:shadow-elevated transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePrivacy(employee.id)}
                      className="h-8 w-8 p-0"
                    >
                      {isPrivate ? (
                        <Lock className="h-4 w-4 text-privacy animate-pulse-privacy" />
                      ) : (
                        <Unlock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-foreground">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.department}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-foreground">
                        {formatSalary(employee.salary, isPrivate)}
                      </span>
                      {isPrivate ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Last: {employee.lastPayment}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {getStatusBadge(employee.status)}
                    
                    {employee.walletAddress && (
                      <Badge variant="outline" className="font-mono text-xs">
                        {employee.walletAddress.slice(0, 6)}...{employee.walletAddress.slice(-4)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeTable;