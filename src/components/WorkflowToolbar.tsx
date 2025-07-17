import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Play, 
  Save, 
  Settings, 
  FileText, 
  Database,
  GitBranch,
  Zap,
  Target,
  ArrowRight,
  Pause
} from 'lucide-react';

const nodeTypes = [
  {
    type: 'bureau',
    label: 'Serviço Bureau',
    icon: Database,
    color: 'bg-node-bureau',
    description: 'Integração de bureau externo'
  },
  {
    type: 'condition',
    label: 'Condição',
    icon: GitBranch,
    color: 'bg-node-condition',
    description: 'Lógica condicional'
  },
  {
    type: 'assignment',
    label: 'Atribuição',
    icon: Zap,
    color: 'bg-node-assignment',
    description: 'Atribuição de variável'
  },
  {
    type: 'output',
    label: 'Saída',
    icon: Target,
    color: 'bg-node-output',
    description: 'Saída do workflow'
  }
];

export const WorkflowToolbar = () => {
  const { toast } = useToast();
  
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleTest = () => {
    toast({
      title: 'Teste Iniciado',
      description: 'Executando teste do workflow...',
    });
  };

  const handleSave = () => {
    toast({
      title: 'Workflow Salvo',
      description: 'Suas alterações foram salvas com sucesso.',
    });
  };

  const handleSettings = () => {
    toast({
      title: 'Configurações',
      description: 'Abrindo configurações do workflow...',
    });
  };

  return (
    <Card className="w-80 h-full rounded-none border-r border-border bg-card">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold mb-2">Construtor de Workflow</h2>
        <p className="text-sm text-muted-foreground">
          Arraste e solte componentes para construir seu workflow antifraude
        </p>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-6">
          <Button size="sm" className="flex-1" onClick={handleTest}>
            <Play className="w-4 h-4 mr-2" />
            Testar
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
          <Button size="sm" variant="outline" onClick={handleSettings}>
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Componentes
            </h3>
            <div className="space-y-2">
              {nodeTypes.map((nodeType) => {
                const Icon = nodeType.icon;
                return (
                  <div
                    key={nodeType.type}
                    draggable
                    onDragStart={(event) => onDragStart(event, nodeType.type)}
                    className="flex items-center p-3 border border-border rounded-lg cursor-grab hover:border-primary hover:shadow-sm transition-all group bg-card"
                  >
                    <div className={`w-8 h-8 rounded-md ${nodeType.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{nodeType.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {nodeType.description}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Informações do Workflow</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="secondary">Rascunho</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Versão:</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nós:</span>
                <span>1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Conexões:</span>
                <span>0</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Ações Rápidas</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Importar Template
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Database className="w-4 h-4 mr-2" />
                Gerenciar Bureaus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};