import { Link, useParams, useLocation } from 'react-router';
import { CheckCircle2, Mail, Shield, Users, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

type CreatedStaffState = {
  fullName?: string;
  email?: string;
  roleLabel?: string;
  outletName?: string;
  outletCode?: string;
  sendInvite?: boolean;
};

export function StaffCreatedPage() {
  const { staffId } = useParams();
  const location = useLocation();
  const s = (location.state ?? {}) as CreatedStaffState;

  const displayName = s.fullName?.trim() || 'Sarah Johnson';
  const displayEmail = s.email?.trim() || 'sarah@retailhub.com';
  const displayOutlet = s.outletName?.trim() || 'Main Store';
  const outletSuffix = s.outletCode ? ` (${s.outletCode})` : '';
  const displayRole = s.roleLabel?.trim() || 'Outlet Manager';
  const invitePending = s.sendInvite !== false;

  return (
    <div className="w-full max-w-none py-10">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-foreground mb-2">Staff User Created Successfully</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {invitePending
            ? 'An invitation will be sent if enabled. The staff member can then activate access for outlet operations.'
            : 'The staff member is now ready for outlet operations.'}
        </p>
      </div>

      <Card className="mb-8 max-w-[980px] mx-auto">
        <CardContent className="p-8">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Staff Name</p>
              <p className="text-foreground">{displayName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-foreground">{displayEmail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Assigned Outlet</p>
              <p className="text-foreground">
                {displayOutlet}
                {outletSuffix}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Assigned Role</p>
              <Badge variant="secondary">{displayRole}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Invite Status</p>
              <Badge variant={invitePending ? 'warning' : 'secondary'}>{invitePending ? 'Pending invite' : 'Provisioned'}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 max-w-[980px] mx-auto">
        <CardContent className="p-8">
          <h3 className="text-foreground mb-4">Next Steps</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Send invite email</h4>
                <p className="text-sm text-muted-foreground">
                  The staff member will receive login instructions and account setup guide
                </p>
              </div>
              <Button size="sm">Send Invite</Button>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Configure shift access</h4>
                <p className="text-sm text-muted-foreground">
                  Set working hours and shift preferences for this staff member
                </p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Review permissions</h4>
                <p className="text-sm text-muted-foreground">
                  Verify the assigned role permissions and access levels
                </p>
              </div>
              <Link to={`/tenant-admin/staff/${staffId}`}>
                <Button variant="outline" size="sm">Review</Button>
              </Link>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Add another staff user</h4>
                <p className="text-sm text-muted-foreground">
                  Continue building your team by adding more staff members
                </p>
              </div>
              <Link to="/tenant-admin/staff/create">
                <Button variant="outline" size="sm">Add Staff</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-center gap-3 max-w-[980px] mx-auto">
        <Link to={`/tenant-admin/staff/${staffId}`}>
          <Button>View Staff Profile</Button>
        </Link>
        <Link to="/tenant-admin/staff">
          <Button variant="outline">Go to Staff List</Button>
        </Link>
        <Link to="/tenant-admin/staff/create">
          <Button variant="outline">Create Another Staff User</Button>
        </Link>
      </div>
    </div>
  );
}
