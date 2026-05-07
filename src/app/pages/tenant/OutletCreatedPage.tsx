import { Link, useParams } from 'react-router';
import { CheckCircle2, Building2, Users, Settings as SettingsIcon, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

export function OutletCreatedPage() {
  const { outletId } = useParams();

  return (
    <div className="w-full max-w-none py-10">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-foreground mb-2">Outlet Created Successfully</h1>
        <p className="text-muted-foreground">The outlet is now ready for operations</p>
      </div>

      <Card className="mb-8 max-w-[980px] mx-auto">
        <CardContent className="p-8">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Outlet Name</p>
              <p className="text-foreground">Main Store</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Outlet Code</p>
              <p className="text-foreground font-mono text-sm">MS-001</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Type</p>
              <p className="text-foreground">Retail Store</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p className="text-foreground">Active</p>
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
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Configure products for outlet</h4>
                <p className="text-sm text-muted-foreground">
                  Add products and set pricing for this outlet
                </p>
              </div>
              <Button size="sm">Configure</Button>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Set opening stock</h4>
                <p className="text-sm text-muted-foreground">
                  Initialize inventory levels for this outlet
                </p>
              </div>
              <Button variant="outline" size="sm">Set Stock</Button>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <SettingsIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Test POS device</h4>
                <p className="text-sm text-muted-foreground">
                  Verify hardware setup and run test transactions
                </p>
              </div>
              <Button variant="outline" size="sm">Test POS</Button>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Invite staff users</h4>
                <p className="text-sm text-muted-foreground">
                  Send invitation emails to assigned staff members
                </p>
              </div>
              <Button variant="outline" size="sm">Send Invites</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-4 max-w-[980px] mx-auto">
        <Link to={`/tenant-admin/outlets/${outletId}`}>
          <Button>View Outlet</Button>
        </Link>
        <Link to="/tenant-admin/outlets/create">
          <Button variant="outline">Create Another Outlet</Button>
        </Link>
      </div>
    </div>
  );
}
