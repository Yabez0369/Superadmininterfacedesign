import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Building2, Users, AlertCircle, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

const quickActions = [
  { label: 'Create Outlet', path: '/tenant-admin/outlets/create', icon: Building2 },
  { label: 'Add Staff', path: '/tenant-admin/staff/create', icon: Users },
  { label: 'Manage Roles', path: '/tenant-admin/roles', icon: CheckCircle2 },
  { label: 'View Inventory', path: '/tenant-admin/inventory', icon: AlertCircle },
];

const outletSetupProgress = [
  { outlet: 'Main Store', progress: 100, status: 'completed' },
  { outlet: 'Downtown Branch', progress: 75, status: 'in-progress' },
  { outlet: 'Uptown Store', progress: 45, status: 'in-progress' },
];

const recentStaffActivity = [
  { name: 'Sarah Johnson', action: 'Completed outlet manager training', time: '2 hours ago', outlet: 'Main Store' },
  { name: 'Mike Chen', action: 'First POS sale transaction', time: '3 hours ago', outlet: 'Downtown Branch' },
  { name: 'Emma Davis', action: 'Stock adjustment approved', time: '5 hours ago', outlet: 'Main Store' },
  { name: 'David Lee', action: 'Assigned to Uptown Store', time: '1 day ago', outlet: 'Uptown Store' },
];

const outletStatus = [
  { outlet: 'Main Store', posStatus: 'active', inventoryStatus: 'active', manager: 'Sarah Johnson', staff: 12 },
  { outlet: 'Downtown Branch', posStatus: 'active', inventoryStatus: 'active', manager: 'Mike Chen', staff: 8 },
  { outlet: 'Uptown Store', posStatus: 'setup', inventoryStatus: 'setup', manager: 'Unassigned', staff: 3 },
];

export function TenantDashboardPage() {
  return (
    <div className="max-w-[1600px]">
      <div className="mb-8">
        <h1 className="text-foreground mb-2">Business Dashboard</h1>
        <p className="text-muted-foreground">Manage outlets, staff, roles, inventory, and operational setup</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Outlets</p>
                <h2 className="text-foreground">5</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-success">+2</span>
              <span className="text-muted-foreground">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Staff</p>
                <h2 className="text-foreground">42</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">12 managers, 30 staff</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Low Stock Alerts</p>
                <h2 className="text-foreground">8</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Across 3 outlets</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Setup Tasks</p>
                <h2 className="text-foreground">6</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Clock className="w-5 h-5 text-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Needs attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Outlet Setup Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {outletSetupProgress.map((outlet) => (
                  <div key={outlet.outlet}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">{outlet.outlet}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{outlet.progress}%</span>
                        <Badge variant={outlet.status === 'completed' ? 'success' : 'warning'}>
                          {outlet.status === 'completed' ? 'Complete' : 'In Progress'}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${outlet.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Staff Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStaffActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.outlet} • {activity.time}
                      </p>
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
              <CardTitle>Outlet Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {outletStatus.map((outlet) => (
                  <div key={outlet.outlet} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm text-foreground">{outlet.outlet}</h4>
                      <Badge variant="secondary">{outlet.staff} staff</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">POS</span>
                        <Badge variant={outlet.posStatus === 'active' ? 'success' : 'warning'}>
                          {outlet.posStatus}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Inventory</span>
                        <Badge variant={outlet.inventoryStatus === 'active' ? 'success' : 'warning'}>
                          {outlet.inventoryStatus}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-muted-foreground">Manager</span>
                        <span className="text-foreground">{outlet.manager}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.path}>
                  <Button variant="outline" className="w-full justify-start">
                    <action.icon className="w-4 h-4" />
                    {action.label}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
