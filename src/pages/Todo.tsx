
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, CheckCircle, Clock, Filter, Plus, SortAsc } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for todo items
const todoItems = [
  {
    id: 't1',
    title: 'Complete Python Basics Assignment',
    dueDate: '2023-09-22',
    course: 'Introduction to Computer Science',
    color: '#4285F4',
    completed: false,
  },
  {
    id: 't2',
    title: 'Read Chapter 3: Business Ethics',
    dueDate: '2023-09-20',
    course: 'Business Administration',
    color: '#0F9D58',
    completed: false,
  },
  {
    id: 't3',
    title: 'Prepare Financial Report Analysis',
    dueDate: '2023-09-28',
    course: 'Financial Accounting',
    color: '#DB4437',
    completed: false,
  },
  {
    id: 't4',
    title: 'Review Data Structures Notes',
    dueDate: '2023-10-01',
    course: 'Data Structures & Algorithms',
    color: '#4285F4',
    completed: false,
  },
  {
    id: 't5',
    title: 'Submit Marketing Case Study',
    dueDate: '2023-09-19',
    course: 'Marketing Fundamentals',
    color: '#F4B400',
    completed: true,
  },
];

const Todo = () => {
  const [todos, setTodos] = useState(todoItems);
  
  const toggleTodoStatus = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">To-Do List</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="pending" className="mb-8">
            <TabsList>
              <TabsTrigger value="pending">
                Pending ({pendingTodos.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedTodos.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tasks to Complete</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingTodos.length > 0 ? (
                      pendingTodos.map(todo => (
                        <div 
                          key={todo.id} 
                          className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50"
                        >
                          <Checkbox 
                            id={todo.id} 
                            checked={todo.completed}
                            onCheckedChange={() => toggleTodoStatus(todo.id)}
                          />
                          <div className="flex-1">
                            <label 
                              htmlFor={todo.id} 
                              className="font-medium cursor-pointer"
                            >
                              {todo.title}
                            </label>
                            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <Badge style={{ backgroundColor: todo.color, color: 'white' }}>
                                {todo.course}
                              </Badge>
                              <div className="flex items-center">
                                <CalendarDays className="h-3 w-3 mr-1" />
                                Due {new Date(todo.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">All Done!</h3>
                        <p className="text-muted-foreground">
                          You've completed all your tasks. Time to relax!
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="completed">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Completed Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedTodos.length > 0 ? (
                      completedTodos.map(todo => (
                        <div 
                          key={todo.id} 
                          className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50"
                        >
                          <Checkbox 
                            id={`completed-${todo.id}`} 
                            checked={todo.completed}
                            onCheckedChange={() => toggleTodoStatus(todo.id)}
                          />
                          <div className="flex-1">
                            <label 
                              htmlFor={`completed-${todo.id}`} 
                              className="font-medium cursor-pointer line-through text-muted-foreground"
                            >
                              {todo.title}
                            </label>
                            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <Badge style={{ backgroundColor: `${todo.color}80`, color: 'white' }}>
                                {todo.course}
                              </Badge>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Completed on {new Date().toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-muted-foreground">
                          You haven't completed any tasks yet.
                        </p>
                      </div>
                    )}
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

export default Todo;
