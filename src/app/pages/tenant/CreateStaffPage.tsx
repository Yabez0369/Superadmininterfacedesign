import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import * as Switch from '@radix-ui/react-switch';

export function CreateStaffPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/tenant-admin/staff/created/1');
  };

  return (
    <div className="max-w-[1200px]">
      <Link to="/tenant-admin/staff" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Staff
      </Link>

      <div className="mb-8">
        <h1 className="text-foreground mb-2">Create Staff User</h1>
        <p className="text-muted-foreground">Add a new staff member and assign outlet role</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Staff Identity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <Input type="email" placeholder="john@retailhub.com" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Phone Number</label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-2">Employee ID</label>
                  <Input placeholder="EMP-001" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Assigned Outlet</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Main Store</option>
                  <option>Downtown Branch</option>
                  <option>Uptown Store</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Role</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Outlet Manager</option>
                  <option>Cashier</option>
                  <option>Stock Keeper</option>
                  <option>Maintenance Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Shift Access</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Full Time</option>
                  <option>Part Time - Morning</option>
                  <option>Part Time - Evening</option>
                  <option>Weekend Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Employment Status</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Permanent</option>
                  <option>Contract</option>
                  <option>Temporary</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Login Method</label>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 border-2 border-primary bg-accent/50 rounded-lg text-sm">
                    Invite by Email
                  </button>
                  <button className="flex-1 px-4 py-3 border border-border rounded-lg text-sm hover:border-primary">
                    Temporary Password
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <span className="text-sm text-foreground">Require password reset on first login</span>
                <Switch.Root defaultChecked className="w-11 h-6 bg-primary rounded-full">
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="text-sm text-foreground">Manager PIN setup</p>
                  <p className="text-xs text-muted-foreground">Required for Outlet Manager role</p>
                </div>
                <Switch.Root className="w-11 h-6 bg-switch-background rounded-full">
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <span className="text-sm text-foreground">Enable 2FA (Two-Factor Authentication)</span>
                <Switch.Root className="w-11 h-6 bg-switch-background rounded-full">
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permission Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Based on the selected role, this staff member will have access to:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span className="text-foreground">POS operations and transactions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span className="text-foreground">View inventory levels</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span className="text-foreground">Process returns and exchanges</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span className="text-foreground">Apply discounts (up to 10%)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Cashier</strong> - Handles POS transactions, customer service, and basic returns. Limited discount authority and requires manager approval for certain operations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Outlet</span>
                  <span className="text-foreground">Main Store</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <span className="text-foreground">Cashier</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shift</span>
                  <span className="text-foreground">Full Time</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Login</span>
                  <span className="text-foreground">Email Invite</span>
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
                Staff members will receive an invitation email with instructions to set up their account. Ensure the email address is correct before proceeding.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-border">
        <Button variant="outline">Save Draft</Button>
        <Button onClick={handleSubmit}>
          <Save className="w-4 h-4" />
          Create Staff User
        </Button>
      </div>
    </div>
  );
}
