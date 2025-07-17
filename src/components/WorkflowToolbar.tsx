import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Save, 
  Settings, 
  FileText, 
  Database,
  GitBranch,
  Zap,
  Target,
  ArrowRight
} from 'lucide-react';

const nodeTypes = [
  {
    type: 'bureau',
    label: 'Bureau Service',
    icon: Database,
    color: 'bg-node-bureau',
    description: 'External bureau integration'
  },
  {
    type: 'condition',
    label: 'Condition',
    icon: GitBranch,
    color: 'bg-node-condition',
    description: 'Conditional logic'
  },
  {
    type: 'assignment',
    label: 'Assignment',
    icon: Zap,
    color: 'bg-node-assignment',
    description: 'Variable assignment'
  },
  {
    type: 'output',
    label: 'Output',
    icon: Target,
    color: 'bg-node-output',
    description: 'Workflow output'
  }
];

export const WorkflowToolbar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card className="w-80 h-full rounded-none border-r border-border bg-card">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold mb-2">Workflow Builder</h2>
        <p className="text-sm text-muted-foreground">
          Drag and drop components to build your anti-fraud workflow
        </p>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-6">
          <Button size="sm" className="flex-1">
            <Play className="w-4 h-4 mr-2" />
            Test
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button size="sm" variant="outline">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Components
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
            <h3 className="font-medium mb-3">Workflow Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="secondary">Draft</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version:</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nodes:</span>
                <span>1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Connections:</span>
                <span>0</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Import Template
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Database className="w-4 h-4 mr-2" />
                Manage Bureaus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};