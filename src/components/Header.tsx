import { Badge } from "@/components/ui/badge";
import { Lock, DollarSign } from "lucide-react";
import { WalletConnect } from "./WalletConnect";

const Header = () => {
  return (
    <header className="bg-gradient-primary border-b border-border/50 shadow-privacy">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">
                  Privy Payroll Vault
                </h1>
                <p className="text-sm text-primary-foreground/80 flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Encrypted payroll management
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-verified text-verified-foreground">
              <Lock className="h-3 w-3 mr-1" />
              Encrypted
            </Badge>
            
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;