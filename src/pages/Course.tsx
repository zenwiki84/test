
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  FileText, Calendar, Users, Book, MessageSquare, Upload,
  Download, Paperclip, Clock, CalendarCheck
} from 'lucide-react';

// Mock data - in real app this would come from an API
const courseData = {
  '1': {
    id: '1',
    title: 'Introduction to Computer Science',
    instructor: 'Dr. Ramesh Kumar',
    subject: 'Computer Science',
    color: '#4285F4',
    description: 'This course provides an introduction to computer science concepts and programming using Python.',
    announcements: [
      {
        id: 'a1',
        date: '2023-09-15',
        title: 'Welcome to the course',
        content: 'Welcome to Introduction to Computer Science! Please review the syllabus and introduce yourself in the discussion forum.'
      },
      {
        id: 'a2',
        date: '2023-09-18',
        title: 'Assignment 1 Posted',
        content: 'The first assignment has been posted and is due next Friday. Please check the assignments tab for more details.'
      }
    ],
    assignments: [
      {
        id: 'assign1',
        title: 'Python Basics',
        dueDate: '2023-09-22',
        status: 'pending',
        points: 100,
        description: 'Complete the exercises on basic Python syntax, variables, and control structures.',
      },
      {
        id: 'assign2',
        title: 'Data Structures Implementation',
        dueDate: '2023-10-05',
        status: 'pending',
        points: 150,
        description: 'Implement various data structures in Python including lists, dictionaries, and custom classes.',
      },
    ],
    materials: [
      {
        id: 'm1',
        title: 'Introduction to Python.pdf',
        type: 'pdf',
        date: '2023-09-10',
      },
      {
        id: 'm2',
        title: 'Week 1 - Lecture Slides',
        type: 'ppt',
        date: '2023-09-12',
      },
      {
        id: 'm3',
        title: 'Python Coding Examples',
        type: 'zip',
        date: '2023-09-14',
      },
    ]
  },
  '2': {
    id: '2',
    title: 'Business Administration',
    instructor: 'Prof. Sanjay Patel',
    subject: 'Management',
    color: '#0F9D58',
    description: 'A comprehensive course covering the principles of business management and administration.',
    announcements: [
      {
        id: 'a1',
        date: '2023-09-12',
        title: 'Course Introduction',
        content: 'Welcome to Business Administration! We will have our first class on Monday at 10 AM.'
      }
    ],
    assignments: [],
    materials: [
      {
        id: 'm1',
        title: 'Syllabus.pdf',
        type: 'pdf',
        date: '2023-09-10',
      },
    ]
  },
  // Data for other courses would go here
};

const Course = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState('stream');
  
  // Default to first course if id is invalid
  const course = courseData[courseId as keyof typeof courseData] || courseData['1'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="border-b bg-secondary/20" style={{ borderTopColor: course.color }}>
        <div className="container px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground">{course.subject} • {course.instructor}</p>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={course.instructor} />
                <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Users className="mr-2 h-4 w-4" />
                People
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container px-4 md:px-6 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="mb-4">
            <TabsTrigger value="stream">
              <MessageSquare className="mr-2 h-4 w-4" />
              Stream
            </TabsTrigger>
            <TabsTrigger value="assignments">
              <FileText className="mr-2 h-4 w-4" />
              Assignments
            </TabsTrigger>
            <TabsTrigger value="materials">
              <Book className="mr-2 h-4 w-4" />
              Materials
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stream">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {course.announcements.map((announcement) => (
                  <Card key={announcement.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <CardDescription>
                            {course.instructor} • {new Date(announcement.date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{announcement.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {course.assignments.length > 0 ? (
                      course.assignments.map(assignment => (
                        <div key={assignment.id} className="flex items-start gap-3">
                          <CalendarCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">{assignment.title}</p>
                            <p className="text-xs text-muted-foreground">Due {new Date(assignment.dueDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No upcoming assignments</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Course Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm">Instructor</h4>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Subject</h4>
                      <p className="text-sm text-muted-foreground">{course.subject}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">About</h4>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="assignments">
            <div className="space-y-6">
              {course.assignments.length > 0 ? (
                course.assignments.map(assignment => (
                  <Card key={assignment.id} className="assignment-item">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          <CardDescription>
                            Due: {new Date(assignment.dueDate).toLocaleDateString()} • {assignment.points} points
                          </CardDescription>
                        </div>
                        <Button>View Assignment</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{assignment.description}</p>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Add or Create
                        </Button>
                        <Button variant="outline" size="sm">
                          <Paperclip className="mr-2 h-4 w-4" />
                          Add Attachment
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Mark as Done
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="p-8 text-center bg-white rounded-lg shadow">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Assignments Yet</h3>
                  <p className="text-muted-foreground">
                    Assignments will appear here when your instructor posts them.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="materials">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Course Materials</h2>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Add Material
                </Button>
              </div>
              
              <Card>
                <div className="divide-y">
                  {course.materials.map(material => (
                    <div key={material.id} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{material.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(material.date).toLocaleDateString()} • {material.type.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  ))}
                  
                  {course.materials.length === 0 && (
                    <div className="p-8 text-center">
                      <Book className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Materials Yet</h3>
                      <p className="text-muted-foreground">
                        Course materials will appear here when added by your instructor.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Course;
