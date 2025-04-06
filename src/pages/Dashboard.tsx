
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import CourseCard from '@/components/CourseCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, CheckCircle2, AlertTriangle, TrendingUp, Users, FilePieChart } from 'lucide-react';
import { mockCourses, mockStudents } from '@/utils/mockData';
import { useAuth } from '@/context/AuthContext';
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Dashboard = () => {
  const { userRole, userName } = useAuth();
  const courses = mockCourses.slice(0, 6);
  
  // Helper function to get pending assignments count
  const getPendingAssignmentsCount = () => {
    return courses.reduce((total, course) => total + course.pendingAssignments, 0);
  };
  
  // Calculate average student metrics for teacher/admin dashboards
  const calculateStudentMetrics = () => {
    const avgAttendance = mockStudents.reduce((sum, student) => sum + student.attendance, 0) / mockStudents.length;
    const avgBehaviorScore = mockStudents.reduce((sum, student) => sum + student.behaviorScore, 0) / mockStudents.length;
    const avgAcademicScore = mockStudents.reduce((sum, student) => sum + student.academicScore, 0) / mockStudents.length;
    
    // Count incidents by type
    const incidentsByType = mockStudents.reduce((acc, student) => {
      student.behavioralIncidents.forEach(incident => {
        acc[incident.type] = (acc[incident.type] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    
    return { avgAttendance, avgBehaviorScore, avgAcademicScore, incidentsByType };
  };
  
  const { avgAttendance, avgBehaviorScore, avgAcademicScore, incidentsByType } = calculateStudentMetrics();
  
  // Find at-risk students (low attendance or behavior scores)
  const atRiskStudents = mockStudents
    .filter(student => student.attendance < 75 || student.behaviorScore < 70)
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image with overlay */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <img 
          src="/lovable-uploads/7afce98d-f21c-40c0-a054-0b0431ca10c9.png" 
          alt="ASBM University Campus" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-primary/5 backdrop-blur-sm"></div>
      </div>

      <Navigation />
      
      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Hello, {userName || (userRole === 'admin' ? 'Administrator' : userRole === 'teacher' ? 'Professor' : 'Student')}
              </h1>
              <p className="text-muted-foreground">
                Welcome to your ASBM University {userRole === 'admin' ? 'administration panel' : userRole === 'teacher' ? 'teaching portal' : 'classroom'}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              <Button className="hidden sm:flex">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline" asChild>
                <Link to="/calendar">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Link>
              </Button>
            </div>
          </div>

          {/* Dashboard Stats - Different for each role */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {userRole === 'student' && (
              <>
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getPendingAssignmentsCount()}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getPendingAssignmentsCount() === 0 ? "All caught up!" : `${getPendingAssignmentsCount()} tasks need attention`}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Your Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStudents[0].attendance}%</div>
                    <Progress value={mockStudents[0].attendance} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockStudents[0].attendance >= 80 ? "Excellent attendance" : "Room for improvement"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Behavior Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStudents[0].behaviorScore}/100</div>
                    <Progress value={mockStudents[0].behaviorScore} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockStudents[0].behaviorScore >= 80 ? "Excellent behavior" : "Room for improvement"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Academic Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStudents[0].academicScore}/100</div>
                    <Progress value={mockStudents[0].academicScore} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockStudents[0].academicScore >= 80 ? "Excellent academic performance" : "Room for improvement"}
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
            
            {(userRole === 'teacher' || userRole === 'admin') && (
              <>
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStudents.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Link to="/admin" className="flex items-center text-primary hover:underline">
                        <Users className="h-3 w-3 mr-1" /> 
                        View all students
                      </Link>
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgAttendance.toFixed(1)}%</div>
                    <Progress value={avgAttendance} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {avgAttendance >= 80 ? "Good class attendance" : "Needs improvement"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Behavior Incidents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(incidentsByType['Minor'] || 0) + (incidentsByType['Major'] || 0)}
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Minor: {incidentsByType['Minor'] || 0}</span>
                      <span className="text-destructive">Major: {incidentsByType['Major'] || 0}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Link to="/reports" className="flex items-center text-primary hover:underline">
                        <FilePieChart className="h-3 w-3 mr-1" />
                        View detailed report
                      </Link>
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Academic Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgAcademicScore.toFixed(1)}/100</div>
                    <Progress value={avgAcademicScore} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {avgAcademicScore >= 80 ? "Good overall performance" : "Needs improvement"}
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Conditional content based on user role */}
          {userRole === 'student' && (
            <Tabs defaultValue="enrolled" className="mb-8">
              <TabsList className="bg-white/70 backdrop-blur-sm">
                <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
                <TabsTrigger value="todo">To Do</TabsTrigger>
              </TabsList>
              <TabsContent value="enrolled">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {courses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="todo">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Upcoming Assignments</h3>
                  </div>
                  <div className="divide-y">
                    {courses
                      .filter((course) => course.pendingAssignments > 0)
                      .map((course) => (
                        <div key={course.id} className="p-4 hover:bg-gray-50 assignment-item">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">Assignment due tomorrow</p>
                            </div>
                            <Button size="sm" variant="outline">
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark Done
                            </Button>
                          </div>
                        </div>
                      ))}
                    {courses.filter((course) => course.pendingAssignments > 0).length === 0 && (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">No pending assignments</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* For teachers and admin - show at-risk students */}
          {(userRole === 'teacher' || userRole === 'admin') && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>At-Risk Students</CardTitle>
                  <CardDescription>Students with low attendance or behavior scores</CardDescription>
                </CardHeader>
                <CardContent>
                  {atRiskStudents.length > 0 ? (
                    <div className="divide-y">
                      {atRiskStudents.map(student => (
                        <div key={student.id} className="py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-9 w-9 mr-3">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-sm">{student.name}</h4>
                              <p className="text-xs text-muted-foreground">{student.course}, Sem {student.semester}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {student.attendance < 75 && (
                              <div className="flex items-center text-amber-500">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                <span className="text-xs font-medium">{student.attendance}% Attendance</span>
                              </div>
                            )}
                            {student.behaviorScore < 70 && (
                              <div className="flex items-center text-destructive">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                <span className="text-xs font-medium">{student.behaviorScore} Behavior</span>
                              </div>
                            )}
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/admin/student/${student.id}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No at-risk students currently</p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequent tasks and reports</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Button className="justify-start">
                    <FilePieChart className="mr-2 h-4 w-4" />
                    Generate Behavior Report
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Student Directory
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analytics Dashboard
                  </Button>
                  <Link to="/reports" className="text-primary text-sm hover:underline mt-2">
                    View all reports →
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent activity for all users */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates in your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New announcement in Business Administration</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Assignment submitted: Data Structures</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Upcoming exam: Financial Accounting</p>
                    <p className="text-xs text-muted-foreground">In 5 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
