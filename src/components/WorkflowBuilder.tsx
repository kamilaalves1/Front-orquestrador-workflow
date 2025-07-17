import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MiniMap,
  NodeTypes,
  EdgeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { WorkflowNode, WorkflowEdge } from '@/types/workflow';
import { BureauNode } from './nodes/BureauNode';
import { ConditionNode } from './nodes/ConditionNode';
import { InputNode } from './nodes/InputNode';
import { OutputNode } from './nodes/OutputNode';
import { AssignmentNode } from './nodes/AssignmentNode';
import { WorkflowToolbar } from './WorkflowToolbar';
import { NodePanel } from './NodePanel';
import { CustomEdge } from './edges/CustomEdge';

const nodeTypes: NodeTypes = {
  input: InputNode,
  bureau: BureauNode,
  condition: ConditionNode,
  assignment: AssignmentNode,
  output: OutputNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 100, y: 100 },
    data: { label: 'Input' },
  },
];

const initialEdges: Edge[] = [];

export const WorkflowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'custom',
            animated: true,
          },
          eds
        )
      ),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setIsPanelOpen(true);
  }, []);

  const addNode = useCallback(
    (type: string, position: { x: number; y: number }) => {
      const newNode: Node = {
        id: `${Date.now()}`,
        type,
        position,
        data: { label: getDefaultLabel(type) },
      };
      setNodes((nodes) => [...nodes, newNode]);
    },
    [setNodes]
  );

  const getDefaultLabel = (type: string): string => {
    switch (type) {
      case 'bureau': return 'Bureau Service';
      case 'condition': return 'Condition';
      case 'assignment': return 'Variable Assignment';
      case 'output': return 'Output';
      default: return 'Node';
    }
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - 200,
        y: event.clientY - 40,
      };

      addNode(type, position);
    },
    [addNode]
  );

  return (
    <div className="flex h-screen bg-workflow-bg">
      <WorkflowToolbar />
      
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          className="bg-workflow-bg"
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
          <Background 
            color="hsl(var(--workflow-border))" 
            gap={20} 
            size={1}
          />
          <Controls 
            className="bg-card border border-border rounded-lg shadow-lg"
          />
          <MiniMap 
            className="bg-card border border-border rounded-lg shadow-lg"
            nodeStrokeWidth={3}
            nodeColor={(node) => {
              switch (node.type) {
                case 'input': return 'hsl(var(--node-input))';
                case 'bureau': return 'hsl(var(--node-bureau))';
                case 'condition': return 'hsl(var(--node-condition))';
                case 'assignment': return 'hsl(var(--node-assignment))';
                case 'output': return 'hsl(var(--node-output))';
                default: return 'hsl(var(--muted))';
              }
            }}
          />
        </ReactFlow>
      </div>

      <NodePanel 
        node={selectedNode}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onUpdate={(updatedNode) => {
          setNodes((nodes) =>
            nodes.map((node) =>
              node.id === updatedNode.id ? updatedNode : node
            )
          );
        }}
      />
    </div>
  );
};