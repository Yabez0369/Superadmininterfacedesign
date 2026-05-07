import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, Search, MoreVertical, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const staff = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@retailhub.com',
    role: 'Outlet Manager',
    outlet: 'Main Store',
    status: 'Active',
    lastActive: '2 hours ago',
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@retailhub.com',
    role: 'Outlet Manager',
    outlet: 'Downtown Branch',
    status: 'Active',
    lastActive: '1 hour ago',
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@retailhub.com',
    role: 'Cashier',
    outlet: 'Main Store',
    status: 'Active',
    lastActive: '30 mins ago',
  },
  {
    id: '4',
    name: 'David Lee',
    email: 'david@retailhub.com',
    role: 'Stock Keeper',
    outlet: 'Main Store',
    status: 'Active',
    lastActive: '5 hours ago',
  },
];

export function StaffRolesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-[1600px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-foreground mb-2">Staff & Roles</h1>
          <p className="text-muted-foreground">Manage staff users and role templates</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/tenant-admin/roles">
            <Button variant="outline">
              <Shield className="w-4 h-4" />
              Manage Roles
            </Button>
          </Link>
          <Link to="/tenant-admin/staff/create">
            <Button>
              <Plus className="w-4 h-4" />
              Add Staff
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Outlet Managers</p>
            <h3 className="text-foreground">5</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Cashiers</p>
            <h3 className="text-foreground">24</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Stock Keepers</p>
            <h3 className="text-foreground">8</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Maintenance Staff</p>
            <h3 className="text-foreground">5</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Roles</option>
              <option>Outlet Manager</option>
              <option>Cashier</option>
              <option>Stock Keeper</option>
              <option>Maintenance Staff</option>
            </select>
            <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Outlets</option>
              <option>Main Store</option>
              <option>Downtown Branch</option>
            </select>
            <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Staff Name</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Email</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Role</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Assigned Outlet</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Status</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Last Active</th>
                  <th className="text-right px-6 py-3 text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((member) => (
                  <tr key={member.id} className="border-b border-border hover:bg-accent/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link to={`/tenant-admin/staff/${member.id}`} className="text-sm text-foreground hover:text-primary">
                        {member.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{member.email}</td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary">{member.role}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{member.outlet}</td>
                    <td className="px-6 py-4">
                      <Badge variant="success">{member.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{member.lastActive}</td>
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
                              View Profile
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none">
                              Edit Staff
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none">
                              Reset Password
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="h-px bg-border my-1" />
                            <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none text-destructive">
                              Deactivate
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
