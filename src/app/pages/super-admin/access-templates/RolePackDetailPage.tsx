import { useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { Check, Clock, Layers, Lock, Shield, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { cn } from '../../../lib/utils';
import { getRolePackById, PERMISSIONS } from './accessTemplatesData';

const permissionGroups: Array<{ label: string; modules: Array<'POS' | 'Catalog' | 'Inventory' | 'Staff' | 'Reports' | 'Settings' | 'Audit'> }> = [
  { label: 'POS', modules: ['POS'] },
  { label: 'Catalog', modules: ['Catalog'] },
  { label: 'Inventory', modules: ['Inventory'] },
  { label: 'Staff', modules: ['Staff'] },
  { label: 'Reports', modules: ['Reports'] },
  { label: 'Settings', modules: ['Settings'] },
  { label: 'Audit', modules: ['Audit'] },
];

const assignedTenants = [
  { name: 'RetailHub Inc', plan: 'Pro', status: 'Active', assignedDate: '2026-04-18', customRolesEnabled: true },
  { name: 'Northwind Market', plan: 'Enterprise', status: 'Active', assignedDate: '2026-03-09', customRolesEnabled: true },
  { name: 'Sunrise Stores', plan: 'Pro', status: 'Active', assignedDate: '2026-01-28', customRolesEnabled: false },
];

const history = [
  { at: '2026-04-18', title: 'Permission boundary tightened', desc: 'Restricted catalog price updates to Tenant Admin only.' },
  { at: '2026-03-02', title: 'Added Audit Logs module', desc: 'Introduced audit.logs.view and linked it to managerial roles.' },
  { at: '2026-02-11', title: 'Role pack created', desc: 'Initial baseline roles and rights for retail POS operations.' },
];

function riskTone(risk: 'Low' | 'Medium' | 'High' | 'System') {
  if (risk === 'Low') return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
  if (risk === 'Medium') return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
  if (risk === 'High') return 'bg-rose-500/10 text-rose-700 border-rose-500/20';
  return 'bg-slate-900/5 text-slate-700 border-slate-200';
}

export function RolePackDetailPage() {
  const { packId } = useParams();
  const pack = useMemo(() => getRolePackById(packId), [packId]);
  const roles = pack.roles?.length ? pack.roles : getRolePackById('retail-standard').roles;

  return (
    <div className="max-w-[1600px]">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Role Pack</p>
          <h1 className="text-foreground mb-2">{pack.name}</h1>
          <p className="text-muted-foreground">
            Access boundary template for <span className="text-foreground font-medium">{pack.businessType}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/super-admin/access-templates/assignments">
            <Button>
              <ShieldCheck className="w-4 h-4" />
              Assign to Tenant
            </Button>
          </Link>
          <Button variant="outline">
            <Sparkles className="w-4 h-4" />
            Duplicate
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="tenants">Assigned Tenants</TabsTrigger>
            <TabsTrigger value="history">Change History</TabsTrigger>
          </TabsList>
          <Link to="/super-admin/access-templates/role-packs">
            <Button variant="outline" size="sm">
              <Layers className="w-4 h-4" />
              Back to Role Packs
            </Button>
          </Link>
        </div>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Boundary overview</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {[
                    ['Business type', pack.businessType],
                    ['Roles count', String(roles.length)],
                    ['Permissions count', String(pack.permissionCount)],
                    ['Assigned tenants', String(pack.assignedTenants)],
                    ['Enabled module coverage', pack.enabledModules.join(', ')],
                    ['Custom role setting', pack.customRolesAllowed ? 'Allow tenant custom roles (within boundary)' : 'Lock role editing for tenant admin'],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl border border-border bg-white/60 p-4">
                      <p className="text-muted-foreground text-xs mb-1">{k}</p>
                      <p className="text-foreground font-medium">{v}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enabled modules</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {pack.enabledModules.map((m) => (
                    <span key={m} className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-3 py-1 text-xs text-foreground">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      {m}
                    </span>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle>Custom roles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className={cn('rounded-2xl border p-4', pack.customRolesAllowed ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-slate-200 bg-white/60')}>
                    <p className="text-sm text-foreground font-medium">
                      {pack.customRolesAllowed ? 'Allowed within boundary' : 'Locked by Super Admin'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pack.customRolesAllowed
                        ? 'Tenant Admin can create custom roles but cannot exceed this permission boundary.'
                        : 'Tenant Admin cannot create or edit roles beyond the predefined templates.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-white/60 p-4">
                    <p className="text-xs text-muted-foreground">Policy note</p>
                    <p className="text-sm text-foreground mt-1">
                      Rights marked <span className="font-medium">System</span> are always controlled by platform governance.
                    </p>
                  </div>
                </CardContent>
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/10 blur-2xl" />
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roles">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {roles.map((r) => (
              <Card key={r.id} className="bg-white/70 border-white/60">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle>{r.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Scope: <span className="text-foreground font-medium">{r.scope}</span> · Used by{' '}
                      <span className="text-foreground font-medium">{r.usedByCount}</span>
                    </p>
                  </div>
                  <span className={cn('text-xs border rounded-full px-2.5 py-1', riskTone(r.risk))}>{r.risk} risk</span>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground">{r.purpose}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-border bg-white/60 p-4">
                      <p className="text-xs text-muted-foreground mb-2">Allowed rights</p>
                      <ul className="text-sm space-y-1 text-foreground">
                        {r.allowed.slice(0, 4).map((x) => (
                          <li key={x} className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-emerald-600" />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-border bg-white/60 p-4">
                      <p className="text-xs text-muted-foreground mb-2">Restricted rights</p>
                      <ul className="text-sm space-y-1 text-foreground">
                        {r.restricted.slice(0, 4).map((x) => (
                          <li key={x} className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-slate-500" />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button variant="outline" size="sm">
                      Preview rights
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {permissionGroups.map((g) => {
              const items = PERMISSIONS.filter((p) => g.modules.includes(p.module));
              return (
                <Card key={g.label}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle>{g.label}</CardTitle>
                    <Badge variant="secondary">{items.length} rights</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {items.slice(0, 8).map((p) => (
                      <div key={p.key} className="rounded-2xl border border-border bg-white/60 px-4 py-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm text-foreground font-medium truncate">{p.key}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                          </div>
                          <span className={cn('text-xs border rounded-full px-2.5 py-1 shrink-0', riskTone(p.risk))}>{p.risk}</span>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <Link to="/super-admin/access-templates/permissions">
                        <Button variant="outline" size="sm">
                          View catalog
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="tenants">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Assigned tenants</CardTitle>
              <Link to="/super-admin/access-templates/assignments">
                <Button size="sm">
                  <ShieldCheck className="w-4 h-4" />
                  Manage assignments
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/30">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Tenant Name</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Plan</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Status</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Assigned Date</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Custom Roles Enabled</th>
                      <th className="text-right px-6 py-3 text-sm text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedTenants.map((t) => (
                      <tr key={t.name} className="border-b border-border hover:bg-accent/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground font-medium">{t.name}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{t.plan}</td>
                        <td className="px-6 py-4">
                          <Badge variant="success">{t.status}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{t.assignedDate}</td>
                        <td className="px-6 py-4">
                          <Badge variant={t.customRolesEnabled ? 'success' : 'secondary'}>
                            {t.customRolesEnabled ? 'Enabled' : 'Locked'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="outline" size="sm">
                            View tenant
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Change history</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {history.map((h) => (
                <div key={h.at} className="rounded-2xl border border-border bg-white/60 px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-foreground font-medium">{h.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{h.desc}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                      <Clock className="h-4 w-4" />
                      {h.at}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

