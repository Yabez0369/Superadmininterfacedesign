import { Link } from 'react-router';
import { Lock, ShieldCheck } from 'lucide-react';
import { PremiumPageHeader } from '../../components/common/PremiumPageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function TenantPermissionsPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="People & Access"
        title="Role & Permission View"
        description="View roles and their permissions within the platform-defined boundary."
        actions={
          <Link to="/tenant-admin/roles">
            <Button variant="outline" className="gap-2">
              <ShieldCheck className="h-4 w-4" />
              Manage Roles
            </Button>
          </Link>
        }
      />

      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="p-6 flex items-start justify-between gap-6 flex-wrap">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">Active access template</p>
            <p className="text-sm text-muted-foreground mt-1">
              Retail POS Default Set · Version 1.4 · Last updated by Platform Admin 3 days ago
            </p>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <Badge variant="success">Customization allowed</Badge>
              <Badge variant="secondary">Locked sensitive permissions</Badge>
              <Badge variant="secondary">WhatsApp Bill enabled</Badge>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white/60 px-4 py-3 text-sm text-foreground">
            <Lock className="h-4 w-4 text-primary" />
            Platform boundary enforced
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-10 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl border border-border bg-accent flex items-center justify-center mb-4">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-foreground mb-2">Permission matrix UI is next</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Next I’ll build the Role Overview + Permission Matrix + Locked Permissions + Change History tabs, with a readable “Full / Partial / No Access / Locked” matrix grouped by module.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/tenant-admin/access-boundary">
              <Button variant="outline">View Access Boundary</Button>
            </Link>
            <Link to="/tenant-admin/role-access">
              <Button>Role Based Access in Action</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

