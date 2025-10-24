import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  GraduationCap,
  Building2,
  Award
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@university.edu",
    phone: "+91 9876543210",
    department: "Computer Science",
    designation: "Professor & Head",
    employeeId: "EMP2021001",
    joinDate: "2015-08-15",
    address: "123 University Campus, Academic Block A, Room 201",
    bio: "Experienced professor with 15+ years in computer science education. Specializes in AI, machine learning, and software engineering. Published 50+ research papers and guided 25+ PhD students.",
    qualifications: "PhD in Computer Science, M.Tech, B.Tech",
    experience: "15 years",
    researchPapers: 52,
    awards: ["Best Teacher Award 2023", "Research Excellence Award 2022", "Innovation in Education 2021"]
  });

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    // toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    // Reset to original values if needed
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-foreground font-medium">Profile</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your personal information and account settings</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel} className="gap-2">
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Overview */}
          <Card className="p-6 lg:col-span-1">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/api/placeholder/96/96" alt={profile.name} />
                  <AvatarFallback className="text-lg">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2">{profile.name}</h2>
              <p className="text-muted-foreground mb-4">{profile.designation}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4" />
                  <span>{profile.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4" />
                  <span>{profile.experience} experience</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    value={profile.employeeId}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    onChange={(e) => setProfile({...profile, department: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={profile.designation}
                    onChange={(e) => setProfile({...profile, designation: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </Card>

            {/* Address */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Address</h3>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </Card>

            {/* Bio */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Bio</h3>
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
            </Card>

            {/* Qualifications & Achievements */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Qualifications & Achievements</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Qualifications</Label>
                  <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                    {profile.qualifications}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Research Papers</Label>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <GraduationCap className="w-4 h-4" />
                    <span className="font-medium">{profile.researchPapers} published papers</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Label className="mb-2 block">Awards & Recognition</Label>
                <div className="flex flex-wrap gap-2">
                  {profile.awards.map((award, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      <Award className="w-3 h-3" />
                      {award}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Account Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline" className="justify-start gap-2">
              <Mail className="w-4 h-4" />
              Change Email Address
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Phone className="w-4 h-4" />
              Update Phone Number
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <User className="w-4 h-4" />
              Change Password
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <MapPin className="w-4 h-4" />
              Update Address
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
