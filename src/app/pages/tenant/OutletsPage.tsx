import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, Search, MoreVertical, Building2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const outlets = [
  {
    id: 'main-store',
    name: 'Main Store',
    code: 'MS-001',
    city: 'New York',
    region: 'Manhattan',
    manager: 'Sarah Johnson',
    staffCount: 12,
    posStatus: 'active',
    inventoryStatus: 'active',
    status: 'Active',
  },
  {
    id: 'downtown',
    name: 'Downtown Branch',
    code: 'DT-002',
    city: 'New York',
    region: 'Brooklyn',
    manager: 'Mike Chen',
    staffCount: 8,
    posStatus: 'active',
    inventoryStatus: 'active',
    status: 'Active',
  },
  {
    id: 'uptown',
    name: 'Uptown Store',
    code: 'UP-003',
    city: 'New York',
    region: 'Bronx',
    manager: 'Unassigned',
    staffCount: 3,
    posStatus: 'setup',
    inventoryStatus: 'setup',
    status: 'Setup',
  },
];

export function OutletsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const hasOutlets = outlets.length > 0;

  return (
    <div className="max-w-[1600px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-foreground mb-2">Outlet Management</h1>
          <p className="text-muted-foreground">Manage all outlets under your business</p>
        </div>
        <Link to="/tenant/outlets/create">
          <Button>
            <Plus className="w-4 h-4" />
            Create Outlet
          </Button>
        </Link>
      </div>

      {!hasOutlets ? (
        <Card>
          <CardContent className="p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-foreground mb-2">No Outlets Yet</h3>
            <p className="text-muted-foreground mb-6">Create your first outlet to start selling</p>
            <Link to="/tenant/outlets/create">
              <Button>
                <Plus className="w-4 h-4" />
                Create Outlet
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by outlet name, city, manager..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>All Status</option>
                <option>Active</option>
                <option>Setup</option>
                <option>Inactive</option>
              </select>
              <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>All Cities</option>
                <option>New York</option>
                <option>Los Angeles</option>
              </select>
              <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>All Types</option>
                <option>Retail Store</option>
                <option>Warehouse</option>
                <option>Pickup Point</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/30">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm text-muted-foreground">Outlet Name</th>
                    <th className="text-left px-6 py-3 text-sm text-muted-foreground">Outlet Code</th>
                    <th className="text-left px-6 py-3 text-sm text-muted-foreground">City / Region</th>
                    <th className="text-left px-6 py-3 text-sm text-muted-foreground">Manager</th>
                    <th className="text-left px-6 py-3 text-sm text-muted-foreground">Staff Count</th>
                    <th className="text-left px-6 py-3 text-sm text-muted-foreground">POS Status</th>
                    <th className="text-left px-6 py-3 text-sm text-muted-foreground">Inventory Status</th>
                    <th className="text-left px-6 py-3 text-sm text-muted-foreground">Status</th>
                    <th className="text-right px-6 py-3 text-sm text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {outlets.map((outlet) => (
                    <tr key={outlet.id} className="border-b border-border hover:bg-accent/30 transition-colors">
                      <td className="px-6 py-4">
                        <Link to={`/tenant/outlets/${outlet.id}`} className="text-sm text-foreground hover:text-primary">
                          {outlet.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground font-mono">{outlet.code}</td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {outlet.city}, {outlet.region}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{outlet.manager}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{outlet.staffCount}</td>
                      <td className="px-6 py-4">
                        <Badge variant={outlet.posStatus === 'active' ? 'success' : 'warning'}>
                          {outlet.posStatus}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={outlet.inventoryStatus === 'active' ? 'success' : 'warning'}>
                          {outlet.inventoryStatus}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={outlet.status === 'Active' ? 'success' : 'warning'}>
                          {outlet.status}
                        </Badge>
                      </td>
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
                                Edit Outlet
                              </DropdownMenu.Item>
                              <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none">
                                Assign Staff
                              </DropdownMenu.Item>
                              <DropdownMenu.Separator className="h-px bg-border my-1" />
                              <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none text-destructive">
                                Deactivate Outlet
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
      )}
    </div>
  );
}
