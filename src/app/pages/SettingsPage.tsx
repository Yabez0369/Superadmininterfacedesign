import { Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import * as Switch from '@radix-ui/react-switch';
import { cn } from '../lib/utils';

export function SettingsPage() {
  return (
    <div className="max-w-[1000px]">
      <div className="mb-8">
        <h1 className="text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage platform-wide configuration and preferences</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Profile</CardTitle>
            <CardDescription>Basic information about your platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Platform Name</label>
                <Input defaultValue="Unified Commerce" />
              </div>
              <div>
                <label className="block text-sm mb-2">Platform Domain</label>
                <Input defaultValue="app.unifiedcommerce.com" />
              </div>
              <div>
                <label className="block text-sm mb-2">Support Email</label>
                <Input type="email" defaultValue="support@unifiedcommerce.com" />
              </div>
              <div>
                <label className="block text-sm mb-2">Contact Phone</label>
                <Input type="tel" defaultValue="+1 (555) 000-0000" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure platform-wide security policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="text-sm text-foreground">Require 2FA for all admin users</p>
                <p className="text-xs text-muted-foreground">Force two-factor authentication for platform admins</p>
              </div>
              <Switch.Root
                defaultChecked
                className="w-11 h-6 bg-primary rounded-full"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="text-sm text-foreground">Auto-logout inactive sessions</p>
                <p className="text-xs text-muted-foreground">Automatically log out users after period of inactivity</p>
              </div>
              <Switch.Root
                defaultChecked
                className="w-11 h-6 bg-primary rounded-full"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Session timeout (minutes)</label>
                <Input type="number" defaultValue="30" />
              </div>
              <div>
                <label className="block text-sm mb-2">Password minimum length</label>
                <Input type="number" defaultValue="12" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="text-sm text-foreground">Enable audit log encryption</p>
                <p className="text-xs text-muted-foreground">Encrypt all audit logs at rest</p>
              </div>
              <Switch.Root
                defaultChecked
                className="w-11 h-6 bg-primary rounded-full"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure platform notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="text-sm text-foreground">New tenant created</p>
                <p className="text-xs text-muted-foreground">Notify when a new tenant is created</p>
              </div>
              <Switch.Root
                defaultChecked
                className="w-11 h-6 bg-primary rounded-full"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="text-sm text-foreground">Payment failures</p>
                <p className="text-xs text-muted-foreground">Alert when tenant payment fails</p>
              </div>
              <Switch.Root
                defaultChecked
                className="w-11 h-6 bg-primary rounded-full"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="text-sm text-foreground">Platform health issues</p>
                <p className="text-xs text-muted-foreground">Alert on service degradation or outages</p>
              </div>
              <Switch.Root
                defaultChecked
                className="w-11 h-6 bg-primary rounded-full"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="text-sm text-foreground">High priority support tickets</p>
                <p className="text-xs text-muted-foreground">Notify for urgent support issues</p>
              </div>
              <Switch.Root
                defaultChecked
                className="w-11 h-6 bg-primary rounded-full"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>Manage platform super admin users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    SA
                  </div>
                  <div>
                    <p className="text-sm text-foreground">admin@unifiedcommerce.com</p>
                    <p className="text-xs text-muted-foreground">Super Admin</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                    MS
                  </div>
                  <div>
                    <p className="text-sm text-foreground">mike@unifiedcommerce.com</p>
                    <p className="text-xs text-muted-foreground">Platform Admin</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
            <Button variant="outline" className="w-full">Add Admin User</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API & Integration</CardTitle>
            <CardDescription>Manage API keys and external integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Platform API Key</label>
              <div className="flex gap-2">
                <Input type="password" defaultValue="sk_live_xxxxxxxxxxxx" className="flex-1" />
                <Button variant="outline">Regenerate</Button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Webhook Endpoint</label>
              <Input defaultValue="https://api.unifiedcommerce.com/webhooks" />
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="text-sm text-foreground">Enable webhook notifications</p>
                <p className="text-xs text-muted-foreground">Send events to external systems</p>
              </div>
              <Switch.Root
                defaultChecked
                className="w-11 h-6 bg-primary rounded-full"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Mode</CardTitle>
            <CardDescription>Enable platform-wide maintenance mode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border-2 border-warning bg-warning/5 rounded-lg">
              <div>
                <p className="text-sm text-foreground">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground">Block all tenant access during maintenance</p>
              </div>
              <Switch.Root
                className="w-11 h-6 bg-switch-background rounded-full"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <div>
              <label className="block text-sm mb-2">Maintenance Message</label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                rows={3}
                defaultValue="The platform is currently under maintenance. We'll be back shortly."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup & Retention</CardTitle>
            <CardDescription>Configure automated backups and data retention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Backup Frequency</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Daily</option>
                  <option>Every 12 hours</option>
                  <option>Every 6 hours</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Retention Period (days)</label>
                <Input type="number" defaultValue="90" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="text-sm text-foreground">Enable automated backups</p>
                <p className="text-xs text-muted-foreground">Automatically backup platform data</p>
              </div>
              <Switch.Root
                defaultChecked
                className="w-11 h-6 bg-primary rounded-full"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <Button variant="outline" className="w-full">Run Manual Backup Now</Button>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
