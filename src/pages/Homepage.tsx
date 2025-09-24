import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { AlertTriangle, Mountain, Activity, Cloud, Gauge, User, LogOut } from "lucide-react";
import heroImage from "@/assets/mining-hero.jpg";

const Homepage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mineName: "",
    riskLevel: [50],
    monitoringParams: "",
    alertThreshold: "",
  });

  const handleInputClick = () => {
    if (!isAuthenticated) {
      toast.warning("Please login to access the monitoring system");
      navigate("/login");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    if (!formData.mineName || !formData.monitoringParams || !formData.alertThreshold) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success(`Monitoring system activated for ${formData.mineName}`, {
      description: `Risk Level: ${formData.riskLevel[0]}% | Alert Threshold: ${formData.alertThreshold}`,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleParamChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      monitoringParams: value
    }));
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">RockAlert System</h1>
              <p className="text-sm text-muted-foreground">AI-Based Rockfall Prediction & Alert Platform</p>
            </div>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.role}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="industrial" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-background to-card overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Mining operation with safety monitoring" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Prevent Mining <span className="text-primary">Disasters</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Advanced AI monitoring system for real-time rockfall prediction and early warning alerts in open-pit mines.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-success">
                <Activity className="h-5 w-5" />
                <span className="text-sm font-medium">Real-time Monitoring</span>
              </div>
              <div className="flex items-center space-x-2 text-warning">
                <Mountain className="h-5 w-5" />
                <span className="text-sm font-medium">AI Prediction</span>
              </div>
              <div className="flex items-center space-x-2 text-danger">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm font-medium">Instant Alerts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto border-border">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-foreground flex items-center justify-center space-x-2">
              <Gauge className="h-6 w-6 text-primary" />
              <span>Rockfall Monitoring Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Mine Name */}
                <div className="space-y-2">
                  <Label htmlFor="mineName" className="text-foreground">Mine Name</Label>
                  <Input
                    id="mineName"
                    name="mineName"
                    value={formData.mineName}
                    onChange={handleChange}
                    onClick={handleInputClick}
                    placeholder={isAuthenticated ? "Enter mine site name" : "Login to configure"}
                    disabled={!isAuthenticated}
                    className={!isAuthenticated ? "cursor-pointer" : ""}
                  />
                </div>

                {/* Alert Threshold */}
                <div className="space-y-2">
                  <Label htmlFor="alertThreshold" className="text-foreground">Alert Threshold</Label>
                  <Input
                    id="alertThreshold"
                    name="alertThreshold"
                    value={formData.alertThreshold}
                    onChange={handleChange}
                    onClick={handleInputClick}
                    placeholder={isAuthenticated ? "Enter threshold value" : "Login to configure"}
                    disabled={!isAuthenticated}
                    className={!isAuthenticated ? "cursor-pointer" : ""}
                  />
                </div>
              </div>

              {/* Risk Level Slider */}
              <div className="space-y-4">
                <Label className="text-foreground">Rockfall Risk Level: {formData.riskLevel[0]}%</Label>
                <div onClick={handleInputClick} className={!isAuthenticated ? "cursor-pointer" : ""}>
                  <Slider
                    value={formData.riskLevel}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, riskLevel: value }))}
                    max={100}
                    step={1}
                    disabled={!isAuthenticated}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="text-success">Low Risk</span>
                  <span className="text-warning">Medium Risk</span>
                  <span className="text-danger">High Risk</span>
                </div>
              </div>

              {/* Monitoring Parameters */}
              <div className="space-y-2">
                <Label className="text-foreground">Monitoring Parameters</Label>
                <div onClick={handleInputClick} className={!isAuthenticated ? "cursor-pointer" : ""}>
                  <Select onValueChange={handleParamChange} value={formData.monitoringParams} disabled={!isAuthenticated}>
                    <SelectTrigger>
                      <SelectValue placeholder={isAuthenticated ? "Select monitoring parameters" : "Login to configure"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slope-stability">Slope Stability Analysis</SelectItem>
                      <SelectItem value="vibration-monitoring">Vibration Monitoring</SelectItem>
                      <SelectItem value="weather-conditions">Weather Conditions</SelectItem>
                      <SelectItem value="ground-movement">Ground Movement Detection</SelectItem>
                      <SelectItem value="seismic-activity">Seismic Activity</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive Monitoring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                {isAuthenticated ? (
                  <Button 
                    type="submit" 
                    variant="industrial" 
                    size="lg"
                    className="px-12"
                  >
                    <Activity className="h-5 w-5 mr-2" />
                    Activate Monitoring System
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    variant="disabled" 
                    size="lg"
                    className="px-12"
                    onClick={handleInputClick}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Login to Activate System
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Advanced Mining Safety Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Activity className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">Real-time Analysis</h4>
              <p className="text-muted-foreground">
                Continuous monitoring of geological conditions with AI-powered analysis for immediate threat detection.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-warning rounded-full flex items-center justify-center">
                <Mountain className="h-8 w-8 text-warning-foreground" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">Predictive Modeling</h4>
              <p className="text-muted-foreground">
                Advanced machine learning algorithms predict potential rockfall events before they occur.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-danger rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-danger-foreground" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">Instant Alerts</h4>
              <p className="text-muted-foreground">
                Immediate notification system ensures rapid response to potential hazards and worker safety.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;