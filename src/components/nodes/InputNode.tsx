import { memo } from 'react';
import { Position, Handle } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { Play } from 'lucide-react';

export const InputNode = memo(({ data }: { data: any }) => {
  return (
    <BaseNode
      data={data}
      color="bg-node-input"
      icon={<Play className="w-4 h-4" />}
      showHandles={false}
    >
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-node-input hover:!bg-success transition-colors"
      />
      <div className="text-xs text-muted-foreground">
        Workflow entry point
      </div>
    </BaseNode>
  );
});