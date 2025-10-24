import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Plus,
  Eye,
  Trash2,
  FileBarChart,
  FileSpreadsheet,
  FileImage,
  Clock
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Reports = () => {
  const [filter, setFilter] = useState("all");

  const reports = [
    {
      id: 1,
      title: "Monthly Student Performance Report",
      type: "Performance",
      format: "PDF",
      size: "2.4 MB",
      generatedBy: "Dr. Sarah Johnson",
      generatedAt: "2024-01-15 10:30 AM",
      status: "Completed",
      description: "Comprehensive analysis of student performance across all departments"
    },
    {
      id: 2,
      title: "NIRF Ranking Analysis 2024",
      type: "Analytics",
      format: "Excel",
      size: "5.1 MB",
      generatedBy: "Prof. Michael Chen",
      generatedAt: "2024-01-14 03:45 PM",
      status: "Completed",
      description: "Detailed NIRF ranking metrics and improvement recommendations"
    },
    {
      id: 3,
      title: "Government Schemes Beneficiary Report",
      type: "Compliance",
      format: "PDF",
      size: "1.8 MB",
      generatedBy: "Ms. Priya Sharma",
      generatedAt: "2024-01-13 09:15 AM",
      status: "Completed",
      description: "Overview of students benefiting from various government schemes"
    },
    {
      id: 4,
      title: "Faculty Research Publications Q4",
      type: "Research",
      format: "Word",
      size: "3.2 MB",
      generatedBy: "Dr. Rajesh Kumar",
      generatedAt: "2024-01-12 02:20 PM",
      status: "Processing",
      description: "Quarterly report on faculty research publications and citations"
    },
    {
      id: 5,
      title: "Infrastructure Utilization Report",
      type: "Operations",
      format: "PDF",
      size: "4.7 MB",
      generatedBy: "Mr. Amit Patel",
      generatedAt: "2024-01-11 11:00 AM",
      status: "Completed",
      description: "Analysis of campus facilities usage and maintenance requirements"
    },
    {
      id: 6,
      title: "Student Attendance Summary",
      type: "Attendance",
      format: "Excel",
      size: "890 KB",
      generatedBy: "Ms. Lisa Wong",
      generatedAt: "2024-01-10 04:30 PM",
      status: "Failed",
      description: "Monthly attendance statistics and trends analysis"
    }
  ];

  const filteredReports = filter === "all" ? reports : reports.filter(report => report.type.toLowerCase() === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF': return <FileText className="w-4 h-4" />;
      case 'Excel': return <FileSpreadsheet className="w-4 h-4" />;
      case 'Word': return <FileBarChart className="w-4 h-4" />;
      default: return <FileImage className="w-4 h-4" />;
    }
  };

  const reportTypes = ["all", "performance", "analytics", "compliance", "research", "operations", "attendance"];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-foreground font-medium">Reports</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate, manage, and download comprehensive institutional reports</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Generate New Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === 'Completed').length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === 'Processing').length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === 'Failed').length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All Reports
            </Button>
            {reportTypes.slice(1).map((type) => (
              <Button
                key={type}
                variant={filter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-muted rounded-lg">
                    {getFormatIcon(report.format)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{report.title}</h3>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      <Badge variant="outline">{report.type}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{report.description}</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span>Generated by: {report.generatedBy}</span>
                      <span>Size: {report.size}</span>
                      <span>Format: {report.format}</span>
                      <span>{report.generatedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Report Generation</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <FileText className="w-6 h-6" />
              <span>Monthly Performance</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <FileSpreadsheet className="w-6 h-6" />
              <span>Student Data Export</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <FileBarChart className="w-6 h-6" />
              <span>NIRF Analysis</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span>Attendance Summary</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <FileText className="w-6 h-6" />
              <span>Compliance Report</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Filter className="w-6 h-6" />
              <span>Custom Report</span>
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
