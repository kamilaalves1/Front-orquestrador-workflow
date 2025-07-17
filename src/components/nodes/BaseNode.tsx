import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BaseNodeProps {
  data: {
    label: string;
    description?: string;
    status?: 'idle' | 'running' | 'success' | 'error';
    config?: Record<string, any>;
  };
  children?: React.ReactNode;
  className?: string;
  color?: string;
  icon?: React.ReactNode;
  showHandles?: boolean;
}

export const BaseNode = memo(({
  data,
  children,
  className = '',
  color = 'bg-primary',
  icon,
  showHandles = true
}: BaseNodeProps) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'running': return 'bg-warning';
      case 'success': return 'bg-success';
      case 'error': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className={`min-w-[200px] p-0 border-2 border-border hover:border-primary transition-all duration-200 ${className}`}>
      {showHandles && (
        <>
          <Handle
            type="target"
            position={Position.Left}
            className="w-3 h-3 !bg-border hover:!bg-primary transition-colors"
          />
          <Handle
            type="source"
            position={Position.Right}
            className="w-3 h-3 !bg-border hover:!bg-primary transition-colors"
          />
        </>
      )}

      <div className={`${color} p-3 flex items-center gap-2`}>
        {icon && <div className="text-white">{icon}</div>}
        <div className="flex-1">
          <div className="font-medium text-white text-sm truncate">
            {data.label}
          </div>
          {data.description && (
            <div className="text-xs text-white/80 truncate">
              {data.description}
            </div>
          )}
        </div>
        {data.status && (
          <Badge variant="secondary" className={`${getStatusColor(data.status)} text-white text-xs`}>
            {data.status}
          </Badge>
        )}
      </div>

      {children && (
        <div className="p-3 bg-card">
          {children}
        </div>
      )}
    </Card>
  );
});