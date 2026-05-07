import { Link, useParams } from 'react-router';
import { CheckCircle2, Mail, Shield, Users, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function StaffCreatedPage() {
  const { staffId } = useParams();

  return (
    <div className="max-w-[800px] mx-auto py-12">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-foreground mb-2">Staff User Created Successfully</h1>
        <p className="text-muted-foreground">The staff member is now ready for outlet operations</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Staff Name</p>
              <p className="text-foreground">Sarah Johnson</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-foreground">sarah@retailhub.com</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Assigned Outlet</p>
              <p className="text-foreground">Main Store</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Assigned Role</p>
              <Badge variant="secondary">Outlet Manager</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Invite Status</p>
              <Badge variant="warning">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
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
              <Link to={`/tenant/staff/${staffId}`}>
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
              <Link to="/tenant/staff/create">
                <Button variant="outline" size="sm">Add Staff</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-4">
        <Link to={`/tenant/staff/${staffId}`}>
          <Button>View Staff Profile</Button>
        </Link>
        <Link to="/tenant/staff/create">
          <Button variant="outline">Add Another Staff</Button>
        </Link>
      </div>
    </div>
  );
}
