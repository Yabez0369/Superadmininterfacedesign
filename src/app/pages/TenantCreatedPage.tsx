import { Link, useParams } from 'react-router';
import { CheckCircle2, Mail, Building2, Shield, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export function TenantCreatedPage() {
  const { tenantId } = useParams();

  return (
    <div className="max-w-[800px] mx-auto py-12">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-foreground mb-2">Tenant Created Successfully</h1>
        <p className="text-muted-foreground">The tenant account has been created and is ready to use</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Business Name</p>
              <p className="text-foreground">Retail Hub Inc</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tenant ID</p>
              <p className="text-foreground font-mono text-sm">{tenantId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Plan</p>
              <p className="text-foreground">Pro Plan</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Admin Email</p>
              <p className="text-foreground">john@retailhub.com</p>
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
                <h4 className="text-foreground mb-1">Send Invite to Tenant Admin</h4>
                <p className="text-sm text-muted-foreground">
                  The admin will receive an email with login instructions and setup guidance
                </p>
              </div>
              <Button size="sm">Send Invite</Button>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Configure Outlets</h4>
                <p className="text-sm text-muted-foreground">
                  Set up physical or virtual outlets for the tenant's business locations
                </p>
              </div>
              <Link to={`/super-admin/tenants/${tenantId}`}>
                <Button variant="outline" size="sm">Configure</Button>
              </Link>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Manage Feature Access</h4>
                <p className="text-sm text-muted-foreground">
                  Enable or disable modules and features based on subscription plan
                </p>
              </div>
              <Link to={`/super-admin/tenants/${tenantId}/subscription`}>
                <Button variant="outline" size="sm">Manage</Button>
              </Link>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-1">View Tenant Profile</h4>
                <p className="text-sm text-muted-foreground">
                  View complete tenant details, subscription info, and usage metrics
                </p>
              </div>
              <Link to={`/super-admin/tenants/${tenantId}`}>
                <Button variant="outline" size="sm">View Profile</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-4">
        <Link to={`/super-admin/tenants/${tenantId}`}>
          <Button>View Tenant Profile</Button>
        </Link>
        <Link to="/super-admin/tenants/create">
          <Button variant="outline">Create Another Tenant</Button>
        </Link>
      </div>
    </div>
  );
}
