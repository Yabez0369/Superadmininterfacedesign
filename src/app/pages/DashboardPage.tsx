import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TrendingUp, TrendingDown, Building2, Calendar, AlertCircle } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const platformGrowthData = [
  { month: 'Jan', tenants: 120, active: 115 },
  { month: 'Feb', tenants: 135, active: 128 },
  { month: 'Mar', tenants: 158, active: 145 },
  { month: 'Apr', tenants: 182, active: 170 },
  { month: 'May', tenants: 215, active: 198 },
  { month: 'Jun', tenants: 248, active: 230 },
];

const tenantStatusData = [
  { name: 'Active', value: 230, color: '#10b981' },
  { name: 'Trial', value: 12, color: '#f59e0b' },
  { name: 'Suspended', value: 6, color: '#dc2626' },
];

const recentActivity = [
  { tenant: 'Retail Hub Inc', action: 'Upgraded to Pro plan', time: '2 hours ago', status: 'success' },
  { tenant: 'Fashion Outlet Co', action: 'New tenant created', time: '4 hours ago', status: 'default' },
  { tenant: 'Tech Store LLC', action: 'Added 3 new outlets', time: '6 hours ago', status: 'success' },
  { tenant: 'Global Mart', action: 'Enabled E-Commerce module', time: '8 hours ago', status: 'success' },
];

const attentionNeeded = [
  { tenant: 'Quick Shop Ltd', issue: 'Trial expiring in 2 days', priority: 'warning' },
  { tenant: 'Urban Fashion', issue: 'Payment method expired', priority: 'destructive' },
  { tenant: 'Daily Deals', issue: 'Approaching outlet limit', priority: 'warning' },
];

export function DashboardPage() {
  return (
    <div className="max-w-[1600px]">
      <div className="mb-6">
        <h1 className="text-foreground mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform-level overview across tenants, subscriptions, and system health.</p>
      </div>

      <div className="bg-accent/50 border border-border rounded-lg p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">
          You're viewing platform-level data. This does not include tenant sales or business operations data.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Tenants</p>
                <h2 className="text-foreground">248</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-success">+15%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Tenants</p>
                <h2 className="text-foreground">230</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-success">+12%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Trial Tenants</p>
                <h2 className="text-foreground">12</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-warning" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingDown className="w-4 h-4 text-destructive" />
              <span className="text-destructive">-8%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Renewals This Month</p>
                <h2 className="text-foreground">34</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Calendar className="w-5 h-5 text-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">22 completed, 12 pending</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={platformGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="tenants" stroke="#3730a3" strokeWidth={2} name="Total Tenants" />
                <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} name="Active Tenants" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tenant Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={tenantStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {tenantStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {tenantStatusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-foreground">{item.name}</span>
                  </div>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tenant Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.tenant}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attention Needed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attentionNeeded.map((item, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <AlertCircle className={`w-5 h-5 flex-shrink-0 ${item.priority === 'destructive' ? 'text-destructive' : 'text-warning'}`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{item.tenant}</p>
                    <p className="text-sm text-muted-foreground">{item.issue}</p>
                  </div>
                  <Badge variant={item.priority as any}>{item.priority === 'destructive' ? 'Urgent' : 'Warning'}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
