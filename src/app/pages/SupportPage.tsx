import { useState } from 'react';
import { Search, Filter, MessageSquare, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const issues = [
  {
    id: 'SUP-2026-1234',
    tenant: 'Retail Hub Inc',
    subject: 'Unable to access E-Commerce module',
    priority: 'high',
    status: 'open',
    assignedTo: 'Mike Johnson',
    createdAt: '2 hours ago',
    sla: 'On Track',
  },
  {
    id: 'SUP-2026-1233',
    tenant: 'Fashion Outlet Co',
    subject: 'Request for outlet limit increase',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'Sarah Smith',
    createdAt: '5 hours ago',
    sla: 'On Track',
  },
  {
    id: 'SUP-2026-1232',
    tenant: 'Tech Store LLC',
    subject: 'Billing discrepancy on invoice',
    priority: 'high',
    status: 'open',
    assignedTo: 'Unassigned',
    createdAt: '8 hours ago',
    sla: 'At Risk',
  },
  {
    id: 'SUP-2026-1231',
    tenant: 'Quick Shop Ltd',
    subject: 'Trial extension request',
    priority: 'low',
    status: 'open',
    assignedTo: 'Emily Davis',
    createdAt: '1 day ago',
    sla: 'On Track',
  },
  {
    id: 'SUP-2026-1230',
    tenant: 'Urban Fashion',
    subject: 'Account reactivation after suspension',
    priority: 'high',
    status: 'resolved',
    assignedTo: 'Mike Johnson',
    createdAt: '2 days ago',
    sla: 'Met',
  },
];

export function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(issues[0]);

  return (
    <div className="max-w-[1600px]">
      <div className="mb-8">
        <h1 className="text-foreground mb-2">Support & Issues</h1>
        <p className="text-muted-foreground">Manage platform-level tenant support requests</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search issues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>All Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {issues.map((issue) => (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-accent/30 ${
                      selectedIssue.id === issue.id ? 'bg-accent/50 border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-muted-foreground font-mono">{issue.id}</span>
                          <Badge
                            variant={
                              issue.priority === 'high'
                                ? 'destructive'
                                : issue.priority === 'medium'
                                ? 'warning'
                                : 'secondary'
                            }
                          >
                            {issue.priority}
                          </Badge>
                          <Badge
                            variant={
                              issue.status === 'resolved'
                                ? 'success'
                                : issue.status === 'in-progress'
                                ? 'warning'
                                : 'default'
                            }
                          >
                            {issue.status}
                          </Badge>
                        </div>
                        <p className="text-foreground mb-1">{issue.subject}</p>
                        <p className="text-sm text-muted-foreground">{issue.tenant}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Assigned to: {issue.assignedTo}</span>
                      <span>{issue.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Queue Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Open Issues</span>
                <span className="text-foreground">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">In Progress</span>
                <span className="text-foreground">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Resolved Today</span>
                <span className="text-foreground">18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">At Risk SLA</span>
                <span className="text-destructive">3</span>
              </div>
            </CardContent>
          </Card>

          {selectedIssue && (
            <Card>
              <CardHeader>
                <CardTitle>Issue Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">ID</p>
                  <p className="text-sm text-foreground font-mono">{selectedIssue.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tenant</p>
                  <p className="text-sm text-foreground">{selectedIssue.tenant}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Subject</p>
                  <p className="text-sm text-foreground">{selectedIssue.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Priority</p>
                  <Badge
                    variant={
                      selectedIssue.priority === 'high'
                        ? 'destructive'
                        : selectedIssue.priority === 'medium'
                        ? 'warning'
                        : 'secondary'
                    }
                  >
                    {selectedIssue.priority}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge
                    variant={
                      selectedIssue.status === 'resolved'
                        ? 'success'
                        : selectedIssue.status === 'in-progress'
                        ? 'warning'
                        : 'default'
                    }
                  >
                    {selectedIssue.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Assigned To</p>
                  <p className="text-sm text-foreground">{selectedIssue.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">SLA Status</p>
                  <Badge variant={selectedIssue.sla === 'At Risk' ? 'destructive' : 'success'}>
                    {selectedIssue.sla}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created</p>
                  <p className="text-sm text-foreground">{selectedIssue.createdAt}</p>
                </div>

                <div className="pt-4 space-y-2 border-t border-border">
                  <Button className="w-full justify-start" size="sm">
                    <User className="w-4 h-4" />
                    Assign to Me
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <MessageSquare className="w-4 h-4" />
                    Reply to Tenant
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    Mark as Resolved
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
