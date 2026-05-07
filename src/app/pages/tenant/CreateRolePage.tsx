import { Link } from 'react-router';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import * as Switch from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';

export function CreateRolePage() {
  return (
    <div className="max-w-[1000px]">
      <Link to="/tenant/staff/roles" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Role Templates
      </Link>

      <div className="mb-8">
        <h1 className="text-foreground mb-2">Create Custom Role</h1>
        <p className="text-muted-foreground">Define a new role with custom permissions</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Role Name</label>
                <Input placeholder="e.g., Senior Cashier" />
              </div>
              <div>
                <label className="block text-sm mb-2">Role Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                  placeholder="Describe the responsibilities and purpose of this role"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Scope</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Tenant-wide (All outlets)</option>
                  <option>Outlet-specific</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>POS Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Open POS', 'Create sale', 'Hold / recall sale', 'Process return', 'Apply discount', 'Request manager override'].map((perm) => (
                <div key={perm} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="text-sm text-foreground">{perm}</span>
                  <Switch.Root className="w-11 h-6 bg-switch-background rounded-full">
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['View inventory', 'Adjust stock', 'Receive stock', 'Set low-stock threshold', 'Transfer stock'].map((perm) => (
                <div key={perm} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="text-sm text-foreground">{perm}</span>
                  <Switch.Root className="w-11 h-6 bg-switch-background rounded-full">
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reports Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['View daily sales summary', 'View stock reports', 'Export reports'].map((perm) => (
                <div key={perm} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="text-sm text-foreground">{perm}</span>
                  <Switch.Root className="w-11 h-6 bg-switch-background rounded-full">
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Permission Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">POS Access</span>
                  <span className="text-foreground">0 / 6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Inventory</span>
                  <span className="text-foreground">0 / 5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reports</span>
                  <span className="text-foreground">0 / 3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Note</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Granting sensitive permissions like "Apply discount" or "Adjust stock" should be done carefully and only for trusted staff members.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-border">
        <Link to="/tenant/staff/roles">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button>
          <Save className="w-4 h-4" />
          Save Role
        </Button>
      </div>
    </div>
  );
}
