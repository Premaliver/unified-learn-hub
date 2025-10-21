import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Award, FileText, Download, Calendar, TrendingUp, Target } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";

const StudentDashboard = () => {
  const stats = [
    { title: "Current CGPA", value: "8.7", change: "+0.3", icon: TrendingUp, trend: "up" as const },
    { title: "Attendance", value: "92%", change: "+5%", icon: Target, trend: "up" as const },
    { title: "Credits Earned", value: "142", change: "+18", icon: Award, trend: "up" as const },
    { title: "Active Courses", value: "6", change: "This semester", icon: BookOpen, trend: "up" as const },
  ];

  const quickActions = [
    { icon: FileText, label: "View Grades", variant: "default" as const },
    { icon: Download, label: "Download Transcript", variant: "outline" as const },
    { icon: Calendar, label: "Exam Schedule", variant: "outline" as const },
    { icon: Users, label: "Class Groups", variant: "outline" as const },
    { icon: BookOpen, label: "Course Materials", variant: "outline" as const },
    { icon: Award, label: "Scholarships", variant: "outline" as const },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Track your academic progress</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Academic Calendar
            </Button>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Download Report
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
                <p className="text-sm text-muted-foreground">Your enrolled courses for this semester</p>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {[
                { code: "CS101", name: "Data Structures", instructor: "Dr. Smith", progress: 75 },
                { code: "CS201", name: "Algorithms", instructor: "Prof. Johnson", progress: 60 },
                { code: "CS301", name: "Database Systems", instructor: "Dr. Brown", progress: 85 },
                { code: "CS401", name: "Web Development", instructor: "Prof. Davis", progress: 90 },
              ].map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{course.code} - {course.name}</h4>
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
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
                  <Button variant="ghost" size="sm">View Details</Button>
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
          {/* Recent Grades */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Grades</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {[
                { subject: "Data Structures", grade: "A", marks: "92/100", semester: "Fall 2024" },
                { subject: "Discrete Mathematics", grade: "A-", marks: "88/100", semester: "Fall 2024" },
                { subject: "Computer Networks", grade: "B+", marks: "85/100", semester: "Spring 2024" },
                { subject: "Operating Systems", grade: "A", marks: "95/100", semester: "Spring 2024" },
              ].map((grade, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <h4 className="font-medium">{grade.subject}</h4>
                    <p className="text-sm text-muted-foreground">{grade.semester}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">{grade.grade}</div>
                    <div className="text-sm text-muted-foreground">{grade.marks}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6 gradient-card">
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {[
                { title: "Mid-term Examination", date: "Dec 15, 2024", type: "Exam" },
                { title: "Project Submission", date: "Dec 20, 2024", type: "Deadline" },
                { title: "Career Fair", date: "Jan 10, 2025", type: "Event" },
                { title: "Semester End Exams", date: "Jan 15-25, 2025", type: "Exam" },
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

        {/* Scholarships & Financial Aid */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Scholarships & Financial Aid</h3>
              <p className="text-sm text-muted-foreground">Available opportunities and your applications</p>
            </div>
            <Button variant="outline">Browse Scholarships</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Merit Scholarship", amount: "₹50,000", status: "Applied", deadline: "Dec 31, 2024" },
              { name: "Need-based Aid", amount: "₹30,000", status: "Eligible", deadline: "Jan 15, 2025" },
              { name: "Sports Scholarship", amount: "₹25,000", status: "Available", deadline: "Feb 1, 2025" },
            ].map((scholarship, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-primary">
                <h4 className="font-semibold mb-2">{scholarship.name}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">{scholarship.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="font-medium">{scholarship.deadline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`font-medium ${
                      scholarship.status === 'Applied' ? 'text-accent' :
                      scholarship.status === 'Eligible' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {scholarship.status}
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

export default StudentDashboard;
