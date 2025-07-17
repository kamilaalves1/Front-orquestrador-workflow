import { memo } from 'react';
import { BaseNode } from './BaseNode';
import { GitBranch, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Handle, Position } from '@xyflow/react';

export const ConditionNode = memo(({ data }: { data: any }) => {
  const conditions = data.conditions || [];

  return (
    <BaseNode
      data={{
        ...data,
        description: `${conditions.length} condition${conditions.length !== 1 ? 's' : ''}`
      }}
      color="bg-node-condition"
      icon={<GitBranch className="w-4 h-4" />}
      showHandles={false}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-node-condition hover:!bg-warning transition-colors"
      />
      
      <div className="space-y-2">
        {conditions.length > 0 ? (
          conditions.slice(0, 2).map((condition: any, index: number) => (
            <div key={index} className="flex items-center text-xs bg-muted/50 rounded p-2">
              <span className="font-medium">{condition.field}</span>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Badge variant="outline" className="text-xs">
                {condition.operator}
              </Badge>
              <ChevronRight className="w-3 h-3 mx-1" />
              <span className="truncate">{String(condition.value)}</span>
            </div>
          ))
        ) : (
          <div className="text-xs text-muted-foreground text-center py-2">
            No conditions set
          </div>
        )}
        
        {conditions.length > 2 && (
          <div className="text-xs text-muted-foreground text-center">
            +{conditions.length - 2} more
          </div>
        )}
      </div>

      {/* Success/True handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{ top: '60%' }}
        className="w-3 h-3 !bg-success hover:!bg-success/80 transition-colors"
      />
      
      {/* Failure/False handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        className="w-3 h-3 !bg-destructive hover:!bg-destructive/80 transition-colors"
      />
    </BaseNode>
  );
});