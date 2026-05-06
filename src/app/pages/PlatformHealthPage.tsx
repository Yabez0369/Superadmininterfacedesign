import { CheckCircle2, AlertCircle, XCircle, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const services = [
  { name: 'API Gateway', status: 'operational', uptime: '99.98%', responseTime: '45ms' },
  { name: 'Database', status: 'operational', uptime: '99.99%', responseTime: '12ms' },
  { name: 'AI Processing', status: 'operational', uptime: '99.95%', responseTime: '230ms' },
  { name: 'Sync Engine', status: 'degraded', uptime: '99.87%', responseTime: '890ms' },
  { name: 'Auth Service', status: 'operational', uptime: '99.99%', responseTime: '8ms' },
  { name: 'Notification Service', status: 'operational', uptime: '99.96%', responseTime: '120ms' },
];

const healthTrendData = [
  { time: '00:00', uptime: 100, requests: 12000 },
  { time: '04:00', uptime: 99.9, requests: 8000 },
  { time: '08:00', uptime: 99.8, requests: 25000 },
  { time: '12:00', uptime: 99.7, requests: 35000 },
  { time: '16:00', uptime: 99.9, requests: 32000 },
  { time: '20:00', uptime: 100, requests: 18000 },
];

const incidents = [
  {
    id: 'INC-2026-042',
    service: 'Sync Engine',
    issue: 'Increased response time',
    status: 'investigating',
    time: '15 minutes ago',
    severity: 'warning',
  },
  {
    id: 'INC-2026-041',
    service: 'API Gateway',
    issue: 'Brief spike in 5xx errors',
    status: 'resolved',
    time: '2 hours ago',
    severity: 'success',
  },
  {
    id: 'INC-2026-040',
    service: 'Database',
    issue: 'Scheduled maintenance completed',
    status: 'resolved',
    time: '6 hours ago',
    severity: 'default',
  },
];

const recentActions = [
  { action: 'Scaled API Gateway instances', admin: 'System Auto-Scale', time: '30 mins ago' },
  { action: 'Updated SSL certificates', admin: 'Jane Smith', time: '2 hours ago' },
  { action: 'Deployed security patch v2.4.1', admin: 'Mike Johnson', time: '4 hours ago' },
  { action: 'Restarted Sync Engine workers', admin: 'System Monitor', time: '6 hours ago' },
];

export function PlatformHealthPage() {
  return (
    <div className="max-w-[1600px]">
      <div className="mb-8">
        <h1 className="text-foreground mb-2">Platform Health</h1>
        <p className="text-muted-foreground">Monitor platform services and system status</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {services.map((service) => (
          <Card key={service.name}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-foreground mb-1">{service.name}</h4>
                  <Badge
                    variant={
                      service.status === 'operational'
                        ? 'success'
                        : service.status === 'degraded'
                        ? 'warning'
                        : 'destructive'
                    }
                  >
                    {service.status === 'operational' ? (
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                    ) : service.status === 'degraded' ? (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {service.status}
                  </Badge>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="text-foreground">{service.uptime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="text-foreground">{service.responseTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Platform Health Trend (24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={healthTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="left" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line yAxisId="left" type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={2} name="Uptime %" />
              <Line yAxisId="right" type="monotone" dataKey="requests" stroke="#3730a3" strokeWidth={2} name="Requests" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Latest Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm text-foreground">{incident.service}</p>
                      <p className="text-xs text-muted-foreground">{incident.id}</p>
                    </div>
                    <Badge
                      variant={
                        incident.status === 'resolved'
                          ? 'success'
                          : incident.status === 'investigating'
                          ? 'warning'
                          : 'destructive'
                      }
                    >
                      {incident.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground mb-2">{incident.issue}</p>
                  <p className="text-xs text-muted-foreground">{incident.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActions.map((action, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{action.action}</p>
                    <p className="text-xs text-muted-foreground">
                      by {action.admin} • {action.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
