import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  GraduationCap,
  Menu,
  X,
  LogOut,
  Bell,
  User,
  BookOpen,
  Award,
  Building2,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userProfile } = useAuth();

  const handleSignOut = async () => {
    await logout();
    toast.success("Signed out successfully!");
    navigate("/auth");
  };

  // Role-based navigation
  const getNavigation = () => {
    const role = userProfile?.role;

    switch (role) {
      case 'student':
        return [
          { name: "Dashboard", href: "/student-dashboard", icon: LayoutDashboard },
          { name: "My Courses", href: "/analytics", icon: BookOpen },
          { name: "Grades", href: "/reports", icon: Award },
          { name: "Profile", href: "/profile", icon: User },
          { name: "Settings", href: "/settings", icon: Settings },
        ];
      case 'teacher':
        return [
          { name: "Dashboard", href: "/faculty-dashboard", icon: LayoutDashboard },
          { name: "My Courses", href: "/analytics", icon: BookOpen },
          { name: "Students", href: "/students", icon: Users },
          { name: "Reports", href: "/reports", icon: FileText },
          { name: "Profile", href: "/profile", icon: User },
          { name: "Settings", href: "/settings", icon: Settings },
        ];
      case 'government':
        return [
          { name: "Dashboard", href: "/government-dashboard", icon: LayoutDashboard },
          { name: "Analytics", href: "/analytics", icon: BarChart3 },
          { name: "Institutions", href: "/students", icon: Building2 },
          { name: "Reports", href: "/reports", icon: FileText },
          { name: "Compliance", href: "/settings", icon: Shield },
        ];
      case 'institution':
      default:
        return [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { name: "Analytics", href: "/analytics", icon: BarChart3 },
          { name: "Students", href: "/students", icon: Users },
          { name: "Reports", href: "/reports", icon: FileText },
          { name: "Profile", href: "/profile", icon: User },
          { name: "Settings", href: "/settings", icon: Settings },
        ];
    }
  };

  const navigation = getNavigation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center animate-rotate-slow group-hover:animate-glow transition-all duration-300">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold hidden sm:inline text-gradient">EduUnify</span>
          </Link>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <span>Welcome,</span>
              <span className="font-medium text-foreground capitalize">{userProfile?.role || 'User'}</span>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r bg-card transition-transform duration-300 lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="flex-1 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3",
                      isActive(item.href) && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>

            <div className="border-t pt-4">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
