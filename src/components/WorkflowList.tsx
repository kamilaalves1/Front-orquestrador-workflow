import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, 
  Pause, 
  Edit, 
  Copy, 
  Trash2, 
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Calendar,
  GitBranch,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const workflows = [
  {
    id: '1',
    name: 'KYC Validation Workflow',
    description: 'Complete KYC validation using multiple bureaus',
    status: 'active',
    version: '2.1.0',
    nodes: 8,
    connections: 12,
    executions: 1247,
    successRate: 94.2,
    avgDuration: '2.3s',
    lastModified: '2 hours ago',
    createdBy: 'Jose Luis',
    tags: ['kyc', 'validation', 'high-priority']
  },
  {
    id: '2',
    name: 'Credit Risk Assessment',
    description: 'Multi-bureau credit scoring and risk evaluation',
    status: 'active',
    version: '1.5.2',
    nodes: 12,
    connections: 18,
    executions: 892,
    successRate: 91.8,
    avgDuration: '4.1s',
    lastModified: '1 day ago',
    createdBy: 'Maria Silva',
    tags: ['credit', 'scoring', 'risk']
  },
  {
    id: '3',
    name: 'Document Verification',
    description: 'OCR and document validation pipeline',
    status: 'draft',
    version: '0.8.0',
    nodes: 6,
    connections: 8,
    executions: 0,
    successRate: 0,
    avgDuration: '-',
    lastModified: '3 days ago',
    createdBy: 'Carlos Roberto',
    tags: ['document', 'ocr', 'validation']
  },
  {
    id: '4',
    name: 'Phone Number Validation',
    description: 'Telesign and Prove integration for phone verification',
    status: 'inactive',
    version: '1.2.1',
    nodes: 4,
    connections: 5,
    executions: 234,
    successRate: 98.7,
    avgDuration: '1.1s',
    lastModified: '1 week ago',
    createdBy: 'Ana Costa',
    tags: ['phone', 'sms', 'validation']
  }
];

export const WorkflowList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastModified');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'draft':
        return <Badge className="bg-warning text-warning-foreground">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Workflows</h2>
          <p className="text-muted-foreground">
            Manage and monitor your fraud prevention workflows
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Workflow
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search workflows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastModified">Last Modified</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="executions">Executions</SelectItem>
                <SelectItem value="successRate">Success Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Cards */}
      <div className="grid gap-6">
        {filteredWorkflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    {getStatusBadge(workflow.status)}
                    <Badge variant="outline" className="text-xs">
                      v{workflow.version}
                    </Badge>
                  </div>
                  <CardDescription>{workflow.description}</CardDescription>
                  <div className="flex gap-1 flex-wrap">
                    {workflow.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Play className="h-4 w-4 mr-2" />
                      Test Run
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <GitBranch className="w-4 h-4 mr-1" />
                    Structure
                  </div>
                  <div className="text-sm font-medium">
                    {workflow.nodes} nodes, {workflow.connections} connections
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Play className="w-4 h-4 mr-1" />
                    Executions
                  </div>
                  <div className="text-sm font-medium">
                    {workflow.executions.toLocaleString()}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                  <div className="text-sm font-medium">
                    {workflow.successRate > 0 ? `${workflow.successRate}%` : '-'}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    Avg Duration
                  </div>
                  <div className="text-sm font-medium">{workflow.avgDuration}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  Modified {workflow.lastModified} by {workflow.createdBy}
                </div>
                
                <div className="flex gap-2">
                  {workflow.status === 'active' ? (
                    <Button size="sm" variant="outline">
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      Activate
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkflows.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-muted-foreground text-center">
              <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No workflows found</h3>
              <p className="text-sm mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first workflow to get started'
                }
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Workflow
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};