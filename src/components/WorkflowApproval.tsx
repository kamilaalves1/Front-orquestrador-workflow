import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApprovalRequest {
  id: string;
  workflowName: string;
  requestedBy: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  changes: string[];
}

const mockApprovals: ApprovalRequest[] = [
  {
    id: '1',
    workflowName: 'Verificação KYC Completa',
    requestedBy: 'João Silva',
    requestDate: '2024-01-15',
    status: 'pending',
    changes: ['Adicionado bureau Serasa', 'Alterado score mínimo para 600']
  },
  {
    id: '2',
    workflowName: 'Validação Básica',
    requestedBy: 'Maria Santos',
    requestDate: '2024-01-14',
    status: 'approved',
    changes: ['Removido bureau TeleSign', 'Otimizado fluxo de condições']
  }
];

export const WorkflowApproval = () => {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(mockApprovals);
  const { toast } = useToast();

  const handleApproval = (id: string, action: 'approve' | 'reject') => {
    setApprovals(prev => 
      prev.map(approval => 
        approval.id === id 
          ? { ...approval, status: action === 'approve' ? 'approved' : 'rejected' }
          : approval
      )
    );
    
    toast({
      title: action === 'approve' ? 'Workflow Aprovado' : 'Workflow Rejeitado',
      description: `A solicitação foi ${action === 'approve' ? 'aprovada' : 'rejeitada'} com sucesso.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'pending': return <Clock className="h-4 w-4 text-warning" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'success' as const;
      case 'rejected': return 'destructive' as const;
      case 'pending': return 'warning' as const;
      default: return 'secondary' as const;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Aprovações de Workflow</h2>
        <p className="text-muted-foreground">
          Gerencie as solicitações de aprovação para alterações em workflows
        </p>
      </div>

      <div className="grid gap-4">
        {approvals.map((approval) => (
          <Card key={approval.id} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{approval.workflowName}</CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(approval.status)}
                  <Badge variant={getStatusVariant(approval.status)}>
                    {approval.status === 'pending' ? 'Pendente' : 
                     approval.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                  </Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Solicitado por {approval.requestedBy} em {new Date(approval.requestDate).toLocaleDateString('pt-BR')}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Alterações Solicitadas:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {approval.changes.map((change, index) => (
                    <li key={index}>{change}</li>
                  ))}
                </ul>
              </div>

              {approval.status === 'pending' && (
                <>
                  <Separator />
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApproval(approval.id, 'approve')}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Aprovar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleApproval(approval.id, 'reject')}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Rejeitar
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};