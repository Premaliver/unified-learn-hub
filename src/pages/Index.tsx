import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Building2, GraduationCap, Users, BarChart3, FileText, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { user } = useAuth()
  const features = [
    {
      icon: Building2,
      title: "Institution Management",
      description: "Track NIRF rankings, compliance status, and academic achievements for educational institutions"
    },
    {
      icon: GraduationCap,
      title: "Student Lifecycle Tracking",
      description: "Monitor student progress, achievements, and government scheme eligibility throughout their academic journey"
    },
    {
      icon: Users,
      title: "Faculty Performance",
      description: "Manage teacher profiles, research output, and performance evaluations in one unified platform"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Interactive dashboards with real-time insights and comparative analysis across institutions"
    },
    {
      icon: FileText,
      title: "Auto-Report Generation",
      description: "One-click compliant reports with automated data aggregation and export capabilities"
    },
    {
      icon: Shield,
      title: "Secure National ID Integration",
      description: "AADHAR, APAR, and AISHE code verification with privacy-compliant data storage"
    }
  ];

  const roles = [
    { name: "Educational Institutions", path: "/auth?role=institution", color: "primary" },
    { name: "Students", path: "/auth?role=student", color: "accent" },
    { name: "Teachers & Faculty", path: "/auth?role=teacher", color: "chart-3" },
    { name: "Government Officials", path: "/auth?role=government", color: "chart-4" }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">EduUnify</span>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <Link to="/dashboard">
                  <Button variant="outline">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button variant="ghost">Sign In</Button>
                </Link>
              )
              }
              <Link to="/auth?mode=register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative gradient-hero text-primary-foreground py-20 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-40 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-bounce-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient animate-text-shimmer">
                Unified Educational Data Management Platform
              </h1>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
                A single-window solution for tracking and analyzing educational institution and student data
                using national identification systems (AADHAR, APAR ID, AISHE codes)
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link to="/auth?mode=register">
                <Button size="lg" variant="secondary" className="gap-2 hover-lift animate-glow">
                  Start Your Journey <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover-lift glass-effect">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Institutions", value: "1", icon: Building2 },
              { label: "Students", value: "6", icon: GraduationCap },
              { label: "Faculty Members", value: "15", icon: Users },
              { label: "Reports Generated", value: "100", icon: FileText }
            ].map((stat, i) => (
              <div key={i} className="text-center animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Every Stakeholder</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to streamline educational data management and drive better outcomes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-elevated transition-all duration-300 animate-scale-in gradient-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based Access */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Role</h2>
            <p className="text-lg text-muted-foreground">
              Access tailored dashboards designed specifically for your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {roles.map((role, index) => (
              <Link key={index} to={role.path}>
                <Card className="p-6 text-center hover:shadow-elevated transition-all duration-300 cursor-pointer group">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${role.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Zap className={`w-8 h-8 text-${role.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{role.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                    Access Dashboard <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="gradient-hero text-primary-foreground p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Educational Data Management?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Join hundreds of institutions already using EduUnify to streamline operations and improve outcomes
            </p>
            <Link to="/auth?mode=register">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Now <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold">EduUnify</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Unified educational data management for institutions, students, and government.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-foreground">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link to="/security" className="hover:text-foreground">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/docs" className="hover:text-foreground">Documentation</Link></li>
                <li><Link to="/api" className="hover:text-foreground">API Reference</Link></li>
                <li><Link to="/support" className="hover:text-foreground">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link to="/compliance" className="hover:text-foreground">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 EduUnify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
