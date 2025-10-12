import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      title: "NIRF Data Submission",
      description: "Annual NIRF report submitted successfully",
      time: "2 hours ago",
      status: "success",
      icon: CheckCircle2
    },
    {
      title: "Student Enrollment",
      description: "125 new students enrolled for Fall 2024",
      time: "5 hours ago",
      status: "success",
      icon: CheckCircle2
    },
    {
      title: "Pending Accreditation",
      description: "NAAC accreditation review scheduled",
      time: "1 day ago",
      status: "pending",
      icon: Clock
    },
    {
      title: "Faculty Performance Review",
      description: "Q4 faculty evaluations in progress",
      time: "2 days ago",
      status: "pending",
      icon: Clock
    },
    {
      title: "Compliance Alert",
      description: "NBA approval deadline approaching",
      time: "3 days ago",
      status: "alert",
      icon: AlertCircle
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-accent";
      case "pending":
        return "text-chart-3";
      case "alert":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
          <div className={`p-2 rounded-full bg-muted ${getStatusColor(activity.status)}`}>
            <activity.icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm">{activity.title}</p>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
