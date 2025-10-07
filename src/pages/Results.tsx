import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Shield, LogOut, Download, Mail, AlertTriangle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const Results = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleDownloadReport = () => {
    toast.success("Generating comprehensive report...", {
      description: "Your report will be downloaded shortly.",
    });
  };

  const handleSendEmail = () => {
    toast.success("Email Alert Sent!", {
      description: "Risk assessment report has been sent to your registered email.",
    });
  };

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
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
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      <div className="bg-destructive/10 border-b border-destructive/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm font-semibold text-destructive">High Risk Zones Detected</p>
                <p className="text-xs text-muted-foreground">1 critical crack detected requiring immediate attention</p>
              </div>
            </div>
            <Button variant="destructive" size="sm" onClick={handleSendEmail}>
              <Mail className="h-4 w-4 mr-2" />
              Send Alert Email
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Analysis Results</h2>
            <p className="text-muted-foreground">Comprehensive AI-powered geological risk assessment</p>
          </div>
          <Button onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download Full Report
          </Button>
        </div>

        <Tabs defaultValue="pointcloud" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="pointcloud">Point Cloud</TabsTrigger>
            <TabsTrigger value="terrain">3D Terrain</TabsTrigger>
            <TabsTrigger value="cracks">Crack Detection</TabsTrigger>
            <TabsTrigger value="sensors">Sensor Data</TabsTrigger>
            <TabsTrigger value="riskmap">Risk Map</TabsTrigger>
          </TabsList>

          {/* Point Cloud Tab */}
          <TabsContent value="pointcloud" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-primary">📊</span>
                  <span>3D Point Cloud Visualization</span>
                </CardTitle>
                <CardDescription>Generated from OpenDroneMap photogrammetry processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <div className="aspect-video bg-card border border-border rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/50 to-primary/5" />
                      <div className="relative text-center p-8">
                        <div className="w-full h-64 bg-muted/30 rounded-lg flex items-center justify-center mb-4">
                          <p className="text-sm text-muted-foreground">3D Point Cloud Rendering Area</p>
                        </div>
                        <div className="flex items-center justify-center space-x-4 mt-4">
                          <Button variant="outline" size="sm">Reset View</Button>
                          <Button variant="outline" size="sm">Zoom Fit</Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-muted-foreground">15,000 points</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">Georeferenced</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Point Cloud Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Points:</span>
                          <span className="font-semibold">15,247</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Density:</span>
                          <span className="font-semibold">245 pts/m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Elevation Range:</span>
                          <span className="font-semibold">-2.3 to 8.7m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Classification:</span>
                          <span className="font-semibold">Ground/Vegetation</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Color Legend</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-blue-500" />
                          <span>Water/Low Areas</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-green-500" />
                          <span>Vegetation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-orange-500" />
                          <span>Rock/High Areas</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Data Source</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Generated from OpenDroneMap photogrammetry processing of 247 aerial images.
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 3D Terrain Tab */}
          <TabsContent value="terrain" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <span className="text-primary">🏔️</span>
                    <span>3D Slope Stability Analysis</span>
                  </span>
                  <Badge variant="outline" className="text-lg">FS: 1.369</Badge>
                </CardTitle>
                <CardDescription>Factor of Safety (FS) Analysis with color-coded risk zones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-card border border-border rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-background via-background/50 to-warning/5" />
                  <div className="relative text-center p-8">
                    <div className="w-full h-80 bg-muted/30 rounded-lg flex items-center justify-center mb-4">
                      <p className="text-sm text-muted-foreground">3D Slope Visualization with FS Heat Map</p>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <Button variant="outline" size="sm">Rotate View</Button>
                      <Button variant="outline" size="sm">Toggle Grid</Button>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Factor of Safety</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-warning">1.369</p>
                      <p className="text-xs text-muted-foreground mt-1">Minimum safe threshold: 1.5</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Risk Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="destructive" className="text-sm">Moderate Risk</Badge>
                      <p className="text-xs text-muted-foreground mt-2">Monitor closely</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Slope Angle</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">47°</p>
                      <p className="text-xs text-muted-foreground mt-1">Average pit wall angle</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-sm">Color Legend - Risk Zones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded" />
                        <span className="text-xs">High Risk (FS &lt; 1.2)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-4 bg-gradient-to-r from-yellow-500 to-green-500 rounded" />
                        <span className="text-xs">Moderate (FS 1.2-1.5)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded" />
                        <span className="text-xs">Safe (FS &gt; 1.5)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crack Detection Tab */}
          <TabsContent value="cracks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-primary">🧠</span>
                  <span>Neural Network Crack Detection</span>
                </CardTitle>
                <CardDescription>AI Model: YOLOv8-Crack Detection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="aspect-video bg-card border border-border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Scan Progress</h3>
                        <Badge>Complete</Badge>
                      </div>
                      <div className="w-full h-48 bg-muted/30 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-sm text-muted-foreground">Crack Detection Visualization</p>
                      </div>
                      <Progress value={100} className="mb-4" />
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-destructive">1</p>
                          <p className="text-xs text-muted-foreground">High Risk</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-warning">2</p>
                          <p className="text-xs text-muted-foreground">Medium Risk</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-success">1</p>
                          <p className="text-xs text-muted-foreground">Low Risk</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Model Performance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Accuracy:</span>
                          <span className="font-semibold text-success">94.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Precision:</span>
                          <span className="font-semibold text-success">91.8%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Recall:</span>
                          <span className="font-semibold text-success">89.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">F1-Score:</span>
                          <span className="font-semibold text-success">90.6%</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Detected Cracks</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold">crack_001</span>
                            <Badge variant="destructive" className="text-xs">high</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>Confidence: 94%</p>
                            <p>Length: 2.3m</p>
                            <p>Width: 0.08m</p>
                          </div>
                        </div>

                        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold">crack_002</span>
                            <Badge variant="outline" className="text-xs">medium</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>Confidence: 87%</p>
                            <p>Length: 1.1m</p>
                            <p>Width: 0.03m</p>
                          </div>
                        </div>

                        <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold">crack_003</span>
                            <Badge variant="outline" className="text-xs text-success">low</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>Confidence: 76%</p>
                            <p>Length: 0.8m</p>
                            <p>Width: 0.02m</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sensor Data Tab */}
          <TabsContent value="sensors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-Time Sensor Monitoring</CardTitle>
                <CardDescription>Live data from geotechnical sensors and monitoring stations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="aspect-video bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Sensor Data vs Time</h3>
                    <div className="w-full h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Time Series Graph: Vibration, Displacement, Stress</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Vibration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">2.3 Hz</p>
                        <p className="text-xs text-success mt-1">Normal range</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Displacement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">0.5 mm</p>
                        <p className="text-xs text-success mt-1">Minimal movement</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Stress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">145 kPa</p>
                        <p className="text-xs text-warning mt-1">Elevated</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Temperature</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">23°C</p>
                        <p className="text-xs text-success mt-1">Stable</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Map Tab */}
          <TabsContent value="riskmap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Risk Assessment Map</CardTitle>
                <CardDescription>Integrated analysis of all risk factors and monitoring data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-card border border-border rounded-lg p-6 mb-6">
                  <div className="w-full h-96 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Integrated Risk Heat Map</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-destructive/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span>Critical Zones</span>
                        <Badge variant="destructive">3</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Areas requiring immediate attention and potential evacuation protocols.
                    </CardContent>
                  </Card>

                  <Card className="border-warning/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span>Warning Zones</span>
                        <Badge variant="outline" className="text-warning">5</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Areas under close monitoring with elevated risk indicators.
                    </CardContent>
                  </Card>

                  <Card className="border-success/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span>Safe Zones</span>
                        <Badge variant="outline" className="text-success">12</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Areas with stable conditions and normal risk levels.
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Results;
