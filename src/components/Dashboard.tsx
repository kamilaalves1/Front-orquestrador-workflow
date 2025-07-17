import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  BarChart3, 
  FileText, 
  Workflow,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { WorkflowBuilder } from './WorkflowBuilder';
import { WorkflowList } from './WorkflowList';
import { ExecutionReports } from './ExecutionReports';
import { BureauManagement } from './BureauManagement';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Active Workflows',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Workflow,
      color: 'text-primary'
    },
    {
      title: 'Executions Today',
      value: '1,247',
      change: '+15%',
      trend: 'up',
      icon: Play,
      color: 'text-success'
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+1.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      title: 'Avg Processing Time',
      value: '2.3s',
      change: '-0.1s',
      trend: 'down',
      icon: Clock,
      color: 'text-warning'
    }
  ];

  const recentExecutions = [
    {
      id: '1',
      workflowName: 'KYC Validation',
      status: 'completed',
      duration: '1.8s',
      timestamp: '2 min ago',
      result: 'approved'
    },
    {
      id: '2',
      workflowName: 'Credit Scoring',
      status: 'completed',
      duration: '3.2s',
      timestamp: '5 min ago',
      result: 'rejected'
    },
    {
      id: '3',
      workflowName: 'Document Verification',
      status: 'running',
      duration: '1.1s',
      timestamp: '1 min ago',
      result: 'pending'
    },
    {
      id: '4',
      workflowName: 'Phone Validation',
      status: 'completed',
      duration: '0.9s',
      timestamp: '3 min ago',
      result: 'approved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'running': return 'text-warning';
      case 'failed': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'approved': return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case 'rejected': return <Badge className="bg-destructive text-destructive-foreground">Rejected</Badge>;
      case 'pending': return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      default: return <Badge variant="outline">{result}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Anti-Fraud Orchestrator</h1>
              <p className="text-muted-foreground">
                Manage and orchestrate your fraud prevention workflows
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Workflow
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="bureaus" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Bureaus
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="relative overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        <span className={stat.trend === 'up' ? 'text-success' : 'text-destructive'}>
                          {stat.change}
                        </span>{' '}
                        from last period
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Executions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Executions</CardTitle>
                <CardDescription>
                  Latest workflow executions and their results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExecutions.map((execution) => (
                    <div
                      key={execution.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${
                          execution.status === 'completed' ? 'bg-success' :
                          execution.status === 'running' ? 'bg-warning animate-pulse' :
                          'bg-destructive'
                        }`} />
                        <div>
                          <div className="font-medium">{execution.workflowName}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {execution.duration} • {execution.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getResultBadge(execution.result)}
                        <Badge
                          variant="outline"
                          className={getStatusColor(execution.status)}
                        >
                          {execution.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <WorkflowList />
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <div className="bg-card rounded-lg border overflow-hidden">
              <WorkflowBuilder />
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ExecutionReports />
          </TabsContent>

          <TabsContent value="bureaus" className="space-y-6">
            <BureauManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};