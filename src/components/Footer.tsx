import officeDeskIcons from "@/assets/office-desk-icons.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 py-6 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            Secure payroll distribution powered by blockchain technology
          </p>
        </div>
        
        <div className="relative h-16 overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="animate-scroll-desk whitespace-nowrap flex items-center">
              <img 
                src={officeDeskIcons} 
                alt="Office desk icons" 
                className="h-12 opacity-60"
              />
              <div className="w-32"></div>
              <img 
                src={officeDeskIcons} 
                alt="Office desk icons" 
                className="h-12 opacity-60"
              />
              <div className="w-32"></div>
              <img 
                src={officeDeskIcons} 
                alt="Office desk icons" 
                className="h-12 opacity-60"
              />
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Confidential Payroll Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;