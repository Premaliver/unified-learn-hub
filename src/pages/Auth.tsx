import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Building2, Users, Shield, Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { loginUser, registerUser, sendOTP, verifyOTP, completeRegistration, getCurrentUser } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialMode = searchParams.get("mode") || "signin";
  const initialRole = searchParams.get("role") || "";
  const { user , userProfile} = useAuth()

  const [mode, setMode] = useState<"signin" | "register" | "otp">(initialMode as "signin" | "register");
  const [role, setRole] = useState(initialRole);
  const [step, setStep] = useState<"form" | "otp">("form");
  const [otp, setOtp] = useState("");
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

  useEffect(()=>{
    if(user){
      navigate("/dashboard")
    }
  },[user])


  const handleSendOTP = async () => {
    if (!formData.email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      const result = await sendOTP(formData.email, mode === "register");
      if (result.success) {
        toast.success("OTP sent to your email!");
        setStep("otp");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const result = await verifyOTP(formData.email, otp);
      console.log(result)
      if (result.success) {
        toast.success("OTP verified successfully!");
        // Now complete registration
        const completeResult = await completeRegistration(
          result.user!.id,
          formData.email,
          role as 'institution' | 'student' | 'teacher' | 'government',
          formData.name,
          formData.nationalId
        );
        if (completeResult.success) {
          toast.success("Registration successful!");
          // Update user password after registration
          await supabase.auth.updateUser({
            password: formData.password
          });
          // Navigate based on user role
          setTimeout(() => {
            if (role === 'student') {
              navigate("/student-dashboard");
            } else if (role === 'teacher') {
              navigate("/faculty-dashboard");
            } else {
              navigate("/dashboard");
            }
          }, 1000);
        } else {
          toast.error(completeResult.message);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      // For registration, send OTP first
      await handleSendOTP();
      return;
    }

    if (mode === "signin") {
      try {
        const result = await loginUser(formData.email, formData.password);
        if (result.success) {
          toast.success("Signed in successfully!");
<<<<<<< HEAD
          
          // Navigate based on user role
          const user = await getCurrentUser();

=======
          // Store token in localStorage
          localStorage.setItem('auth_token', result.token!);
          // Navigate based on user role from the login result
>>>>>>> c6775f1a534af44d0cb78a1cb5c3e710ef9841f0
          setTimeout(() => {
            if (result.user?.role === 'student') {
              navigate("/student-dashboard");
<<<<<<< HEAD
            } else if (user?.role === 'teacher') {
=======
            } else if (result.user?.role === 'teacher') {
>>>>>>> c6775f1a534af44d0cb78a1cb5c3e710ef9841f0
              navigate("/faculty-dashboard");
            } else {
              navigate("/dashboard");
            }
          }, 1000);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
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
          {step === "form" ? (
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

                  <Button type="submit" className="w-full">Send OTP</Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <button type="button" onClick={() => setMode("signin")} className="text-primary hover:underline">
                      Sign in
                    </button>
                  </p>
                </TabsContent>
              </form>
            </Tabs>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
                <p className="text-muted-foreground">
                  We've sent a 6-digit OTP to <strong>{formData.email}</strong>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Check your email and enter the code below
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                    required
                  />
                </div>

                <Button onClick={handleVerifyOTP} className="w-full" disabled={otp.length !== 6}>
                  Verify & Register
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep("form")}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleSendOTP}
                    className="flex-1"
                  >
                    Resend OTP
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        <p className="text-center text-sm text-white/60 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;
