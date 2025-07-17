import { useState, useEffect } from 'react';
import { Node } from '@xyflow/react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { AVAILABLE_BUREAUS, Condition, Assignment } from '@/types/workflow';

interface NodePanelProps {
  node: Node | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (node: Node) => void;
}

export const NodePanel = ({ node, isOpen, onClose, onUpdate }: NodePanelProps) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (node) {
      setFormData({
        label: node.data.label || '',
        description: node.data.description || '',
        bureau: node.data.bureau,
        conditions: node.data.conditions || [],
        assignments: node.data.assignments || [],
        config: node.data.config || {},
      });
    }
  }, [node]);

  const handleSave = () => {
    if (!node) return;
    
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        ...formData,
      },
    };
    
    onUpdate(updatedNode);
    onClose();
  };

  const addCondition = () => {
    const newCondition: Condition = {
      id: Date.now().toString(),
      field: '',
      operator: 'equals',
      value: '',
    };
    setFormData((prev: any) => ({
      ...prev,
      conditions: [...(prev.conditions || []), newCondition],
    }));
  };

  const removeCondition = (id: string) => {
    setFormData((prev: any) => ({
      ...prev,
      conditions: prev.conditions?.filter((c: Condition) => c.id !== id) || [],
    }));
  };

  const updateCondition = (id: string, updates: Partial<Condition>) => {
    setFormData((prev: any) => ({
      ...prev,
      conditions: prev.conditions?.map((c: Condition) => 
        c.id === id ? { ...c, ...updates } : c
      ) || [],
    }));
  };

  const addAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      variable: '',
      value: '',
      type: 'static',
    };
    setFormData((prev: any) => ({
      ...prev,
      assignments: [...(prev.assignments || []), newAssignment],
    }));
  };

  const removeAssignment = (id: string) => {
    setFormData((prev: any) => ({
      ...prev,
      assignments: prev.assignments?.filter((a: Assignment) => a.id !== id) || [],
    }));
  };

  const updateAssignment = (id: string, updates: Partial<Assignment>) => {
    setFormData((prev: any) => ({
      ...prev,
      assignments: prev.assignments?.map((a: Assignment) => 
        a.id === id ? { ...a, ...updates } : a
      ) || [],
    }));
  };

  if (!node) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Badge variant="outline">{node.type}</Badge>
            Configure Node
          </SheetTitle>
          <SheetDescription>
            Configure the properties and behavior of this workflow node
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Basic Properties */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Basic Properties</h3>
            
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={formData.label || ''}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, label: e.target.value }))}
                placeholder="Node label"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
                placeholder="Node description"
                rows={2}
              />
            </div>
          </div>

          <Separator />

          {/* Bureau-specific configuration */}
          {node.type === 'bureau' && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Bureau Configuration</h3>
              
              <div className="space-y-2">
                <Label>Bureau Service</Label>
                <Select
                  value={formData.bureau?.id || ''}
                  onValueChange={(value) => {
                    const selectedBureau = AVAILABLE_BUREAUS.find(b => b.id === value);
                    setFormData((prev: any) => ({ ...prev, bureau: selectedBureau }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bureau" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_BUREAUS.map((bureau) => (
                      <SelectItem key={bureau.id} value={bureau.id}>
                        <div className="flex items-center gap-2">
                          <span>{bureau.icon}</span>
                          <span>{bureau.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {bureau.provider}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scoreThreshold">Score Threshold</Label>
                <Input
                  id="scoreThreshold"
                  type="number"
                  value={formData.config?.scoreThreshold || ''}
                  onChange={(e) => setFormData((prev: any) => ({
                    ...prev,
                    config: { ...prev.config, scoreThreshold: Number(e.target.value) }
                  }))}
                  placeholder="0-100"
                  min="0"
                  max="100"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="stopOnReject"
                  checked={formData.config?.stopOnReject || false}
                  onCheckedChange={(checked) => setFormData((prev: any) => ({
                    ...prev,
                    config: { ...prev.config, stopOnReject: checked }
                  }))}
                />
                <Label htmlFor="stopOnReject">Stop workflow on rejection</Label>
              </div>
            </div>
          )}

          {/* Condition-specific configuration */}
          {node.type === 'condition' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Conditions</h3>
                <Button size="sm" onClick={addCondition}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>

              <div className="space-y-3">
                {formData.conditions?.map((condition: Condition) => (
                  <div key={condition.id} className="border border-border rounded-lg p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Condition</Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeCondition(condition.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">Field</Label>
                        <Input
                          value={condition.field}
                          onChange={(e) => updateCondition(condition.id, { field: e.target.value })}
                          placeholder="data.score"
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Operator</Label>
                        <Select
                          value={condition.operator}
                          onValueChange={(value) => updateCondition(condition.id, { operator: value as any })}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="greater_than">Greater than</SelectItem>
                            <SelectItem value="less_than">Less than</SelectItem>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="in">In</SelectItem>
                            <SelectItem value="not_in">Not in</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Value</Label>
                        <Input
                          value={condition.value}
                          onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                          placeholder="Value"
                          className="h-8"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.conditions?.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No conditions configured
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Assignment-specific configuration */}
          {node.type === 'assignment' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Variable Assignments</h3>
                <Button size="sm" onClick={addAssignment}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>

              <div className="space-y-3">
                {formData.assignments?.map((assignment: Assignment) => (
                  <div key={assignment.id} className="border border-border rounded-lg p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Assignment</Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeAssignment(assignment.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">Variable</Label>
                        <Input
                          value={assignment.variable}
                          onChange={(e) => updateAssignment(assignment.id, { variable: e.target.value })}
                          placeholder="risk_score"
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Type</Label>
                        <Select
                          value={assignment.type}
                          onValueChange={(value) => updateAssignment(assignment.id, { type: value as any })}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="static">Static</SelectItem>
                            <SelectItem value="dynamic">Dynamic</SelectItem>
                            <SelectItem value="function">Function</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Value</Label>
                        <Input
                          value={assignment.value}
                          onChange={(e) => updateAssignment(assignment.id, { value: e.target.value })}
                          placeholder="Value"
                          className="h-8"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.assignments?.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No assignments configured
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-6 border-t">
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};