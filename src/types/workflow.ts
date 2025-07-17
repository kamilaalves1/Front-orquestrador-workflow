export interface Bureau {
  id: string;
  name: string;
  type: 'bureau' | 'scoring' | 'validation' | 'custom';
  provider: string;
  icon?: string;
  description?: string;
  endpoint?: string;
  config?: Record<string, any>;
}

export interface WorkflowNode {
  id: string;
  type: 'input' | 'bureau' | 'condition' | 'assignment' | 'output';
  position: { x: number; y: number };
  data: {
    label: string;
    bureau?: Bureau;
    conditions?: Condition[];
    assignments?: Assignment[];
    config?: Record<string, any>;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
  data?: {
    condition?: string;
    label?: string;
  };
}

export interface Condition {
  id: string;
  field: string;
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'in' | 'not_in';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface Assignment {
  id: string;
  variable: string;
  value: any;
  type: 'static' | 'dynamic' | 'function';
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  version: string;
  status: 'draft' | 'active' | 'inactive';
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  variables: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  input: Record<string, any>;
  output?: Record<string, any>;
  steps: ExecutionStep[];
  metadata?: Record<string, any>;
}

export interface ExecutionStep {
  nodeId: string;
  nodeName: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  startTime: Date;
  endTime?: Date;
  input?: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
  duration?: number;
}

export const AVAILABLE_BUREAUS: Bureau[] = [
  {
    id: 'serasa',
    name: 'Serasa Experian',
    type: 'bureau',
    provider: 'Serasa',
    description: 'Credit bureau and identity verification',
    icon: '🏛️'
  },
  {
    id: 'telesign',
    name: 'Telesign',
    type: 'validation',
    provider: 'Telesign',
    description: 'Phone and SMS verification',
    icon: '📱'
  },
  {
    id: 'prove',
    name: 'Prove',
    type: 'validation',
    provider: 'Prove',
    description: 'Phone-centric identity verification',
    icon: '🔐'
  },
  {
    id: 'brscan',
    name: 'BRScan',
    type: 'validation',
    provider: 'BRScan',
    description: 'Document validation and OCR',
    icon: '📄'
  },
  {
    id: 'bigdata_corp',
    name: 'BigData Corp',
    type: 'bureau',
    provider: 'BigData Corp',
    description: 'Risk assessment and scoring',
    icon: '📊'
  },
  {
    id: 'equifax',
    name: 'Equifax',
    type: 'bureau',
    provider: 'Equifax',
    description: 'Credit reporting and risk management',
    icon: '🏦'
  },
  {
    id: 'creditsafe',
    name: 'Creditsafe',
    type: 'bureau',
    provider: 'Creditsafe',
    description: 'Business credit reports',
    icon: '💼'
  }
];