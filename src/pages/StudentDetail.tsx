
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, BookOpen, BarChart2, AlertTriangle, CheckCircle, Award, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Navigation from '@/components/Navigation';
import { mockStudents } from '@/utils/mockData';
import { useAuth } from '@/context/AuthContext';
import { Radar } from 'recharts';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Component for rendering a metric with icon and value
const MetricCard = ({ icon: Icon, label, value, colorClass = "text-primary" }) => (
  <div className="flex items-center gap-3 p-4 bg-background rounded-md border">
    <div className={`p-2 rounded-full ${colorClass} bg-opacity-10`}>
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const StudentDetail = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { userRole } = useAuth();
  const [notes, setNotes] = React.useState("");
  const [notifyParents, setNotifyParents] = React.useState(false);
  
  // Find the student by ID
  const student = mockStudents.find(s => s.id === studentId) || mockStudents[0];
  
  // Format data for radar chart
  const personalityChartData = [
    { subject: 'Openness', A: student.personalityTraits.openness },
    { subject: 'Conscientiousness', A: student.personalityTraits.conscientiousness },
    { subject: 'Extraversion', A: student.personalityTraits.extraversion },
    { subject: 'Agreeableness', A: student.personalityTraits.agreeableness },
    { subject: 'Neuroticism', A: student.personalityTraits.neuroticism },
  ];
  
  // Track if the student is at risk
  const isAtRisk = student.attendance < 75 || student.behaviorScore < 70;
  
  React.useEffect(() => {
    // Initialize notes from the student data
    setNotes(student.counselorNotes || "");
  }, [student.id]);
  
  const handleSaveNotes = () => {
    // In a real app, this would save to the backend
    // For now, we'll just show a success message
    alert("Notes saved successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">Student Profile</h1>
            </div>
            
            {userRole === 'admin' && (
              <div className="flex gap-2">
                <Button>Edit Profile</Button>
                {isAtRisk && (
                  <Button variant="destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Intervention Required
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {/* Student Overview */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold">{student.name}</h2>
                    <p className="text-muted-foreground">{student.rollNumber}</p>
                    <p className="text-sm">{student.email}</p>
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <MetricCard 
                    icon={BookOpen} 
                    label="Course" 
                    value={`${student.course}, Sem ${student.semester}`} 
                  />
                  <MetricCard 
                    icon={Calendar} 
                    label="Attendance" 
                    value={`${student.attendance}%`}
                    colorClass={student.attendance < 75 ? "text-destructive" : "text-primary"}
                  />
                  <MetricCard 
                    icon={BarChart2} 
                    label="Behavior Score" 
                    value={`${student.behaviorScore}/100`}
                    colorClass={student.behaviorScore < 70 ? "text-destructive" : "text-primary"}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs for different aspects of the student */}
          <Tabs defaultValue="behavior">
            <TabsList className="mb-4">
              <TabsTrigger value="behavior">Behavior Analysis</TabsTrigger>
              <TabsTrigger value="personality">Personality Profile</TabsTrigger>
              <TabsTrigger value="incidents">Behavioral Incidents</TabsTrigger>
              <TabsTrigger value="notes">Counselor Notes</TabsTrigger>
            </TabsList>
            
            {/* Behavior Analysis Tab */}
            <TabsContent value="behavior">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Academic and behavior metrics for this student</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Academic Score</span>
                        <span className="text-sm font-medium">{student.academicScore}/100</span>
                      </div>
                      <Progress value={student.academicScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Behavior Score</span>
                        <span className="text-sm font-medium">{student.behaviorScore}/100</span>
                      </div>
                      <Progress value={student.behaviorScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Participation Score</span>
                        <span className="text-sm font-medium">{student.participationScore}/100</span>
                      </div>
                      <Progress value={student.participationScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Attendance</span>
                        <span className="text-sm font-medium">{student.attendance}%</span>
                      </div>
                      <Progress value={student.attendance} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Strengths & Areas for Improvement</CardTitle>
                    <CardDescription>Based on behavioral observations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Award className="h-4 w-4 mr-2 text-primary" />
                        Strengths
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {student.strengths.map((strength, index) => (
                          <Badge key={index} variant="secondary">{strength}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Brain className="h-4 w-4 mr-2 text-primary" />
                        Areas for Improvement
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {student.areasOfImprovement.map((area, index) => (
                          <Badge key={index} variant="outline">{area}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Personality Profile Tab */}
            <TabsContent value="personality">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Five Factor Personality Profile</CardTitle>
                    <CardDescription>Based on the Big Five personality model</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius="80%" data={personalityChartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name={student.name} dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Trait Analysis</CardTitle>
                    <CardDescription>Understanding personality traits scores</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Openness</span>
                        <span className="text-sm font-medium">{student.personalityTraits.openness}/100</span>
                      </div>
                      <Progress value={student.personalityTraits.openness} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Curiosity, creativity, and openness to new experiences</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Conscientiousness</span>
                        <span className="text-sm font-medium">{student.personalityTraits.conscientiousness}/100</span>
                      </div>
                      <Progress value={student.personalityTraits.conscientiousness} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Organization, responsibility, and goal-oriented behavior</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Extraversion</span>
                        <span className="text-sm font-medium">{student.personalityTraits.extraversion}/100</span>
                      </div>
                      <Progress value={student.personalityTraits.extraversion} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Sociability, assertiveness, and energy in social settings</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Agreeableness</span>
                        <span className="text-sm font-medium">{student.personalityTraits.agreeableness}/100</span>
                      </div>
                      <Progress value={student.personalityTraits.agreeableness} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Kindness, empathy, and cooperative tendencies</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Neuroticism</span>
                        <span className="text-sm font-medium">{student.personalityTraits.neuroticism}/100</span>
                      </div>
                      <Progress value={student.personalityTraits.neuroticism} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Emotional stability vs. anxiety and moodiness</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Behavioral Incidents Tab */}
            <TabsContent value="incidents">
              <Card>
                <CardHeader>
                  <CardTitle>Behavioral Incidents</CardTitle>
                  <CardDescription>Record of behavioral issues and interventions</CardDescription>
                </CardHeader>
                <CardContent>
                  {student.behavioralIncidents.length > 0 ? (
                    <div className="divide-y">
                      {student.behavioralIncidents.map((incident) => (
                        <div key={incident.id} className="py-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <Badge variant={incident.type === 'Minor' ? 'secondary' : 'destructive'} className="mr-2">
                                {incident.type}
                              </Badge>
                              <span className="text-sm font-medium">{incident.date}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">Reported by: {incident.teacher}</span>
                          </div>
                          <p className="mb-2 font-medium">{incident.description}</p>
                          <p className="text-sm text-muted-foreground">Action Taken: {incident.action}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-1">No Behavioral Incidents</h3>
                      <p className="text-muted-foreground">This student has no recorded behavioral incidents.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Counselor Notes Tab */}
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Counselor Notes</CardTitle>
                  <CardDescription>Private notes and observations for this student</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)} 
                    placeholder="Enter your observations and counseling notes here..."
                    className="min-h-[200px] mb-4"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Switch id="notify-parents" checked={notifyParents} onCheckedChange={setNotifyParents} />
                      <label htmlFor="notify-parents" className="text-sm cursor-pointer">
                        Notify parents of changes
                      </label>
                    </div>
                    <Button onClick={handleSaveNotes}>Save Notes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default StudentDetail;
