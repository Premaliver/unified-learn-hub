import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  GraduationCap,
  Calendar
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    {
      id: 1,
      name: "Prem Kumar",
      email: "prem.kumar@email.com",
      phone: "+91 9876543210",
      course: "Computer Science",
      year: "3rd Year",
      enrollmentNumber: "CS2021001",
      status: "Active",
      cgpa: 8.7,
      joinDate: "2021-08-15"
    },
    {
      id: 2,
      name: "Ridhi",
      email: "ridhi@email.com",
      phone: "+91 9876543211",
      course: "Engineering",
      year: "2nd Year",
      enrollmentNumber: "EN2021002",
      status: "Active",
      cgpa: 9.2,
      joinDate: "2021-08-15"
    },
    {
      id: 3,
      name: "Shrish Kumar Sharma",
      email: "shrish.sharma@email.com",
      phone: "+91 9876543212",
      course: "Business Studies",
      year: "4th Year",
      enrollmentNumber: "BS2020003",
      status: "Inactive",
      cgpa: 7.8,
      joinDate: "2020-08-15"
    },
    {
      id: 4,
      name: "Neha",
      email: "neha@email.com",
      phone: "+91 9876543213",
      course: "Computer Science",
      year: "1st Year",
      enrollmentNumber: "CS2022004",
      status: "Active",
      cgpa: 8.9,
      joinDate: "2022-08-15"
    },
    {
      id: 5,
      name: "Sahil Kaushal",
      email: "sahil.kaushal@email.com",
      phone: "+91 9876543214",
      course: "Engineering",
      year: "3rd Year",
      enrollmentNumber: "EN2021005",
      status: "Active",
      cgpa: 8.4,
      joinDate: "2021-08-15"
    },
    {
      id: 6,
      name: "Pragati",
      email: "pragati@email.com",
      phone: "+91 9876543215",
      course: "Computer Science",
      year: "2nd Year",
      enrollmentNumber: "CS2021006",
      status: "Active",
      cgpa: 8.8,
      joinDate: "2021-08-15"
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-foreground font-medium">Students</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Student Management</h1>
            <p className="text-muted-foreground">Manage and track all student information and performance</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Student
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold">{students.filter(s => s.status === 'Active').length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">New This Year</p>
                <p className="text-2xl font-bold">{students.filter(s => s.joinDate.startsWith('2022')).length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg CGPA</p>
                <p className="text-2xl font-bold">
                  {(students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(1)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search students by name, email, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Students Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Student</th>
                  <th className="text-left p-4 font-medium">Course & Year</th>
                  <th className="text-left p-4 font-medium">Enrollment</th>
                  <th className="text-left p-4 font-medium">CGPA</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-t hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                        <p className="text-sm text-muted-foreground">{student.phone}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{student.course}</p>
                        <p className="text-sm text-muted-foreground">{student.year}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-mono text-sm">{student.enrollmentNumber}</p>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">{student.cgpa}</span>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredStudents.length} of {students.length} students
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Students;
