import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Shield, FileText, BarChart3, User, LogOut, Activity, Mountain, Radio } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroImage from "@/assets/mining-hero.jpg";

const Homepage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    elevationModel: null as File | null,
    geotechnicalData: null as File | null,
    geotechnicalFormat: "",
    sensorData: null as File | null,
    sensorDataFormat: "",
  });

  const handleFileUploadClick = () => {
    if (!isAuthenticated) {
      toast.warning("Please login to access the file upload system");
      navigate("/login");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    if (!formData.elevationModel || !formData.geotechnicalData || !formData.sensorData) {
      toast.error("Please upload all required files");
      return;
    }

    if (!formData.geotechnicalFormat || !formData.sensorDataFormat) {
      toast.error("Please select file formats for geotechnical and sensor data");
      return;
    }

    toast.success("AI Analysis Started Successfully!", {
      description: "All files uploaded and processing has begun. You will receive alerts as results become available.",
    });
    
    // Navigate to results page after a short delay
    setTimeout(() => {
      navigate("/results");
    }, 2000);
  };

  const handleFileSelect = (fieldName: string) => (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const handleFormatChange = (fieldName: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
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
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => navigate("/")}
          >
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">SafeMine AI</h1>
              <p className="text-sm text-muted-foreground">Advanced Geological Analysis & Risk Prevention</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
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
              Smart Mining <span className="text-primary">Safety</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered geological analysis using elevation models, drone imagery, and environmental data for comprehensive risk assessment.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-success">
                <Radio className="h-5 w-5" />
                <span className="text-sm font-medium">Sensor Analysis</span>
              </div>
              <div className="flex items-center space-x-2 text-warning">
                <Mountain className="h-5 w-5" />
                <span className="text-sm font-medium">3D Modeling</span>
              </div>
              <div className="flex items-center space-x-2 text-primary">
                <BarChart3 className="h-5 w-5" />
                <span className="text-sm font-medium">Risk Intelligence</span>
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
              <FileText className="h-6 w-6 text-primary" />
              <span>AI Analysis Data Upload</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="mb-6">
                {/* Digital Elevation Model */}
                <div onClick={!isAuthenticated ? handleFileUploadClick : undefined}>
                  <FileUpload
                    accept=".dwg,.dxf,.step,.iges,.sat"
                    label="Digital Elevation Model"
                    description="Upload CAD file containing 3D terrain data"
                    onFileSelect={handleFileSelect('elevationModel')}
                    selectedFile={formData.elevationModel}
                    disabled={!isAuthenticated}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Geotechnical Data */}
                <div className="space-y-4">
                  <div onClick={!isAuthenticated ? handleFileUploadClick : undefined}>
                    <FileUpload
                      accept={formData.geotechnicalFormat === 'pdf' ? '.pdf' : '.xlsx,.xls,.csv'}
                      label="Geotechnical Data"
                      description="Soil and rock analysis reports"
                      onFileSelect={handleFileSelect('geotechnicalData')}
                      selectedFile={formData.geotechnicalData}
                      disabled={!isAuthenticated}
                    />
                  </div>
                  <div onClick={!isAuthenticated ? handleFileUploadClick : undefined}>
                    <Select 
                      onValueChange={handleFormatChange('geotechnicalFormat')} 
                      value={formData.geotechnicalFormat} 
                      disabled={!isAuthenticated}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isAuthenticated ? "Select file format" : "Login to configure"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sensor Data */}
                <div className="space-y-4">
                  <div onClick={!isAuthenticated ? handleFileUploadClick : undefined}>
                    <FileUpload
                      accept={formData.sensorDataFormat === 'pdf' ? '.pdf' : '.xlsx,.xls,.csv'}
                      label="Sensor Data"
                      description="Real-time sensor readings and monitoring data"
                      onFileSelect={handleFileSelect('sensorData')}
                      selectedFile={formData.sensorData}
                      disabled={!isAuthenticated}
                    />
                  </div>
                  <div onClick={!isAuthenticated ? handleFileUploadClick : undefined}>
                    <Select 
                      onValueChange={handleFormatChange('sensorDataFormat')} 
                      value={formData.sensorDataFormat} 
                      disabled={!isAuthenticated}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isAuthenticated ? "Select file format" : "Login to configure"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Start AI Analysis
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    variant="disabled" 
                    size="lg"
                    className="px-12"
                    onClick={handleFileUploadClick}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Login to Upload Files
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
            Advanced AI Analysis Capabilities
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Activity className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">Real-Time Sensor Monitoring</h4>
              <p className="text-muted-foreground">
                Continuous sensor data analysis detects anomalies and predicts potential rockfall events in real-time.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-warning rounded-full flex items-center justify-center">
                <Mountain className="h-8 w-8 text-warning-foreground" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">3D Terrain Modeling</h4>
              <p className="text-muted-foreground">
                CAD-based elevation models combined with geological data provide precise topographical analysis.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-success-foreground" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">AI-Powered Risk Assessment</h4>
              <p className="text-muted-foreground">
                Machine learning algorithms analyze patterns and generate comprehensive risk reports with automated alerts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;