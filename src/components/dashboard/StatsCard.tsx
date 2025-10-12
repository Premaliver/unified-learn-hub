import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
}

const StatsCard = ({ title, value, change, icon: Icon, trend }: StatsCardProps) => {
  return (
    <Card className="p-6 gradient-card hover:shadow-elevated transition-all duration-300 animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-sm font-medium",
          trend === "up" ? "text-accent" : "text-destructive"
        )}>
          {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </Card>
  );
};

export default StatsCard;
