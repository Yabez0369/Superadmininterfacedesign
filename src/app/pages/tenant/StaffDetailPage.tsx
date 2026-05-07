import { useParams, Link } from 'react-router';
import { ArrowLeft, Edit, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import * as Tabs from '@radix-ui/react-tabs';

export function StaffDetailPage() {
  const { staffId } = useParams();

  return (
    <div className="max-w-[1600px]">
      <Link to="/tenant/staff" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Staff
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-foreground">Sarah Johnson</h1>
            <Badge variant="secondary">Outlet Manager</Badge>
            <Badge variant="success">Active</Badge>
          </div>
          <p className="text-muted-foreground">Main Store • sarah@retailhub.com</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button variant="outline">Reset Password</Button>
          <Button variant="outline" className="text-destructive">Deactivate</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Role</p>
            <p className="text-foreground">Outlet Manager</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Assigned Outlet</p>
            <p className="text-foreground">Main Store</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Last Active</p>
            <p className="text-foreground">2 hours ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">2FA Status</p>
            <Badge variant="success">Enabled</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs.Root defaultValue="profile" className="w-full">
        <Tabs.List className="border-b border-border mb-6">
          <Tabs.Trigger
            value="profile"
            className="px-4 py-2 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Profile
          </Tabs.Trigger>
          <Tabs.Trigger
            value="permissions"
            className="px-4 py-2 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Role & Permissions
          </Tabs.Trigger>
          <Tabs.Trigger
            value="outlet"
            className="px-4 py-2 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Outlet Assignment
          </Tabs.Trigger>
          <Tabs.Trigger
            value="activity"
            className="px-4 py-2 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Activity Log
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="profile">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                    <p className="text-foreground">Sarah Johnson</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-foreground">sarah@retailhub.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-foreground">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Employee ID</p>
                    <p className="text-foreground">EMP-001</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Employment Status</p>
                    <p className="text-foreground">Permanent</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Shift Access</p>
                    <p className="text-foreground">Full Time</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Joined Date</p>
                    <p className="text-foreground">March 15, 2026</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Login Status</p>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs.Content>

        <Tabs.Content value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                As an <strong>Outlet Manager</strong>, this user has full access to outlet operations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-2">POS Access</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Full POS operations</li>
                    <li>• Process returns</li>
                    <li>• Apply discounts</li>
                    <li>• Manager overrides</li>
                  </ul>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-2">Inventory Access</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• View inventory</li>
                    <li>• Adjust stock</li>
                    <li>• Receive stock</li>
                    <li>• Transfer stock</li>
                  </ul>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-2">Outlet Management</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• View outlet dashboard</li>
                    <li>• Edit outlet settings</li>
                    <li>• Manage staff</li>
                    <li>• Configure hardware</li>
                  </ul>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-2">Reports</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• View sales reports</li>
                    <li>• View stock reports</li>
                    <li>• Export reports</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="outlet">
          <Card>
            <CardHeader>
              <CardTitle>Outlet Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-foreground mb-1">Main Store</h4>
                    <p className="text-sm text-muted-foreground">123 Main St, New York, NY 10001</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">Outlet Manager</Badge>
                      <Badge variant="success">Active</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change Outlet</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 pb-3 border-b border-border">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Approved stock adjustment</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-border">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Completed manager training module</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Logged in from POS terminal</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
