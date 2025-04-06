
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PerformanceMetrics from './PerformanceMetrics';
import BehavioralIncidents from './BehavioralIncidents';
import AttendanceChart from './AttendanceChart';
import BehaviorChart from './BehaviorChart';
import ParticipationChart from './ParticipationChart';

const ReportTabs = () => {
  return (
    <Tabs defaultValue="overview" className="mb-6">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="attendance">Attendance</TabsTrigger>
        <TabsTrigger value="behavior">Behavior</TabsTrigger>
        <TabsTrigger value="academic">Academic</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceMetrics />
          <BehavioralIncidents />
        </div>
      </TabsContent>

      <TabsContent value="attendance">
        <AttendanceChart />
      </TabsContent>

      <TabsContent value="behavior">
        <BehaviorChart />
      </TabsContent>

      <TabsContent value="academic">
        <ParticipationChart />
      </TabsContent>
    </Tabs>
  );
};

export default ReportTabs;
