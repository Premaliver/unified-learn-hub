import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, FileText, Download, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Analytics = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "Active enrollments this year"
    },
    {
      title: "Reports Generated",
      value: "89",
      change: "+8.2%",
      trend: "up",
      icon: FileText,
      description: "Monthly report submissions"
    },
    {
      title: "Average Performance",
      value: "84.7%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp,
      description: "Student performance score"
    },
    {
      title: "Data Points",
      value: "15.2K",
      change: "+23.1%",
      trend: "up",
      icon: BarChart3,
      description: "Analytics data collected"
    },
  ];

  const chartData = [
    { month: "Jan", students: 1200, performance: 82 },
    { month: "Feb", students: 1250, performance: 83 },
    { month: "Mar", students: 1180, performance: 85 },
    { month: "Apr", students: 1220, performance: 84 },
    { month: "May", students: 1247, performance: 85 },
    { month: "Jun", students: 1247, performance: 84.7 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-foreground font-medium">Analytics</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive insights into your institution's performance and trends</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Last 30 Days
            </Button>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </div>
                  <stat.icon className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Performance Trends */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Performance Trends</h3>
                <p className="text-sm text-muted-foreground">Student performance over time</p>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className="w-full bg-primary/20 rounded-t"
                    style={{ height: `${(data.performance / 100) * 200}px` }}
                  ></div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Enrollment Growth */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Enrollment Growth</h3>
                <p className="text-sm text-muted-foreground">Student enrollment trends</p>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className="w-full bg-chart-2/20 rounded-t"
                    style={{ height: `${(data.students / 1300) * 200}px` }}
                  ></div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Analytics Insights */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performing Departments</h3>
            <div className="space-y-4">
              {[
                { name: "Computer Science", score: 92.5, students: 245 },
                { name: "Engineering", score: 89.3, students: 312 },
                { name: "Business Studies", score: 87.8, students: 198 },
              ].map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-sm text-muted-foreground">{dept.students} students</p>
                  </div>
                  <span className="text-lg font-bold text-primary">{dept.score}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[
                { action: "New student enrolled", time: "2 hours ago", type: "enrollment" },
                { action: "Report generated", time: "4 hours ago", type: "report" },
                { action: "Performance updated", time: "6 hours ago", type: "update" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4" />
                Generate Monthly Report
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <BarChart3 className="w-4 h-4" />
                View Detailed Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
