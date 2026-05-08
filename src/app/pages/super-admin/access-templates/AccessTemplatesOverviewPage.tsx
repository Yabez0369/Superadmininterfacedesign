import { Link } from 'react-router';
import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { cn } from '../../../lib/utils';
import { ROLE_PACKS } from './accessTemplatesData';

const summary = [
  { label: 'Role Packs', value: '5', icon: Layers },
  { label: 'Permission Rights', value: '148', icon: KeyRound },
  { label: 'User Groups', value: '4', icon: Users },
  { label: 'Assigned Tenants', value: '72', icon: ShieldCheck },
  { label: 'Custom Roles Enabled', value: '3 packs', icon: Sparkles },
];

const recentUsage = [
  { tenant: 'RetailHub Inc', action: 'Assigned Retail POS Standard Pack', when: '2 hours ago' },
  { tenant: 'GreenBite Foods', action: 'Previewed Grocery / Supermarket Pack', when: 'Yesterday' },
  { tenant: 'Metro Dine Group', action: 'Generated Restaurant starter pack', when: '3 days ago' },
];

const healthSignals = [
  { label: 'High-risk rights governed', value: 'Strong', tone: 'good' as const },
  { label: 'Custom role sprawl', value: 'Low', tone: 'good' as const },
  { label: 'Template consistency', value: '92%', tone: 'good' as const },
  { label: 'Deprecated rights usage', value: '2 roles', tone: 'warn' as const },
];

function toneBadge(tone: 'good' | 'warn') {
  return tone === 'good'
    ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
    : 'bg-amber-500/10 text-amber-700 border-amber-500/20';
}

export function AccessTemplatesOverviewPage() {
  const featured = [
    ROLE_PACKS.find((p) => p.id === 'retail-standard')!,
    ROLE_PACKS.find((p) => p.id === 'restaurant-standard')!,
    ROLE_PACKS.find((p) => p.id === 'grocery-pack')!,
    ROLE_PACKS.find((p) => p.id === 'warehouse-retail')!,
  ];

  return (
    <div className="max-w-[1600px]">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-foreground mb-2">Access Templates</h1>
          <p className="text-muted-foreground max-w-3xl">
            Create and manage reusable role packs, permission rights, and user group templates for tenant workspaces.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/super-admin/access-templates/generate">
            <Button>
              <Sparkles className="w-4 h-4" />
              Generate Role Pack
            </Button>
          </Link>
          <Link to="/super-admin/access-templates/user-groups">
            <Button variant="outline">
              <Users className="w-4 h-4" />
              Create Template
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
        {summary.map((s) => (
          <Card key={s.label} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{s.label}</p>
                  <h3 className="text-foreground">{s.value}</h3>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-cyan-400/10 blur-2xl" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Active Role Packs</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Platform-approved access boundaries for common business types.
                </p>
              </div>
              <Link to="/super-admin/access-templates/role-packs">
                <Button variant="outline" size="sm">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((pack) => (
                <Card
                  key={pack.id}
                  className="bg-white/70 border-white/60 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-foreground font-semibold truncate">{pack.name.replace('Standard Pack', 'Role Pack')}</p>
                        <p className="text-xs text-muted-foreground mt-1">{pack.businessType}</p>
                      </div>
                      <Badge variant={pack.status === 'Active' ? 'success' : 'secondary'}>{pack.status}</Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Roles</p>
                        <p className="text-foreground font-medium">{pack.roles?.length || 5}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Permissions</p>
                        <p className="text-foreground font-medium">{pack.permissionCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Tenants using</p>
                        <p className="text-foreground font-medium">{pack.assignedTenants}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 rounded-full border px-2 py-0.5',
                            pack.customRolesAllowed
                              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700'
                              : 'border-slate-200 bg-slate-50 text-slate-600'
                          )}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Custom roles {pack.customRolesAllowed ? 'allowed' : 'locked'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link to={`/super-admin/access-templates/role-packs/${pack.id}`}>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                        </Link>
                        <Link to="/super-admin/access-templates/assignments">
                          <Button size="sm">
                            Assign
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access Control Health</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {healthSignals.map((h) => (
                <div key={h.label} className="flex items-center justify-between rounded-2xl border border-border bg-white/60 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm text-foreground font-medium">{h.label}</p>
                    <p className="text-xs text-muted-foreground">Platform boundary signal</p>
                  </div>
                  <span className={cn('text-xs border rounded-full px-2.5 py-1', toneBadge(h.tone))}>{h.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Template Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentUsage.map((r) => (
                <div key={`${r.tenant}-${r.when}`} className="rounded-2xl border border-border bg-white/60 px-4 py-3">
                  <p className="text-sm text-foreground font-medium">{r.tenant}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.action}</p>
                  <p className="text-[11px] text-muted-foreground mt-2">{r.when}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-dashed border-border bg-white/40 px-4 py-3">
                <p className="text-sm text-foreground font-medium">Tip</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use <strong>Generate Role Pack</strong> to create a clean starting boundary before customizing modules.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/super-admin/access-templates/permissions" className="block">
                <Button variant="outline" className="w-full justify-between">
                  Permission Catalog
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/super-admin/access-templates/user-groups" className="block">
                <Button variant="outline" className="w-full justify-between">
                  User Group Templates
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/super-admin/access-templates/assignments" className="block">
                <Button className="w-full justify-between">
                  Tenant Assignment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/10 to-primary/20 blur-2xl" />
          </Card>
        </div>
      </div>
    </div>
  );
}

