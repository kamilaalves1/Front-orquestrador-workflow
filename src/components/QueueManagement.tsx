import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, User, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QueueItem {
  id: string;
  operation: string;
  workflow: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdBy: string;
  assignedTo?: string;
  createdAt: Date;
  priority: 'high' | 'medium' | 'low';
}

export const QueueManagement = () => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    {
      id: '1',
      operation: '0000-RF2-Mali',
      workflow: 'Verificação de Fraude',
      status: 'pending',
      createdBy: 'Admin Emissor',
      createdAt: new Date(),
      priority: 'high'
    },
    {
      id: '2',
      operation: '0001-TX3-SP',
      workflow: 'Análise de Risco',
      status: 'in-progress',
      createdBy: 'Admin Emissor',
      assignedTo: 'João Silva',
      createdAt: new Date(Date.now() - 3600000),
      priority: 'medium'
    }
  ]);

  const [newItem, setNewItem] = useState<{
    operation: string;
    workflow: string;
    priority: 'high' | 'medium' | 'low';
  }>({
    operation: '',
    workflow: '',
    priority: 'medium'
  });

  const { toast } = useToast();

  const handleAddItem = () => {
    if (!newItem.operation || !newItem.workflow) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const item: QueueItem = {
      id: Date.now().toString(),
      operation: newItem.operation,
      workflow: newItem.workflow,
      status: 'pending',
      createdBy: 'Admin Emissor',
      createdAt: new Date(),
      priority: newItem.priority
    };

    setQueueItems([...queueItems, item]);
    setNewItem({ operation: '', workflow: '', priority: 'medium' });
    
    toast({
      title: "Sucesso",
      description: "Item adicionado à fila com sucesso."
    });
  };

  const handleAssignToSelf = (itemId: string) => {
    setQueueItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'in-progress' as const, assignedTo: 'Usuário Atual' }
          : item
      )
    );
    
    toast({
      title: "Atribuído",
      description: "Item atribuído para você."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'in-progress': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com usuário logado */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Fila de Atendimento</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>Usuário: <strong>João Silva (Operação)</strong></span>
        </div>
      </div>

      {/* Formulário para adicionar novo item */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Adicionar à Fila
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="operation">Operação *</Label>
              <Input
                id="operation"
                placeholder="Ex: 0000-RF2-Mali"
                value={newItem.operation}
                onChange={(e) => setNewItem(prev => ({ ...prev, operation: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workflow">Workflow *</Label>
              <Select
                value={newItem.workflow}
                onValueChange={(value) => setNewItem(prev => ({ ...prev, workflow: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o workflow" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Verificação de Fraude">Verificação de Fraude</SelectItem>
                  <SelectItem value="Análise de Risco">Análise de Risco</SelectItem>
                  <SelectItem value="Validação de Dados">Validação de Dados</SelectItem>
                  <SelectItem value="Processamento Manual">Processamento Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select
                value={newItem.priority}
                onValueChange={(value: 'high' | 'medium' | 'low') => setNewItem(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleAddItem} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </CardContent>
      </Card>

      {/* Lista de itens da fila */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Todos as Filas</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{queueItems.length} item(s) na fila</span>
          </div>
        </div>

        <div className="grid gap-4">
          {queueItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{item.operation}</h4>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Média' : 'Baixa'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{item.workflow}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Criado por: {item.createdBy}</span>
                      {item.assignedTo && <span>Atribuído a: {item.assignedTo}</span>}
                      <span>Criado: {item.createdAt.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === 'pending' ? 'Pendente' : 
                       item.status === 'in-progress' ? 'Em Andamento' : 'Concluído'}
                    </Badge>
                    
                    {item.status === 'pending' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleAssignToSelf(item.id)}
                        variant="outline"
                      >
                        Atender
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {queueItems.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              <p>Nenhum item na fila de atendimento</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};