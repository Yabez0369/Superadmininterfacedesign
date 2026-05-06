import { useParams, Link } from 'react-router';
import { ArrowLeft, Edit, MoreVertical, Building2, Users, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const timelineEvents = [
  { date: '2 hours ago', event: 'Plan upgraded to Pro', type: 'success' },
  { date: '3 days ago', event: 'Added new outlet: Downtown Store', type: 'default' },
  { date: '1 week ago', event: 'Enabled E-Commerce module', type: 'success' },
  { date: '2 weeks ago', event: 'Staff user limit increased to 50', type: 'default' },
  { date: '1 month ago', event: 'Trial converted to paid plan', type: 'success' },
];

const enabledModules = [
  { name: 'POS', enabled: true },
  { name: 'Inventory', enabled: true },
  { name: 'AI Onboarding', enabled: true },
  { name: 'E-Commerce', enabled: true },
  { name: 'Multi-Outlet', enabled: true },
  { name: 'Offline POS', enabled: false },
  { name: 'Advanced Reporting', enabled: true },
  { name: 'Priority Support', enabled: true },
];

const outlets = [
  { name: 'Main Store', location: 'New York, NY', status: 'Active', staff: 12 },
  { name: 'Downtown Store', location: 'Brooklyn, NY', status: 'Active', staff: 8 },
  { name: 'Uptown Store', location: 'Manhattan, NY', status: 'Active', staff: 10 },
];

export function TenantDetailPage() {
  const { tenantId } = useParams();

  return (
    <div className="max-w-[1600px]">
      <div className="mb-6">
        <Link to="/tenants" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Tenants
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-foreground">Retail Hub Inc</h1>
              <Badge variant="success">Active</Badge>
              <Badge variant="secondary">Pro Plan</Badge>
            </div>
            <p className="text-muted-foreground">Tenant ID: {tenantId}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button variant="outline">
                  <MoreVertical className="w-4 h-4" />
                  More
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[200px] bg-popover border border-border rounded-lg shadow-lg p-1"
                  align="end"
                >
                  <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none">
                    Manage Subscription
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none">
                    Reset Admin Password
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none">
                    View Audit Logs
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="h-px bg-border my-1" />
                  <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none text-warning">
                    Suspend Tenant
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>

      <div className="bg-accent/50 border border-border rounded-lg p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">
          Business operational data is restricted at this level. This view shows platform-level tenant information only.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Account Status</p>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="text-foreground">Active</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
            <h4 className="text-foreground">Pro</h4>
            <p className="text-xs text-muted-foreground mt-1">$199/month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Outlets</p>
            <h4 className="text-foreground">5</h4>
            <p className="text-xs text-muted-foreground mt-1">Limit: 10</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Staff Count</p>
            <h4 className="text-foreground">42</h4>
            <p className="text-xs text-muted-foreground mt-1">Limit: 50</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Created Date</p>
            </div>
            <p className="text-foreground">March 15, 2026</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Last Active</p>
            </div>
            <p className="text-foreground">2 hours ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Renewal Date</p>
            </div>
            <p className="text-foreground">May 15, 2026</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Business Name</p>
                  <p className="text-foreground">Retail Hub Inc</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Legal Name</p>
                  <p className="text-foreground">Retail Hub Incorporated</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Business Type</p>
                  <p className="text-foreground">Retail</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Registration Number</p>
                  <p className="text-foreground">REG-2026-1234</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Country</p>
                  <p className="text-foreground">United States</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Time Zone</p>
                  <p className="text-foreground">EST (UTC-5)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contact Email</p>
                  <p className="text-foreground">contact@retailhub.com</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="text-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                  <p className="text-foreground">Pro Plan</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Billing Cycle</p>
                  <p className="text-foreground">Monthly</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Cost</p>
                  <p className="text-foreground">$199.00</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Next Billing</p>
                  <p className="text-foreground">June 1, 2026</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Auto Renew</p>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                  <Badge variant="success">Current</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enabled Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {enabledModules.map((module) => (
                  <div key={module.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm text-foreground">{module.name}</span>
                    <Badge variant={module.enabled ? 'success' : 'secondary'}>
                      {module.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Outlet Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {outlets.map((outlet) => (
                  <div key={outlet.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">{outlet.name}</p>
                        <p className="text-xs text-muted-foreground">{outlet.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Staff</p>
                        <p className="text-sm text-foreground">{outlet.staff}</p>
                      </div>
                      <Badge variant="success">{outlet.status}</Badge>
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
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to={`/subscriptions/${tenantId}`}>
                <Button variant="outline" className="w-full justify-start">
                  Manage Subscription
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                Reset Admin Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Configure Outlets
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Audit Logs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Billing</span>
                <Badge variant="success">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Usage</span>
                <Badge variant="success">Normal</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Compliance</span>
                <Badge variant="success">Compliant</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Setup Completeness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall</span>
                  <span className="text-foreground">95%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '95%' }}></div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-3 h-3 text-success" />
                    <span className="text-muted-foreground">Business profile complete</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-3 h-3 text-success" />
                    <span className="text-muted-foreground">Payment method added</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-3 h-3 text-success" />
                    <span className="text-muted-foreground">Outlets configured</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <AlertCircle className="w-3 h-3 text-warning" />
                    <span className="text-muted-foreground">2FA not enabled</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm text-foreground">{event.event}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
