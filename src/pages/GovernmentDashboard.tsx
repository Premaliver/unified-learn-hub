import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Award, FileText, Users, GraduationCap, Download, Calendar, BarChart3, Shield, Globe, Target } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";

const GovernmentDashboard = () => {
  const stats = [
    { title: "Total Institutions", value: "1,247", change: "+23", icon: Building2, trend: "up" as const },
    { title: "Active Schemes", value: "45", change: "+5", icon: Target, trend: "up" as const },
    { title: "Beneficiaries", value: "2.3M", change: "+12%", icon: Users, trend: "up" as const },
    { title: "Fund Allocation", value: "₹1,250Cr", change: "+8%", icon: TrendingUp, trend: "up" as const },
  ];

  const quickActions = [
    { icon: BarChart3, label: "View Analytics", variant: "default" as const },
    { icon: Building2, label: "Institution Oversight", variant: "outline" as const },
    { icon: Target, label: "Scheme Management", variant: "outline" as const },
    { icon: Shield, label: "Compliance Monitoring", variant: "outline" as const },
    { icon: FileText, label: "Policy Updates", variant: "outline" as const },
    { icon: Globe, label: "Regional Reports", variant: "outline" as const },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Government Dashboard</h1>
            <p className="text-muted-foreground">Oversee education sector performance and policy implementation</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Policy Calendar
            </Button>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              National Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* National Performance Overview */}
          <Card className="lg:col-span-2 p-6 gradient-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">National Education Performance</h3>
                <p className="text-sm text-muted-foreground">Key metrics across all educational institutions</p>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { metric: "Average NIRF Score", value: "68.5", change: "+2.3", trend: "up" },
                { metric: "Student Enrollment", value: "3.2M", change: "+5.2%", trend: "up" },
                { metric: "Faculty Qualification", value: "87%", change: "+1.5%", trend: "up" },
                { metric: "Research Output", value: "12,450", change: "+8.7%", trend: "up" },
              ].map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">{item.metric}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{item.value}</span>
                    <span className={`text-sm ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 hover-lift transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  className="h-20 flex flex-col gap-2 hover-lift transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <action.icon className="w-5 h-5 group-hover:animate-bounce transition-transform duration-300" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Active Government Schemes */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Active Government Schemes</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {[
                { name: "PM-USHA", beneficiaries: 45000, budget: "₹250Cr", status: "Active" },
                { name: "RUSA", beneficiaries: 32000, budget: "₹180Cr", status: "Active" },
                { name: "National Scholarship", beneficiaries: 125000, budget: "₹450Cr", status: "Active" },
                { name: "Digital Education", beneficiaries: 89000, budget: "₹120Cr", status: "Active" },
              ].map((scheme, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <h4 className="font-medium">{scheme.name}</h4>
                    <p className="text-sm text-muted-foreground">{scheme.beneficiaries.toLocaleString()} beneficiaries</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{scheme.budget}</div>
                    <div className="text-sm text-accent">{scheme.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Regional Performance */}
          <Card className="p-6 gradient-card">
            <h3 className="text-lg font-semibold mb-4">Regional Performance</h3>
            <div className="space-y-4">
              {[
                { region: "North India", institutions: 423, avgScore: 72.3, status: "Excellent" },
                { region: "South India", institutions: 387, avgScore: 68.9, status: "Good" },
                { region: "East India", institutions: 298, avgScore: 65.4, status: "Improving" },
                { region: "West India", institutions: 345, avgScore: 70.1, status: "Good" },
              ].map((region, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{region.region}</h4>
                    <p className="text-sm text-muted-foreground">{region.institutions} institutions</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{region.avgScore}</div>
                    <div className="text-sm text-accent">{region.status}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">View Regional Reports</Button>
          </Card>
        </div>

        {/* Policy Implementation Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Policy Implementation Status</h3>
              <p className="text-sm text-muted-foreground">Track NEP 2020 and other education policy rollouts</p>
            </div>
            <Button variant="outline">Update Status</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { policy: "NEP 2020", progress: 78, status: "On Track", color: "accent" },
              { policy: "Digital Infrastructure", progress: 65, status: "In Progress", color: "chart-3" },
              { policy: "Teacher Training", progress: 82, status: "Excellent", color: "accent" },
              { policy: "Student Assessment", progress: 71, status: "On Track", color: "accent" },
            ].map((policy, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-primary">
                <h4 className="font-semibold mb-2">{policy.policy}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{policy.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${policy.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-muted-foreground">{policy.status}</div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GovernmentDashboard;
