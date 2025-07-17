import { memo } from 'react';
import { BaseNode } from './BaseNode';
import { Zap, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const AssignmentNode = memo(({ data }: { data: any }) => {
  const assignments = data.assignments || [];

  return (
    <BaseNode
      data={{
        ...data,
        description: `${assignments.length} assignment${assignments.length !== 1 ? 's' : ''}`
      }}
      color="bg-node-assignment"
      icon={<Zap className="w-4 h-4" />}
    >
      <div className="space-y-2">
        {assignments.length > 0 ? (
          assignments.slice(0, 2).map((assignment: any, index: number) => (
            <div key={index} className="flex items-center text-xs bg-muted/50 rounded p-2">
              <span className="font-medium text-node-assignment">
                {assignment.variable}
              </span>
              <ArrowRight className="w-3 h-3 mx-1" />
              <span className="truncate">{String(assignment.value)}</span>
              <Badge variant="outline" className="ml-1 text-xs">
                {assignment.type}
              </Badge>
            </div>
          ))
        ) : (
          <div className="text-xs text-muted-foreground text-center py-2">
            No assignments set
          </div>
        )}
        
        {assignments.length > 2 && (
          <div className="text-xs text-muted-foreground text-center">
            +{assignments.length - 2} more
          </div>
        )}
      </div>
    </BaseNode>
  );
});