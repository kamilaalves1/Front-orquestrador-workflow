import { memo } from 'react';
import { BaseNode } from './BaseNode';
import { Database, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AVAILABLE_BUREAUS } from '@/types/workflow';

export const BureauNode = memo(({ data }: { data: any }) => {
  const bureau = data.bureau || AVAILABLE_BUREAUS[0];

  return (
    <BaseNode
      data={{
        ...data,
        description: bureau?.description || 'External bureau service'
      }}
      color="bg-node-bureau"
      icon={<Database className="w-4 h-4" />}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{bureau?.name || 'Select Bureau'}</span>
          <ExternalLink className="w-3 h-3 text-muted-foreground" />
        </div>
        
        {bureau?.provider && (
          <Badge variant="outline" className="text-xs">
            {bureau.provider}
          </Badge>
        )}
        
        <div className="text-xs text-muted-foreground">
          {bureau?.icon} {bureau?.type || 'bureau'}
        </div>

        {data.config?.scoreThreshold && (
          <div className="text-xs">
            Score threshold: <span className="font-medium">{data.config.scoreThreshold}</span>
          </div>
        )}

        {data.config?.stopOnReject && (
          <Badge variant="destructive" className="text-xs">
            Stop on reject
          </Badge>
        )}
      </div>
    </BaseNode>
  );
});