import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Building2, Users, Shield } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialMode = searchParams.get("mode") || "signin";
  const initialRole = searchParams.get("role") || "";

  const [mode, setMode] = useState<"signin" | "register">(initialMode as "signin" | "register");
  const [role, setRole] = useState(initialRole);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    nationalId: "",
    institutionCode: ""
  });

  const roles = [
    { value: "institution", label: "Educational Institution", icon: Building2 },
    { value: "student", label: "Student", icon: GraduationCap },
    { value: "teacher", label: "Teacher/Faculty", icon: Users },
    { value: "government", label: "Government Official", icon: Shield }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (mode === "register") {
      if (!role) {
        toast.error("Please select your role");
        return;
      }
      if (!formData.name || !formData.nationalId) {
        toast.error("Please fill in all registration fields");
        return;
      }
    }

    // Simulate authentication
    toast.success(mode === "signin" ? "Signed in successfully!" : "Registration successful!");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const getRoleIcon = (roleValue: string) => {
    const roleData = roles.find(r => r.value === roleValue);
    return roleData?.icon || GraduationCap;
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to EduUnify</h1>
          <p className="text-white/80">Sign in to access your personalized dashboard</p>
        </div>

        <Card className="p-8 animate-slide-up">
          <Tabs value={mode} onValueChange={(v) => setMode(v as "signin" | "register")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="signin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
                <p className="text-sm text-center text-muted-foreground">
                  Don't have an account?{" "}
                  <button type="button" onClick={() => setMode("register")} className="text-primary hover:underline">
                    Register here
                  </button>
                </p>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Select Your Role</Label>
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          <div className="flex items-center gap-2">
                            <r.icon className="w-4 h-4" />
                            {r.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">
                    {role === "institution" ? "Institution Name" : "Full Name"}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={role === "institution" ? "Enter institution name" : "Enter your full name"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationalId">
                    {role === "institution" ? "AISHE Code" : role === "teacher" ? "APAR ID" : "AADHAR Number"}
                  </Label>
                  <Input
                    id="nationalId"
                    type="text"
                    placeholder={role === "institution" ? "Enter AISHE code" : role === "teacher" ? "Enter APAR ID" : "Enter AADHAR number"}
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">Create Account</Button>
                <p className="text-sm text-center text-muted-foreground">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setMode("signin")} className="text-primary hover:underline">
                    Sign in
                  </button>
                </p>
              </TabsContent>
            </form>
          </Tabs>
        </Card>

        <p className="text-center text-sm text-white/60 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;
