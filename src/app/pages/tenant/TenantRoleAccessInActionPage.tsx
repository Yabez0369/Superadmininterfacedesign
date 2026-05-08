import { Crown, ShieldCheck, Users, ReceiptText, Boxes, Wrench } from 'lucide-react';
import { PremiumPageHeader } from '../../components/common/PremiumPageHeader';
import { Card, CardContent } from '../../components/ui/Card';

const ROLES = [
  {
    title: 'Tenant Admin',
    icon: Crown,
    items: ['Manage outlets', 'Manage users', 'Manage roles (within boundary)', 'View all reports', 'Tenant settings'],
  },
  {
    title: 'Manager',
    icon: ShieldCheck,
    items: ['View outlet reports', 'Manage stock', 'Approve returns', 'Manage staff', 'Limited discounts'],
  },
  {
    title: 'Cashier',
    icon: ReceiptText,
    items: ['Create sales / billing', 'Apply allowed discounts', 'Process payments', 'Print / WhatsApp bill', 'View own sales'],
  },
  {
    title: 'Staff',
    icon: Users,
    items: ['View stock (limited)', 'Assist operations', 'Basic actions', 'Other allowed actions'],
  },
];

export function TenantRoleAccessInActionPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="Operations"
        title="Role Based Access in Action"
        description="See how each role uses the system after permissions are assigned."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {ROLES.map((r) => (
          <Card key={r.title} className="relative overflow-hidden hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-foreground font-semibold">{r.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">Operational permissions (from assigned role)</p>
                </div>
                <div className="h-11 w-11 rounded-2xl border border-border bg-accent flex items-center justify-center">
                  <r.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-foreground">
                {r.items.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <Boxes className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-primary/20 bg-primary/5">
        <CardContent className="p-6 flex items-start gap-3">
          <Wrench className="h-5 w-5 text-primary mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Users can access only what they are allowed to do. Every action is logged.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

