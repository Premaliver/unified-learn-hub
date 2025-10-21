import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Users, BarChart3, Download, Calendar } from "lucide-react";

const QuickActions = () => {
  const actions = [
    { icon: FileText, label: "Generate Report", variant: "default" as const, onClick: () => console.log("Generate Report clicked") },
    { icon: Upload, label: "Upload Data", variant: "outline" as const, onClick: () => console.log("Upload Data clicked") },
    { icon: Users, label: "Add Student", variant: "outline" as const, onClick: () => console.log("Add Student clicked") },
    { icon: BarChart3, label: "View Analytics", variant: "outline" as const, onClick: () => console.log("View Analytics clicked") },
    { icon: Download, label: "Export Data", variant: "outline" as const, onClick: () => console.log("Export Data clicked") },
    { icon: Calendar, label: "Schedule Review", variant: "outline" as const, onClick: () => console.log("Schedule Review clicked") },
  ];

  return (
    <Card className="p-6 hover-lift transition-all duration-300">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            onClick={action.onClick}
            className="h-20 flex flex-col gap-2 hover-lift transition-all duration-300 group animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <action.icon className="w-5 h-5 group-hover:animate-bounce transition-transform duration-300" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
