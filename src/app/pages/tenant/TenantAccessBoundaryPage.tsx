import { LockKeyhole } from 'lucide-react';
import { PremiumPageHeader } from '../../components/common/PremiumPageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function TenantAccessBoundaryPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="People & Access"
        title="Permission Boundary"
        description="Understand what your tenant can customize — and what is locked by the platform."
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">Boundary summary</p>
                <p className="text-sm text-muted-foreground mt-1">
                  You can manage outlets and staff users freely. Role customization is limited to the active template set and enabled subscription features.
                </p>
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <Badge variant="success">Allowed: Add/Remove permissions (within template)</Badge>
                  <Badge variant="secondary">Locked: System & platform sensitive</Badge>
                  <Badge variant="secondary">Restricted: Outside subscription</Badge>
                </div>
              </div>
              <div className="h-12 w-12 rounded-2xl border border-border bg-accent flex items-center justify-center">
                <LockKeyhole className="h-6 w-6 text-primary" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              {[
                { label: 'Platform-defined permissions', value: 'Locked' },
                { label: 'Subscription entitlements', value: 'Enforced' },
                { label: 'Tenant role customization', value: 'Within boundary' },
              ].map((x) => (
                <div key={x.label} className="rounded-2xl border border-border bg-white/60 px-4 py-3">
                  <p className="text-muted-foreground text-xs">{x.label}</p>
                  <p className="text-foreground font-medium mt-1">{x.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-foreground">Why the boundary exists</p>
            <p className="text-sm text-muted-foreground mt-2">
              Platform Admin defines master features and permission actions. Tenant Admin can only customize roles inside the assigned template set—so daily operations remain flexible without breaking platform governance.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

