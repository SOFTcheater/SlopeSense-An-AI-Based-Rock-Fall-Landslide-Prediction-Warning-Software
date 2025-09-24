import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate login - in real app, this would call an API
    const userData = {
      id: "user-123",
      name: formData.name,
      email: formData.email,
      role: "Mine Safety Officer", // Default role for demo
      mineName: "Demo Mine Site", // Default mine for demo
    };

    login(userData);
    toast.success("Login successful! Welcome to the Rockfall Alert System");
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-primary mr-2" />
            <h1 className="text-3xl font-bold text-foreground">RockAlert</h1>
          </div>
          <p className="text-muted-foreground">AI-Based Rockfall Prediction System</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-center text-foreground">Login to System</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the monitoring dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
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
                  placeholder="Enter your email"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="industrial"
              >
                Login to Dashboard
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button 
                    variant="link" 
                    onClick={() => navigate("/signup")}
                    className="p-0 h-auto"
                  >
                    Sign up here
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

export default Login;