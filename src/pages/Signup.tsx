import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Shield } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    mineName: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const miningRoles = [
    "Mine Safety Officer",
    "Site Supervisor",
    "Geologist",
    "Mining Engineer",
    "Operations Manager",
    "Safety Inspector",
    "Environmental Officer",
    "Blast Engineer"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.mineName) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate user creation - in real app, this would call an API
    const userData = {
      id: `user-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      mineName: formData.mineName,
    };

    login(userData);
    toast.success("Account created successfully! Welcome to RockAlert System");
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div 
          className="text-center mb-8 cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => navigate("/")}
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary mr-2" />
            <h1 className="text-3xl font-bold text-foreground">SafeMine AI</h1>
          </div>
          <p className="text-muted-foreground">Advanced Geological Analysis & Risk Prevention</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-center text-foreground">Create Account</CardTitle>
            <CardDescription className="text-center">
              Register to access the mining safety monitoring system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role in Mining Operations</Label>
                <Select onValueChange={handleRoleChange} value={formData.role}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {miningRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mineName">Mine Name</Label>
                <Input
                  id="mineName"
                  name="mineName"
                  type="text"
                  value={formData.mineName}
                  onChange={handleChange}
                  placeholder="Enter your mine site name"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="industrial"
              >
                Create Account
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button 
                    variant="link" 
                    onClick={() => navigate("/login")}
                    className="p-0 h-auto"
                  >
                    Login here
                  </Button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;