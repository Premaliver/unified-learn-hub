import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Award, FileText, Download, Calendar, TrendingUp, Target, GraduationCap, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";

const FacultyDashboard = () => {
  const stats = [
    { title: "Students Taught", value: "45", change: "+3", icon: Users, trend: "up" as const },
    { title: "Courses This Semester", value: "3", change: "Active", icon: BookOpen, trend: "up" as const },
    { title: "Research Publications", value: "12", change: "+2", icon: FileText, trend: "up" as const },
    { title: "Student Satisfaction", value: "4.8/5", change: "+0.2", icon: Award, trend: "up" as const },
  ];

  const quickActions = [
    { icon: BookOpen, label: "Manage Courses", variant: "default" as const },
    { icon: Users, label: "Student Records", variant: "outline" as const },
    { icon: FileText, label: "Grade Submissions", variant: "outline" as const },
    { icon: BarChart3, label: "Performance Reports", variant: "outline" as const },
    { icon: Calendar, label: "Schedule", variant: "outline" as const },
    { icon: Award, label: "Research", variant: "outline" as const },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Faculty Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Manage your teaching and research activities</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Academic Calendar
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
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Current Courses */}
          <Card className="lg:col-span-2 p-6 gradient-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Current Semester Courses</h3>
                <p className="text-sm text-muted-foreground">Courses you're teaching this semester</p>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {[
                { code: "CS301", name: "Data Structures & Algorithms", students: 35, progress: 65 },
                { code: "CS401", name: "Database Management Systems", students: 28, progress: 45 },
                { code: "CS501", name: "Advanced Programming", students: 22, progress: 80 },
              ].map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{course.code} - {course.name}</h4>
                    <p className="text-sm text-muted-foreground">{course.students} students enrolled</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Semester Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Manage</Button>
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
          {/* Recent Activities */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Activities</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {[
                { action: "Graded assignments for CS301", time: "2 hours ago", type: "Grading" },
                { action: "Submitted research paper to IEEE", time: "1 day ago", type: "Research" },
                { action: "Updated course syllabus for CS401", time: "2 days ago", type: "Course Management" },
                { action: "Conducted parent-teacher meeting", time: "3 days ago", type: "Meeting" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 py-3 border-b last:border-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{activity.action}</h4>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                    {activity.type}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6 gradient-card">
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {[
                { title: "Department Meeting", date: "Dec 15, 2024", type: "Meeting" },
                { title: "Research Conference", date: "Dec 20, 2024", type: "Conference" },
                { title: "Final Exams", date: "Jan 10-20, 2025", type: "Examination" },
                { title: "Faculty Development Workshop", date: "Jan 25, 2025", type: "Training" },
              ].map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">View Calendar</Button>
          </Card>
        </div>

        {/* Research & Publications */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Research & Publications</h3>
              <p className="text-sm text-muted-foreground">Your research contributions and upcoming publications</p>
            </div>
            <Button variant="outline">Add Publication</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Machine Learning in Education", status: "Published", journal: "IEEE Transactions", year: "2024" },
              { title: "Database Optimization Techniques", status: "Under Review", journal: "ACM Computing", year: "2024" },
              { title: "AI Ethics in Academia", status: "In Progress", journal: "Nature", year: "2025" },
            ].map((publication, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-primary">
                <h4 className="font-semibold mb-2">{publication.title}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Journal:</span>
                    <span className="font-medium">{publication.journal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year:</span>
                    <span className="font-medium">{publication.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`font-medium ${
                      publication.status === 'Published' ? 'text-green-600' :
                      publication.status === 'Under Review' ? 'text-yellow-600' : 'text-blue-600'
                    }`}>
                      {publication.status}
                    </span>
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

export default FacultyDashboard;
