import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import EmployeeTable from "@/components/EmployeeTable";
import AuditPanel from "@/components/AuditPanel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <Tabs defaultValue="payroll" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="payroll">Payroll Dashboard</TabsTrigger>
            <TabsTrigger value="audit">Audit Verification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="payroll" className="space-y-6">
            <EmployeeTable />
          </TabsContent>
          
          <TabsContent value="audit" className="space-y-6">
            <AuditPanel />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
