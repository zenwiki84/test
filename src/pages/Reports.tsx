
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import OverviewStats from '@/components/reports/OverviewStats';
import ReportFilters from '@/components/reports/ReportFilters';
import ReportTabs from '@/components/reports/ReportTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { DownloadIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefreshData = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data refreshed",
        description: "Report data has been updated with latest information.",
      });
    }, 1500);
  };

  const handleExportReport = () => {
    toast({
      title: "Report exported",
      description: "Your report has been downloaded successfully.",
    });
  };

  const currentDate = format(new Date(), 'MMMM d, yyyy');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Behavioral Reports</h1>
              <p className="text-muted-foreground">Track student behavior and performance metrics</p>
              <p className="text-sm text-muted-foreground mt-1">Last updated: {currentDate}</p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
              <ReportFilters
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
              />
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleRefreshData}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleExportReport}
                >
                  <DownloadIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Report Summary</CardTitle>
                <CardDescription>
                  {selectedStudent === 'all' 
                    ? 'Overall behavioral statistics for all students' 
                    : `Detailed behavioral statistics for ${selectedStudent.charAt(0).toUpperCase() + selectedStudent.slice(1)}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="behavior">Behavior</TabsTrigger>
                    <TabsTrigger value="academic">Academic</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-0">
                    <OverviewStats />
                  </TabsContent>
                  
                  <TabsContent value="attendance" className="mt-0">
                    <div className="text-center py-8 text-muted-foreground">
                      Detailed attendance statistics will be available when connected to the PostgreSQL database.
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="behavior" className="mt-0">
                    <div className="text-center py-8 text-muted-foreground">
                      Detailed behavior statistics will be available when connected to the PostgreSQL database.
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="academic" className="mt-0">
                    <div className="text-center py-8 text-muted-foreground">
                      Detailed academic statistics will be available when connected to the PostgreSQL database.
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <ReportTabs />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
