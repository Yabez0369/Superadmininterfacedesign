import { useParams, Link } from 'react-router';
import { ArrowLeft, Edit, Building2, Users, Activity } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import * as Tabs from '@radix-ui/react-tabs';

export function OutletDetailPage() {
  const { outletId } = useParams();

  return (
    <div className="max-w-[1600px]">
      <Link to="/tenant/outlets" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Outlets
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-foreground">Main Store</h1>
            <Badge variant="success">Active</Badge>
          </div>
          <p className="text-muted-foreground">Outlet Code: MS-001</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Edit className="w-4 h-4" />
            Edit Outlet
          </Button>
          <Link to="/tenant/staff/create">
            <Button variant="outline">
              <Users className="w-4 h-4" />
              Assign Staff
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Staff Count</p>
            <h3 className="text-foreground">12</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">POS Status</p>
            <Badge variant="success">Active</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Inventory Tracking</p>
            <Badge variant="success">Enabled</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Last Activity</p>
            <p className="text-foreground">2 hours ago</p>
          </CardContent>
        </Card>
      </div>

      <Tabs.Root defaultValue="overview" className="w-full">
        <Tabs.List className="border-b border-border mb-6">
          <Tabs.Trigger
            value="overview"
            className="px-4 py-2 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="staff"
            className="px-4 py-2 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Staff
          </Tabs.Trigger>
          <Tabs.Trigger
            value="pos"
            className="px-4 py-2 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            POS Settings
          </Tabs.Trigger>
          <Tabs.Trigger
            value="inventory"
            className="px-4 py-2 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Inventory Settings
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="overview">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Outlet Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-foreground">123 Main St, New York, NY 10001</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Manager</p>
                    <p className="text-foreground">Sarah Johnson</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Operating Hours</p>
                    <p className="text-foreground">9:00 AM - 9:00 PM (Mon-Sun)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Contact</p>
                    <p className="text-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 pb-3 border-b border-border">
                    <Activity className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground">POS transaction completed</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-border">
                    <Activity className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground">Stock adjustment approved</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Activity className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground">New staff member assigned</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs.Content>

        <Tabs.Content value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Staff Members</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Staff list for this outlet</p>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="pos">
          <Card>
            <CardHeader>
              <CardTitle>POS Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">POS settings for this outlet</p>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Inventory settings for this outlet</p>
            </CardContent>
          </Card>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
