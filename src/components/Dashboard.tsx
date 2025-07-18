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
import { ExecutionLogs } from './ExecutionLogs';
import { WorkflowApproval } from './WorkflowApproval';
import { QueueManagement } from './QueueManagement';
import { NewWorkflowDialog } from './NewWorkflowDialog';
import eloLogo from '@/assets/elo-logo-correct.png';
import { useToast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const { toast } = useToast();

  const stats = [
    {
      title: 'Workflows Ativos',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Workflow,
      color: 'text-primary'
    },
    {
      title: 'Execuções Hoje',
      value: '1.247',
      change: '+15%',
      trend: 'up',
      icon: Play,
      color: 'text-success'
    },
    {
      title: 'Taxa de Sucesso',
      value: '94.2%',
      change: '+1.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      title: 'Tempo Médio',
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
      workflowName: 'Validação KYC',
      status: 'completed',
      duration: '1.8s',
      timestamp: '2 min atrás',
      result: 'approved'
    },
    {
      id: '2',
      workflowName: 'Score de Crédito',
      status: 'completed',
      duration: '3.2s',
      timestamp: '5 min atrás',
      result: 'rejected'
    },
    {
      id: '3',
      workflowName: 'Verificação de Documento',
      status: 'running',
      duration: '1.1s',
      timestamp: '1 min atrás',
      result: 'pending'
    },
    {
      id: '4',
      workflowName: 'Validação de Telefone',
      status: 'completed',
      duration: '0.9s',
      timestamp: '3 min atrás',
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
      case 'approved': return <Badge className="bg-success text-success-foreground">Aprovado</Badge>;
      case 'rejected': return <Badge className="bg-destructive text-destructive-foreground">Rejeitado</Badge>;
      case 'pending': return <Badge className="bg-warning text-warning-foreground">Pendente</Badge>;
      default: return <Badge variant="outline">{result}</Badge>;
    }
  };

  const handleNewWorkflow = (workflow: any) => {
    toast({
      title: 'Workflow Criado',
      description: `Workflow "${workflow.name}" criado com sucesso!`,
    });
  };

  const handleSettings = () => {
    toast({
      title: 'Configurações',
      description: 'Abrindo configurações do sistema...',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={eloLogo} alt="ELO" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold">Orquestrador Antifraude</h1>
                <p className="text-muted-foreground">
                  Gerencie e orquestre seus workflows de prevenção à fraude
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Usuário: <strong>João Silva (Operação)</strong></span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSettings}>
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
                <NewWorkflowDialog onWorkflowCreated={handleNewWorkflow} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Construtor
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Relatórios
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Logs
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Aprovações
            </TabsTrigger>
            <TabsTrigger value="bureaus" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Bureaus
            </TabsTrigger>
            <TabsTrigger value="queue" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Fila
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
                        do período anterior
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Executions */}
            <Card>
              <CardHeader>
                <CardTitle>Execuções Recentes</CardTitle>
                <CardDescription>
                  Últimas execuções de workflows e seus resultados
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
                          {execution.status === 'completed' ? 'Concluído' :
                           execution.status === 'running' ? 'Executando' : 'Falhou'}
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

          <TabsContent value="logs" className="space-y-6">
            <ExecutionLogs />
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <WorkflowApproval />
          </TabsContent>

          <TabsContent value="bureaus" className="space-y-6">
            <BureauManagement />
          </TabsContent>

          <TabsContent value="queue" className="space-y-6">
            <QueueManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};