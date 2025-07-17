import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Filter, 
  Search,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const executionData = [
  {
    id: 'exec_001',
    workflowName: 'KYC Validation',
    status: 'completed',
    result: 'approved',
    startTime: '2024-01-17 14:30:25',
    endTime: '2024-01-17 14:30:27',
    duration: '1.8s',
    inputData: { cpf: '123.456.789-00', name: 'João Silva' },
    steps: [
      { node: 'Input', status: 'completed', duration: '0.1s' },
      { node: 'Serasa Check', status: 'completed', duration: '1.2s', result: { score: 750 } },
      { node: 'Score Validation', status: 'completed', duration: '0.1s' },
      { node: 'Output', status: 'completed', duration: '0.4s' }
    ]
  },
  {
    id: 'exec_002',
    workflowName: 'Credit Assessment',
    status: 'completed',
    result: 'rejected',
    startTime: '2024-01-17 14:28:15',
    endTime: '2024-01-17 14:28:18',
    duration: '3.2s',
    inputData: { cpf: '987.654.321-00', name: 'Maria Santos' },
    steps: [
      { node: 'Input', status: 'completed', duration: '0.1s' },
      { node: 'BigData Corp', status: 'completed', duration: '2.1s', result: { score: 320 } },
      { node: 'Score Validation', status: 'completed', duration: '0.1s' },
      { node: 'Output', status: 'completed', duration: '0.9s' }
    ]
  },
  {
    id: 'exec_003',
    workflowName: 'Phone Validation',
    status: 'failed',
    result: 'error',
    startTime: '2024-01-17 14:25:10',
    endTime: '2024-01-17 14:25:11',
    duration: '1.1s',
    inputData: { phone: '+5511999999999' },
    steps: [
      { node: 'Input', status: 'completed', duration: '0.1s' },
      { node: 'Telesign Check', status: 'failed', duration: '1.0s', error: 'API timeout' }
    ],
    error: 'External API timeout - Telesign service unavailable'
  }
];

const stats = [
  { label: 'Total Executions', value: '15,247', change: '+12%', trend: 'up' },
  { label: 'Success Rate', value: '94.2%', change: '+2.1%', trend: 'up' },
  { label: 'Avg Duration', value: '2.3s', change: '-0.2s', trend: 'down' },
  { label: 'Failed Executions', value: '887', change: '-5%', trend: 'down' }
];

export const ExecutionReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedExecution, setSelectedExecution] = useState<any>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'running':
        return <Clock className="w-4 h-4 text-warning animate-spin" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'approved':
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive text-destructive-foreground">Rejected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">{result}</Badge>;
    }
  };

  const filteredExecutions = executionData.filter(execution => {
    const matchesSearch = execution.workflowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || execution.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Execution Reports</h2>
          <p className="text-muted-foreground">
            Monitor and analyze workflow execution performance
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="executions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="executions">Executions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="executions" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`flex items-center text-sm ${
                      stat.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {stat.trend === 'up' ? 
                        <TrendingUp className="w-4 h-4 mr-1" /> : 
                        <TrendingDown className="w-4 h-4 mr-1" />
                      }
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search executions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="today">
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Executions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Executions</CardTitle>
              <CardDescription>
                Detailed view of workflow executions and results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredExecutions.map((execution) => (
                  <div
                    key={execution.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(execution.status)}
                      <div>
                        <div className="font-medium">{execution.workflowName}</div>
                        <div className="text-sm text-muted-foreground">
                          {execution.id} • {execution.startTime}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{execution.duration}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                      
                      {getResultBadge(execution.result)}
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedExecution(execution)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Execution Details</DialogTitle>
                            <DialogDescription>
                              {execution.id} - {execution.workflowName}
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedExecution && (
                            <div className="space-y-6">
                              {/* Execution Info */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Status</Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    {getStatusIcon(selectedExecution.status)}
                                    <span className="capitalize">{selectedExecution.status}</span>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Result</Label>
                                  <div className="mt-1">
                                    {getResultBadge(selectedExecution.result)}
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Duration</Label>
                                  <div className="mt-1">{selectedExecution.duration}</div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Started</Label>
                                  <div className="mt-1 text-sm">{selectedExecution.startTime}</div>
                                </div>
                              </div>

                              {/* Input Data */}
                              <div>
                                <Label className="text-sm font-medium">Input Data</Label>
                                <div className="mt-2 p-3 bg-muted rounded-lg">
                                  <pre className="text-sm">
                                    {JSON.stringify(selectedExecution.inputData, null, 2)}
                                  </pre>
                                </div>
                              </div>

                              {/* Execution Steps */}
                              <div>
                                <Label className="text-sm font-medium">Execution Steps</Label>
                                <div className="mt-2 space-y-2">
                                  {selectedExecution.steps.map((step: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                                      <div className="flex items-center gap-3">
                                        {getStatusIcon(step.status)}
                                        <span className="font-medium">{step.node}</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <span className="text-sm text-muted-foreground">{step.duration}</span>
                                        {step.result && (
                                          <Badge variant="outline" className="text-xs">
                                            Score: {step.result.score}
                                          </Badge>
                                        )}
                                        {step.error && (
                                          <Badge variant="destructive" className="text-xs">
                                            {step.error}
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Error Details */}
                              {selectedExecution.error && (
                                <div>
                                  <Label className="text-sm font-medium text-destructive">Error Details</Label>
                                  <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                                    <p className="text-sm text-destructive">{selectedExecution.error}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Analytics Dashboard
              </CardTitle>
              <CardDescription>
                Performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Analytics Coming Soon</h3>
                <p className="text-sm">
                  Advanced analytics and visualization charts will be available here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Metrics
              </CardTitle>
              <CardDescription>
                System performance and optimization insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Performance Monitoring</h3>
                <p className="text-sm">
                  Detailed performance analysis and optimization recommendations
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};