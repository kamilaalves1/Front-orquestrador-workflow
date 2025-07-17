import { memo } from 'react';
import { Position, Handle } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { Target } from 'lucide-react';

export const OutputNode = memo(({ data }: { data: any }) => {
  return (
    <BaseNode
      data={data}
      color="bg-node-output"
      icon={<Target className="w-4 h-4" />}
      showHandles={false}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-node-output hover:!bg-destructive transition-colors"
      />
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">
          Final workflow result
        </div>
        
        {data.config?.outputFormat && (
          <div className="text-xs">
            Format: <span className="font-medium">{data.config.outputFormat}</span>
          </div>
        )}
      </div>
    </BaseNode>
  );
});