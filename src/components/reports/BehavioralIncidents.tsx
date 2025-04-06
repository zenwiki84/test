
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for demonstration
const recentIncidents = [
  { 
    id: 1, 
    date: '2023-06-12', 
    type: 'Minor', 
    description: 'Late to class', 
    action: 'Verbal warning',
    teacher: 'Dr. Ramesh Kumar'
  },
  { 
    id: 2, 
    date: '2023-05-28', 
    type: 'Minor', 
    description: 'Missing homework', 
    action: 'Parent notification',
    teacher: 'Prof. Sanjay Patel' 
  },
  { 
    id: 3, 
    date: '2023-05-15', 
    type: 'Major', 
    description: 'Disruptive behavior in class', 
    action: 'Counselor referral',
    teacher: 'Dr. Priya Sharma' 
  },
  { 
    id: 4, 
    date: '2023-04-22', 
    type: 'Minor', 
    description: 'Using phone during lesson', 
    action: 'Phone confiscated',
    teacher: 'Prof. Ajay Singh' 
  },
];

const BehavioralIncidents = () => {
  return (
    <Card className="shadow-md border-none">
      <CardHeader className="bg-gray-50 border-b pb-3">
        <CardTitle className="text-xl">Recent Behavioral Incidents</CardTitle>
        <CardDescription>List of recent behavioral notes and actions</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentIncidents.map((incident) => (
              <TableRow key={incident.id} className="hover:bg-gray-50">
                <TableCell>{new Date(incident.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    incident.type === 'Minor' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {incident.type}
                  </span>
                </TableCell>
                <TableCell>{incident.description}</TableCell>
                <TableCell>{incident.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BehavioralIncidents;
