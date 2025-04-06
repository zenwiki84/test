
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Search, Plus, UserPlus, FileText, Filter, Download, ArrowUp, ArrowDown, 
  AlertTriangle, CheckCircle, User, UserCheck, Mail, Calendar, School,
  Brain, Bell
} from 'lucide-react';
import { mockStudents, mockTeachers } from '@/utils/mockData';
import { useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

// Component for stats card with icon
const StatsCard = ({ icon: Icon, title, value, description, className = "" }) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const AdminPanel = () => {
  const { userRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [courseFilter, setCourseFilter] = useState('All');
  
  // Sort and filter students
  const filteredStudents = mockStudents
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse = courseFilter === 'All' || student.course === courseFilter;
      return matchesSearch && matchesCourse;
    })
    .sort((a, b) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];
      
      if (typeof fieldA === 'string') {
        fieldA = fieldA.toLowerCase();
        fieldB = fieldB.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });
    
  // Get unique courses for filter
  const courses = ['All', ...new Set(mockStudents.map(student => student.course))];
  
  // Calculate stats
  const atRiskCount = mockStudents.filter(student => 
    student.attendance < 75 || student.behaviorScore < 70
  ).length;
  
  const behaviorIncidentsCount = mockStudents.reduce(
    (count, student) => count + student.behavioralIncidents.length, 0
  );
  
  const avgAttendance = Math.round(
    mockStudents.reduce((sum, student) => sum + student.attendance, 0) / mockStudents.length
  );
  
  // Toggle sort direction or change sort field
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Render sort arrow if this field is being sorted
  const SortIndicator = ({ field }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-4 w-4" /> : 
      <ArrowDown className="h-4 w-4" />;
  };

  const handleGenerateReport = (reportType) => {
    toast({
      title: `${reportType} Report Generated`,
      description: "The report has been generated and is ready for download.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img 
          src="/lovable-uploads/7afce98d-f21c-40c0-a054-0b0431ca10c9.png" 
          alt="ASBM University Campus" 
          className="w-full h-full object-cover opacity-20" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/5"></div>
      </div>
      
      <Navigation />
      
      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
              <p className="text-muted-foreground">Manage student records and monitor behavior</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              <Button className="transition-all duration-300 hover:scale-105">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
              <Button variant="outline" className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard 
              icon={User} 
              title="Total Students" 
              value={mockStudents.length} 
              description="Active students in the system"
              className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            />
            <StatsCard 
              icon={AlertTriangle} 
              title="At-Risk Students" 
              value={atRiskCount} 
              description={`${Math.round((atRiskCount / mockStudents.length) * 100)}% of total students`}
              className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            />
            <StatsCard 
              icon={Brain} 
              title="Behavior Incidents" 
              value={behaviorIncidentsCount} 
              description="Total incidents reported"
              className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            />
            <StatsCard 
              icon={UserCheck} 
              title="Average Attendance" 
              value={`${avgAttendance}%`} 
              description={avgAttendance >= 80 ? "Good overall attendance" : "Needs improvement"}
              className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            />
          </div>
          
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="students" className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Students</TabsTrigger>
              <TabsTrigger value="teachers" className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Faculty</TabsTrigger>
              <TabsTrigger value="reports" className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Reports</TabsTrigger>
            </TabsList>
            
            {/* Students Tab */}
            <TabsContent value="students" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Student Directory</CardTitle>
                  <CardDescription>View and manage all students</CardDescription>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or roll number..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-[180px]">
                            <Filter className="mr-2 h-4 w-4" />
                            {courseFilter}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {courses.map((course) => (
                            <DropdownMenuItem 
                              key={course} 
                              onClick={() => setCourseFilter(course)}
                            >
                              {course}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">
                            <Button 
                              variant="ghost" 
                              className="flex items-center gap-1 p-0 font-semibold"
                              onClick={() => handleSort('name')}
                            >
                              Student <SortIndicator field="name" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button 
                              variant="ghost" 
                              className="flex items-center gap-1 p-0 font-semibold"
                              onClick={() => handleSort('course')}
                            >
                              Course <SortIndicator field="course" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button 
                              variant="ghost" 
                              className="flex items-center gap-1 p-0 font-semibold"
                              onClick={() => handleSort('attendance')}
                            >
                              Attendance <SortIndicator field="attendance" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button 
                              variant="ghost" 
                              className="flex items-center gap-1 p-0 font-semibold"
                              onClick={() => handleSort('behaviorScore')}
                            >
                              Behavior <SortIndicator field="behaviorScore" />
                            </Button>
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((student) => (
                          <TableRow key={student.id} className="transition-colors hover:bg-muted/50">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={student.avatar} alt={student.name} />
                                  <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{student.name}</div>
                                  <div className="text-xs text-muted-foreground">{student.rollNumber}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{student.course}</span>
                                <span className="text-xs text-muted-foreground">Semester {student.semester}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {student.attendance < 75 ? (
                                  <AlertTriangle className="h-4 w-4 text-destructive mr-1" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                )}
                                {student.attendance}%
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {student.behaviorScore < 70 ? (
                                  <AlertTriangle className="h-4 w-4 text-destructive mr-1" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                )}
                                {student.behaviorScore}/100
                              </div>
                            </TableCell>
                            <TableCell>
                              {student.attendance < 75 || student.behaviorScore < 70 ? (
                                <Badge variant="destructive">At Risk</Badge>
                              ) : (
                                <Badge variant="outline">Good Standing</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" asChild className="transition-colors hover:bg-primary/20">
                                <Link to={`/admin/student/${student.id}`}>View</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}

                        {filteredStudents.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <Search className="h-8 w-8 mb-4" />
                                <p className="mb-2 font-medium">No students found</p>
                                <p className="text-sm">Try adjusting your search or filters</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Teachers Tab */}
            <TabsContent value="teachers" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Faculty Directory</CardTitle>
                  <CardDescription>View all faculty members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">Teacher</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTeachers.slice(0, 8).map((teacher) => (
                          <TableRow key={teacher.id} className="transition-colors hover:bg-muted/50">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                                  <AvatarFallback>{teacher.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{teacher.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>{teacher.department}</TableCell>
                            <TableCell>{teacher.subject}</TableCell>
                            <TableCell>
                              <div className="flex items-center text-sm">
                                <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                {teacher.email}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="transition-colors hover:bg-primary/20">View</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Reports Tab */}
            <TabsContent value="reports" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Reports</CardTitle>
                    <CardDescription>Generate and download reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md flex justify-between items-center transition-all duration-300 hover:shadow-md hover:border-primary">
                        <div>
                          <h3 className="font-medium">Student Behavior Report</h3>
                          <p className="text-sm text-muted-foreground">Comprehensive behavior analysis</p>
                        </div>
                        <Button onClick={() => handleGenerateReport('Student Behavior')} className="transition-transform hover:scale-105">
                          <FileText className="mr-2 h-4 w-4" />
                          Generate
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-md flex justify-between items-center transition-all duration-300 hover:shadow-md hover:border-primary">
                        <div>
                          <h3 className="font-medium">Attendance Report</h3>
                          <p className="text-sm text-muted-foreground">Student attendance trends</p>
                        </div>
                        <Button onClick={() => handleGenerateReport('Attendance')} className="transition-transform hover:scale-105">
                          <Calendar className="mr-2 h-4 w-4" />
                          Generate
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-md flex justify-between items-center transition-all duration-300 hover:shadow-md hover:border-primary">
                        <div>
                          <h3 className="font-medium">Course Performance</h3>
                          <p className="text-sm text-muted-foreground">Academic performance by course</p>
                        </div>
                        <Button onClick={() => handleGenerateReport('Course Performance')} className="transition-transform hover:scale-105">
                          <School className="mr-2 h-4 w-4" />
                          Generate
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-md flex justify-between items-center transition-all duration-300 hover:shadow-md hover:border-primary">
                        <div>
                          <h3 className="font-medium">Behavioral Incident Log</h3>
                          <p className="text-sm text-muted-foreground">Complete incident history</p>
                        </div>
                        <Button onClick={() => handleGenerateReport('Behavioral Incident Log')} className="transition-transform hover:scale-105">
                          <Brain className="mr-2 h-4 w-4" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Reports</CardTitle>
                    <CardDescription>Previously generated reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md flex justify-between items-center transition-all duration-300 hover:shadow-md">
                        <div>
                          <h3 className="font-medium">Monthly Behavior Summary</h3>
                          <p className="text-xs text-muted-foreground">Generated on 15 Oct 2023</p>
                        </div>
                        <Button variant="outline" size="sm" className="transition-transform hover:scale-105">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-md flex justify-between items-center transition-all duration-300 hover:shadow-md">
                        <div>
                          <h3 className="font-medium">Semester Attendance Report</h3>
                          <p className="text-xs text-muted-foreground">Generated on 30 Sep 2023</p>
                        </div>
                        <Button variant="outline" size="sm" className="transition-transform hover:scale-105">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-md flex justify-between items-center transition-all duration-300 hover:shadow-md">
                        <div>
                          <h3 className="font-medium">Academic Performance Trends</h3>
                          <p className="text-xs text-muted-foreground">Generated on 15 Sep 2023</p>
                        </div>
                        <Button variant="outline" size="sm" className="transition-transform hover:scale-105">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link to="/reports" className="text-primary text-sm hover:underline flex items-center justify-center transition-transform hover:scale-105">
                        <BarChart className="h-4 w-4 mr-2" />
                        View Analytics Dashboard
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
