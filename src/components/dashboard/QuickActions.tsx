import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Users, BarChart3, Download, Calendar } from "lucide-react";

const QuickActions = () => {
  const actions = [
    { icon: FileText, label: "Generate Report", variant: "default" as const },
    { icon: Upload, label: "Upload Data", variant: "outline" as const },
    { icon: Users, label: "Add Student", variant: "outline" as const },
    { icon: BarChart3, label: "View Analytics", variant: "outline" as const },
    { icon: Download, label: "Export Data", variant: "outline" as const },
    { icon: Calendar, label: "Schedule Review", variant: "outline" as const },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            className="h-20 flex flex-col gap-2"
          >
            <action.icon className="w-5 h-5" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
