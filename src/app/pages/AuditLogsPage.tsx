import { useState } from 'react';
import { Download, Filter, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const logs = [
  {
    id: 'AUD-2026-1234',
    timestamp: '2026-05-06 14:23:45',
    actor: 'admin@unified.com',
    action: 'Tenant Created',
    entity: 'Retail Hub Inc',
    scope: 'Platform',
    status: 'success',
    details: 'Created tenant with Pro plan',
  },
  {
    id: 'AUD-2026-1233',
    timestamp: '2026-05-06 13:15:22',
    actor: 'admin@unified.com',
    action: 'Plan Changed',
    entity: 'Fashion Outlet Co',
    scope: 'Subscription',
    status: 'success',
    details: 'Upgraded from Basic to Pro',
  },
  {
    id: 'AUD-2026-1232',
    timestamp: '2026-05-06 12:08:10',
    actor: 'admin@unified.com',
    action: 'Feature Disabled',
    entity: 'Tech Store LLC',
    scope: 'Feature Access',
    status: 'success',
    details: 'Disabled Offline POS module',
  },
  {
    id: 'AUD-2026-1231',
    timestamp: '2026-05-06 11:45:33',
    actor: 'system@unified.com',
    action: 'Tenant Suspended',
    entity: 'Urban Fashion',
    scope: 'Platform',
    status: 'warning',
    details: 'Auto-suspended due to payment failure',
  },
  {
    id: 'AUD-2026-1230',
    timestamp: '2026-05-06 10:22:18',
    actor: 'admin@unified.com',
    action: 'Password Reset',
    entity: 'john@retailhub.com',
    scope: 'Security',
    status: 'success',
    details: 'Admin password reset for tenant admin',
  },
  {
    id: 'AUD-2026-1229',
    timestamp: '2026-05-06 09:10:05',
    actor: 'admin@unified.com',
    action: 'Settings Updated',
    entity: 'Platform Config',
    scope: 'Platform',
    status: 'success',
    details: 'Updated platform security settings',
  },
  {
    id: 'AUD-2026-1228',
    timestamp: '2026-05-06 08:33:47',
    actor: 'system@unified.com',
    action: 'Backup Completed',
    entity: 'Database',
    scope: 'System',
    status: 'success',
    details: 'Automated daily backup completed',
  },
];

export function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-[1600px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-foreground mb-2">Audit Logs</h1>
          <p className="text-muted-foreground">Track platform-level admin actions and changes</p>
        </div>
        <Button>
          <Download className="w-4 h-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Severity</option>
              <option>Success</option>
              <option>Warning</option>
              <option>Error</option>
            </select>
            <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Actions</option>
              <option>Tenant Created</option>
              <option>Plan Changed</option>
              <option>Feature Modified</option>
              <option>Settings Updated</option>
            </select>
            <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Scopes</option>
              <option>Platform</option>
              <option>Subscription</option>
              <option>Feature Access</option>
              <option>Security</option>
              <option>System</option>
            </select>
            <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Last 24 hours</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Custom range</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Timestamp</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Actor</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Action</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Entity</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Scope</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Status</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Details</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-border hover:bg-accent/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm text-muted-foreground font-mono">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{log.actor}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{log.action}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{log.entity}</td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary">{log.scope}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          log.status === 'success'
                            ? 'success'
                            : log.status === 'warning'
                            ? 'warning'
                            : 'destructive'
                        }
                      >
                        {log.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-6 border-t border-border">
            <p className="text-sm text-muted-foreground">Showing 1-7 of 1,234 logs</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
