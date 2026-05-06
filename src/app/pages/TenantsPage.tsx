import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, Download, Filter, Search, MoreVertical } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const tenants = [
  {
    id: 'TNT-001',
    businessName: 'Retail Hub Inc',
    tenantId: 'retail-hub-inc',
    owner: 'John Smith',
    plan: 'Pro',
    status: 'Active',
    outlets: 5,
    lastActive: '2 hours ago',
    renewal: 'May 15, 2026',
  },
  {
    id: 'TNT-002',
    businessName: 'Fashion Outlet Co',
    tenantId: 'fashion-outlet',
    owner: 'Sarah Johnson',
    plan: 'Enterprise',
    status: 'Active',
    outlets: 12,
    lastActive: '1 hour ago',
    renewal: 'Jun 22, 2026',
  },
  {
    id: 'TNT-003',
    businessName: 'Tech Store LLC',
    tenantId: 'tech-store',
    owner: 'Michael Chen',
    plan: 'Basic',
    status: 'Active',
    outlets: 3,
    lastActive: '30 mins ago',
    renewal: 'Jul 8, 2026',
  },
  {
    id: 'TNT-004',
    businessName: 'Quick Shop Ltd',
    tenantId: 'quick-shop',
    owner: 'Emma Wilson',
    plan: 'Trial',
    status: 'Trial',
    outlets: 1,
    lastActive: '5 hours ago',
    renewal: 'May 8, 2026',
  },
  {
    id: 'TNT-005',
    businessName: 'Urban Fashion',
    tenantId: 'urban-fashion',
    owner: 'David Brown',
    plan: 'Pro',
    status: 'Suspended',
    outlets: 8,
    lastActive: '2 days ago',
    renewal: 'Suspended',
  },
];

export function TenantsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-[1600px]">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-foreground mb-2">Tenant Management</h1>
          <p className="text-muted-foreground">Manage tenant lifecycle and access</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Link to="/tenants/create">
            <Button>
              <Plus className="w-4 h-4" />
              Create Tenant
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Active Tenants</p>
            <h3 className="text-foreground">230</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Trial Tenants</p>
            <h3 className="text-foreground">12</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Suspended</p>
            <h3 className="text-foreground">6</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Renewal Risk</p>
            <h3 className="text-foreground">8</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tenants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Status</option>
              <option>Active</option>
              <option>Trial</option>
              <option>Suspended</option>
            </select>
            <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Plans</option>
              <option>Enterprise</option>
              <option>Pro</option>
              <option>Basic</option>
              <option>Trial</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Business Name</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Tenant ID</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Owner</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Plan</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Status</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Outlets</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Last Active</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Renewal</th>
                  <th className="text-right px-6 py-3 text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.id} className="border-b border-border hover:bg-accent/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link to={`/tenants/${tenant.tenantId}`} className="text-sm text-foreground hover:text-primary">
                        {tenant.businessName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{tenant.tenantId}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{tenant.owner}</td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary">{tenant.plan}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          tenant.status === 'Active'
                            ? 'success'
                            : tenant.status === 'Trial'
                            ? 'warning'
                            : 'destructive'
                        }
                      >
                        {tenant.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{tenant.outlets}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{tenant.lastActive}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{tenant.renewal}</td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content
                            className="min-w-[180px] bg-popover border border-border rounded-lg shadow-lg p-1"
                            align="end"
                          >
                            <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none">
                              View Details
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none">
                              Edit Tenant
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none">
                              Manage Subscription
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="h-px bg-border my-1" />
                            <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none text-destructive">
                              {tenant.status === 'Suspended' ? 'Activate' : 'Suspend'} Tenant
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
