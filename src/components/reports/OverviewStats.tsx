
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, ArrowDownRight, Users, GraduationCap, Award, BookOpen } from 'lucide-react';

const OverviewStats = () => {
  // Overall score calculation (average of all metrics)
  const performanceData = [
    { name: 'On Time Assignments', value: 82 },
    { name: 'Participation', value: 78 },
    { name: 'Behavior', value: 90 },
    { name: 'Academic', value: 85 },
  ];
  
  const overallScore = Math.round(
    (performanceData.reduce((acc, curr) => acc + curr.value, 0)) / performanceData.length
  );

  // Improvement indicator (mock data - would be calculated from historical data)
  const improvementPercent = 8.2;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="overflow-hidden border-none shadow-md">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{overallScore}%</h3>
                  <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    {improvementPercent}%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <Progress value={overallScore} className="mt-4 h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-green-500 to-green-600 h-2"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">92%</h3>
                  <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    2.5%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <Progress value={92} className="mt-4 h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Academic Standing</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">B+</h3>
                  <span className="ml-2 text-sm font-medium text-red-600 flex items-center">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    1.2%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <Progress value={85} className="mt-4 h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-2"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Course Completion</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">78%</h3>
                  <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    5.3%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <Progress value={78} className="mt-4 h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewStats;
