import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Award, FileText, Users, GraduationCap, Download, Calendar } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import NIRFChart from "@/components/dashboard/NIRFChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  const stats = [
    { title: "Total Students", value: "12,459", change: "+12%", icon: Users, trend: "up" as const },
    { title: "NIRF Rank", value: "48", change: "+5 positions", icon: Award, trend: "up" as const },
    { title: "Faculty Members", value: "856", change: "+8%", icon: GraduationCap, trend: "up" as const },
    { title: "Active Projects", value: "127", change: "+18%", icon: Building2, trend: "up" as const },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Institution Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your institution overview</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Select Period
            </Button>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* NIRF Performance Chart */}
          <Card className="lg:col-span-2 p-6 gradient-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">NIRF Performance Trends</h3>
                <p className="text-sm text-muted-foreground">Track your institution's NIRF parameters over time</p>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
            <NIRFChart />
          </Card>

          {/* Quick Actions */}
          <QuickActions />
        </div>

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <RecentActivity />
          </Card>

          {/* Compliance Status */}
          <Card className="p-6 gradient-card">
            <h3 className="text-lg font-semibold mb-4">Compliance Status</h3>
            <div className="space-y-4">
              {[
                { name: "NIRF Submission", status: "Completed", color: "accent" },
                { name: "NAAC Accreditation", status: "In Progress", color: "chart-3" },
                { name: "NBA Approval", status: "Pending", color: "destructive" },
                { name: "UGC Compliance", status: "Completed", color: "accent" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full bg-${item.color}/10 text-${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">Update Status</Button>
          </Card>
        </div>

        {/* Government Schemes */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Active Government Schemes</h3>
              <p className="text-sm text-muted-foreground">Track participation and beneficiaries</p>
            </div>
            <Button variant="outline">View All Schemes</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "PM-USHA", beneficiaries: 245, amount: "₹12.5L", status: "Active" },
              { name: "RUSA", beneficiaries: 180, amount: "₹8.2L", status: "Active" },
              { name: "National Scholarship", beneficiaries: 567, amount: "₹28.4L", status: "Active" },
            ].map((scheme, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-primary">
                <h4 className="font-semibold mb-2">{scheme.name}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Beneficiaries:</span>
                    <span className="font-medium">{scheme.beneficiaries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <span className="font-medium">{scheme.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-accent font-medium">{scheme.status}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
