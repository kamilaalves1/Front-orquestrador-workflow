import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search,
  Settings,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2,
  Database,
  Zap,
  Shield,
  AlertTriangle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AVAILABLE_BUREAUS } from '@/types/workflow';

const bureauConnections = [
  {
    id: 'serasa_prod',
    bureau: AVAILABLE_BUREAUS.find(b => b.id === 'serasa'),
    environment: 'production',
    status: 'active',
    lastUsed: '2 minutes ago',
    responseTime: '850ms',
    successRate: 99.2,
    totalRequests: 12547,
    configuration: {
      apiKey: '••••••••••••8x9z',
      endpoint: 'https://api.serasa.com.br/v2',
      timeout: 30000,
      retryAttempts: 3
    }
  },
  {
    id: 'telesign_prod',
    bureau: AVAILABLE_BUREAUS.find(b => b.id === 'telesign'),
    environment: 'production',
    status: 'active',
    lastUsed: '5 minutes ago',
    responseTime: '1.2s',
    successRate: 97.8,
    totalRequests: 8934,
    configuration: {
      apiKey: '••••••••••••2a4b',
      endpoint: 'https://rest-api.telesign.com',
      timeout: 25000,
      retryAttempts: 2
    }
  },
  {
    id: 'bigdata_test',
    bureau: AVAILABLE_BUREAUS.find(b => b.id === 'bigdata_corp'),
    environment: 'sandbox',
    status: 'inactive',
    lastUsed: '2 days ago',
    responseTime: '2.1s',
    successRate: 95.5,
    totalRequests: 156,
    configuration: {
      apiKey: '••••••••••••test',
      endpoint: 'https://sandbox.bigdatacorp.com.br',
      timeout: 20000,
      retryAttempts: 1
    }
  }
];

export const BureauManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConnection, setSelectedConnection] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-muted-foreground" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  const getEnvironmentBadge = (env: string) => {
    return env === 'production' ? 
      <Badge className="bg-success text-success-foreground">Production</Badge> :
      <Badge variant="secondary">Sandbox</Badge>;
  };

  const filteredConnections = bureauConnections.filter(connection => 
    connection.bureau?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.bureau?.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Bureau Management</h2>
          <p className="text-muted-foreground">
            Manage external bureau connections and configurations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Connection
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Bureau Connection</DialogTitle>
              <DialogDescription>
                Configure a new connection to an external bureau service
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bureau Service</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bureau" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_BUREAUS.map((bureau) => (
                        <SelectItem key={bureau.id} value={bureau.id}>
                          <div className="flex items-center gap-2">
                            <span>{bureau.icon}</span>
                            <span>{bureau.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Environment</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="sandbox">Sandbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input placeholder="https://api.example.com/v1" />
              </div>
              
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" placeholder="Enter API key" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Timeout (ms)</Label>
                  <Input type="number" defaultValue="30000" />
                </div>
                
                <div className="space-y-2">
                  <Label>Retry Attempts</Label>
                  <Input type="number" defaultValue="3" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="auto-activate" />
                <Label htmlFor="auto-activate">Activate connection immediately</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Create Connection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="available">Available Bureaus</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search connections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Connections List */}
          <div className="grid gap-4">
            {filteredConnections.map((connection) => (
              <Card key={connection.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl">{connection.bureau?.icon}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{connection.bureau?.name}</h3>
                          {getStatusIcon(connection.status)}
                          {getEnvironmentBadge(connection.environment)}
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          {connection.bureau?.provider} • {connection.bureau?.description}
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Response: {connection.responseTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span>Success: {connection.successRate}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="w-4 h-4" />
                            <span>{connection.totalRequests.toLocaleString()} requests</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Last used {connection.lastUsed}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedConnection(connection)}
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Configure
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Test
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Bureau Services</CardTitle>
              <CardDescription>
                Browse and configure available bureau integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {AVAILABLE_BUREAUS.map((bureau) => (
                  <Card key={bureau.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-lg">{bureau.icon}</span>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="font-medium">{bureau.name}</h3>
                            <p className="text-sm text-muted-foreground">{bureau.provider}</p>
                          </div>
                          
                          <p className="text-xs text-muted-foreground">
                            {bureau.description}
                          </p>
                          
                          <Badge variant="outline" className="text-xs">
                            {bureau.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button size="sm" className="w-full mt-4">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Connection
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Global Settings
              </CardTitle>
              <CardDescription>
                Configure global bureau connection settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Timeout (ms)</Label>
                  <Input type="number" defaultValue="30000" />
                </div>
                
                <div className="space-y-2">
                  <Label>Default Retry Attempts</Label>
                  <Input type="number" defaultValue="3" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Connection Pooling</Label>
                    <p className="text-sm text-muted-foreground">
                      Reuse connections to improve performance
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Retry Failed Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically retry failed API calls
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Log All Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Log all bureau API requests for debugging
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Configuration Dialog */}
      {selectedConnection && (
        <Dialog open={!!selectedConnection} onOpenChange={() => setSelectedConnection(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Configure {selectedConnection.bureau?.name}</DialogTitle>
              <DialogDescription>
                Update connection settings and configuration
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedConnection.status)}
                    <span className="capitalize">{selectedConnection.status}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Environment</Label>
                  {getEnvironmentBadge(selectedConnection.environment)}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input defaultValue={selectedConnection.configuration.endpoint} />
              </div>
              
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" defaultValue={selectedConnection.configuration.apiKey} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Timeout (ms)</Label>
                  <Input type="number" defaultValue={selectedConnection.configuration.timeout} />
                </div>
                
                <div className="space-y-2">
                  <Label>Retry Attempts</Label>
                  <Input type="number" defaultValue={selectedConnection.configuration.retryAttempts} />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="connection-active" 
                  checked={selectedConnection.status === 'active'}
                />
                <Label htmlFor="connection-active">Active connection</Label>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setSelectedConnection(null)}>
                Cancel
              </Button>
              <Button variant="outline">
                Test Connection
              </Button>
              <Button onClick={() => setSelectedConnection(null)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};