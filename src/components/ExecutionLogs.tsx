import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, Eye } from 'lucide-react';

interface ExecutionLog {
  id: string;
  workflowName: string;
  status: 'success' | 'failed' | 'running';
  startTime: string;
  endTime?: string;
  duration?: number;
  userId: string;
  bureausExecuted: string[];
  finalScore: number;
  result: 'approved' | 'rejected';
}

const mockLogs: ExecutionLog[] = [
  {
    id: 'exec-001',
    workflowName: 'Verificação KYC Completa',
    status: 'success',
    startTime: '2024-01-15T10:30:00Z',
    endTime: '2024-01-15T10:30:45Z',
    duration: 45,
    userId: 'user123',
    bureausExecuted: ['Serasa', 'TeleSign', 'Prove'],
    finalScore: 750,
    result: 'approved'
  },
  {
    id: 'exec-002',
    workflowName: 'Validação Básica',
    status: 'failed',
    startTime: '2024-01-15T10:25:00Z',
    endTime: '2024-01-15T10:25:15Z',
    duration: 15,
    userId: 'user456',
    bureausExecuted: ['BRScan'],
    finalScore: 300,
    result: 'rejected'
  },
  {
    id: 'exec-003',
    workflowName: 'Verificação Express',
    status: 'running',
    startTime: '2024-01-15T10:35:00Z',
    userId: 'user789',
    bureausExecuted: ['TeleSign'],
    finalScore: 0,
    result: 'approved'
  }
];

export const ExecutionLogs = () => {
  const [logs] = useState<ExecutionLog[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.workflowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'success': return 'success' as const;
      case 'failed': return 'destructive' as const;
      case 'running': return 'warning' as const;
      default: return 'secondary' as const;
    }
  };

  const getResultVariant = (result: string) => {
    return result === 'approved' ? 'success' as const : 'destructive' as const;
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '-';
    return `${seconds}s`;
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Log de Execuções</h2>
        <p className="text-muted-foreground">
          Histórico completo de todas as execuções de workflows
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por workflow ou usuário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="success">Sucesso</SelectItem>
                  <SelectItem value="failed">Falha</SelectItem>
                  <SelectItem value="running">Executando</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Workflow</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Resultado</TableHead>
                  <TableHead>Bureaus</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{log.id}</TableCell>
                    <TableCell className="font-medium">{log.workflowName}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(log.status)}>
                        {log.status === 'success' ? 'Sucesso' :
                         log.status === 'failed' ? 'Falha' : 'Executando'}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.userId}</TableCell>
                    <TableCell>{formatDateTime(log.startTime)}</TableCell>
                    <TableCell>{formatDuration(log.duration)}</TableCell>
                    <TableCell>{log.finalScore}</TableCell>
                    <TableCell>
                      {log.status !== 'running' && (
                        <Badge variant={getResultVariant(log.result)}>
                          {log.result === 'approved' ? 'Aprovado' : 'Rejeitado'}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {log.bureausExecuted.map((bureau, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {bureau}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};