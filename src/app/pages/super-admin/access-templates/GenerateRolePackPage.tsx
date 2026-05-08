import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Check, ChevronRight, Lock, Sparkles } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { cn } from '../../../lib/utils';
import { ROLE_PACKS } from './accessTemplatesData';

const STEPS = [
  { id: 1, title: 'Business Type' },
  { id: 2, title: 'Enabled Modules' },
  { id: 3, title: 'Generated Roles' },
  { id: 4, title: 'Permission Review' },
  { id: 5, title: 'Save Template' },
] as const;

type BusinessType = 'Retail Store' | 'Restaurant' | 'Grocery / Supermarket' | 'Warehouse + Retail' | 'Custom';

const businessCards: Array<{ type: BusinessType; desc: string }> = [
  { type: 'Retail Store', desc: 'General retail POS, returns, inventory, and outlet ops.' },
  { type: 'Restaurant', desc: 'Fast-paced checkout with shift + cash controls.' },
  { type: 'Grocery / Supermarket', desc: 'High volume sales with promos and stock governance.' },
  { type: 'Warehouse + Retail', desc: 'Inventory-first operations with warehouse controls.' },
  { type: 'Custom', desc: 'Start minimal and add modules to define a boundary.' },
];

const moduleGroups = [
  { title: 'Core Commerce', items: ['POS Checkout', 'Product Catalog', 'Inventory', 'Customer Management'] },
  { title: 'Operations', items: ['Outlet Management', 'Staff Management', 'Shift Management', 'Cash Drawer'] },
  { title: 'Growth', items: ['Promotions', 'Loyalty', 'E-Commerce', 'Online Orders'] },
  { title: 'Insights', items: ['Reports', 'Audit Logs', 'Sales Analytics'] },
];

const generatedRoles = [
  { name: 'Tenant Admin', scope: 'Tenant', purpose: 'Tenant configuration, outlets, staff access boundaries.' },
  { name: 'Outlet Manager', scope: 'Outlet', purpose: 'Outlet operations, shifts, and controlled cash workflows.' },
  { name: 'Cashier', scope: 'Outlet', purpose: 'Checkout workflows, customer handling, and receipts.' },
  { name: 'Stock Keeper', scope: 'Outlet', purpose: 'Stock receiving, transfers, and adjustments under governance.' },
  { name: 'Maintenance Staff', scope: 'Personal', purpose: 'Restricted support access to devices and outlet status.' },
];

const permissionMatrixRows = [
  { label: 'POS Sales', values: ['full', 'full', 'full', 'none', 'none'] as const },
  { label: 'Refund Approval', values: ['full', 'limited', 'none', 'none', 'none'] as const },
  { label: 'Discount Apply', values: ['full', 'limited', 'limited', 'none', 'none'] as const },
  { label: 'Product View', values: ['full', 'full', 'limited', 'full', 'none'] as const },
  { label: 'Product Edit', values: ['full', 'limited', 'none', 'limited', 'none'] as const },
  { label: 'Stock Adjustment', values: ['full', 'limited', 'none', 'full', 'none'] as const },
  { label: 'Staff Management', values: ['full', 'limited', 'none', 'none', 'none'] as const },
  { label: 'Reports', values: ['full', 'limited', 'none', 'limited', 'none'] as const },
  { label: 'Settings', values: ['full', 'none', 'none', 'none', 'none'] as const },
  { label: 'Audit Logs', values: ['full', 'none', 'none', 'none', 'none'] as const },
];

function cell(value: 'full' | 'limited' | 'none') {
  if (value === 'full') {
    return (
      <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700">
        <Check className="h-4 w-4" />
      </span>
    );
  }
  if (value === 'limited') {
    return (
      <span className="inline-flex items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-[11px] text-amber-700">
        Limited
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-slate-200/40 border border-slate-200 text-slate-500">
      <Lock className="h-4 w-4" />
    </span>
  );
}

export function GenerateRolePackPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState<BusinessType>('Retail Store');
  const [enabledModules, setEnabledModules] = useState<string[]>(['POS Checkout', 'Product Catalog', 'Inventory', 'Reports', 'Audit Logs']);
  const [templateName, setTemplateName] = useState('Retail POS Role Pack');
  const [description, setDescription] = useState('Premium baseline boundary for retail operations with clean governance.');
  const [customRolesAllowed, setCustomRolesAllowed] = useState(true);
  const [availableDuringTenantCreation, setAvailableDuringTenantCreation] = useState(true);
  const [autoSuggest, setAutoSuggest] = useState(true);

  const recommendedPack = useMemo(() => {
    const match = ROLE_PACKS.find((p) => p.businessType === businessType && p.status === 'Active');
    return match ?? ROLE_PACKS[0];
  }, [businessType]);

  const toggleModule = (m: string) => {
    setEnabledModules((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  };

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const save = () => {
    const id = `generated-${businessType.toLowerCase().replaceAll(' ', '-')}`;
    navigate(`/super-admin/access-templates/role-packs/${id}`);
  };

  return (
    <div className="max-w-[1600px]">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <h1 className="text-foreground mb-2">Generate Role Pack</h1>
          <p className="text-muted-foreground">
            A guided wizard to create a reusable access boundary template for tenant workspaces.
          </p>
        </div>
        <Badge variant="secondary" className="self-start">
          Step {step} of {STEPS.length}
        </Badge>
      </div>

      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex items-center min-w-[760px] gap-0">
          {STEPS.map((s, index) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center border-2 text-xs font-medium transition-colors shrink-0',
                    step > s.id
                      ? 'bg-primary border-primary text-primary-foreground'
                      : step === s.id
                        ? 'border-primary text-primary bg-primary/10'
                        : 'border-border text-muted-foreground'
                  )}
                >
                  {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span
                  className={cn(
                    'text-[10px] sm:text-xs mt-1.5 text-center px-0.5 leading-tight',
                    step >= s.id ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {s.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={cn('flex-1 h-0.5 mb-5 mx-0.5', step > s.id ? 'bg-primary' : 'bg-border')} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Business Type</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessCards.map((b) => (
                  <button
                    key={b.type}
                    type="button"
                    onClick={() => {
                      setBusinessType(b.type);
                      setTemplateName(`${b.type.replace('Grocery / Supermarket', 'Grocery')} Role Pack`);
                    }}
                    className={cn(
                      'text-left p-5 rounded-3xl border-2 transition-all relative bg-white/60 hover:bg-white/70',
                      businessType === b.type ? 'border-primary shadow-[0_18px_45px_rgba(79,70,229,0.14)]' : 'border-border'
                    )}
                  >
                    <p className="text-foreground font-semibold">{b.type}</p>
                    <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
                    {businessType === b.type && (
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1 text-xs text-primary">
                        <Check className="h-4 w-4" />
                        Selected
                      </span>
                    )}
                  </button>
                ))}
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Enabled Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {moduleGroups.map((g) => (
                  <div key={g.title} className="rounded-3xl border border-border bg-white/60 p-5">
                    <p className="text-sm text-foreground font-medium mb-3">{g.title}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {g.items.map((m) => {
                        const on = enabledModules.includes(m);
                        return (
                          <button
                            key={m}
                            type="button"
                            onClick={() => toggleModule(m)}
                            className={cn(
                              'flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors',
                              on ? 'border-primary/30 bg-primary/5' : 'border-border bg-white/70 hover:bg-white'
                            )}
                          >
                            <span className="text-foreground">{m}</span>
                            <span
                              className={cn(
                                'h-6 w-6 rounded-full flex items-center justify-center border',
                                on ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border text-muted-foreground'
                              )}
                            >
                              {on ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Generated Roles</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Based on your business type and enabled modules.</p>
                </div>
                <Badge variant="secondary">{generatedRoles.length} roles</Badge>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedRoles.map((r) => (
                  <div key={r.name} className="rounded-3xl border border-border bg-white/60 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-foreground font-semibold">{r.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">Scope: {r.scope}</p>
                      </div>
                      <Button variant="outline" size="sm">Edit Rights</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">{r.purpose}</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-2xl border border-border bg-white/70 p-3">
                        <p className="text-muted-foreground">Default rights</p>
                        <p className="text-foreground font-medium mt-1">Recommended</p>
                      </div>
                      <div className="rounded-2xl border border-border bg-white/70 p-3">
                        <p className="text-muted-foreground">Restricted rights</p>
                        <p className="text-foreground font-medium mt-1">Governed</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Permission Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-3xl border border-border bg-white/60 p-4 overflow-x-auto">
                  <div className="min-w-[860px]">
                    <div className="grid grid-cols-[220px_repeat(5,1fr)] gap-3 px-2 py-2">
                      <div className="text-xs text-muted-foreground">Permission Group</div>
                      {generatedRoles.map((r) => (
                        <div key={r.name} className="text-xs text-muted-foreground text-center">{r.name}</div>
                      ))}
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="space-y-2">
                      {permissionMatrixRows.map((row) => (
                        <div key={row.label} className="grid grid-cols-[220px_repeat(5,1fr)] gap-3 items-center rounded-2xl border border-border bg-white/70 px-4 py-3">
                          <div className="text-sm text-foreground font-medium">{row.label}</div>
                          {row.values.map((v, idx) => (
                            <div key={`${row.label}-${idx}`} className="flex justify-center">
                              {cell(v)}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  This matrix is a premium boundary preview (not a spreadsheet). Roles can be refined later without breaking governance.
                </p>
              </CardContent>
            </Card>
          )}

          {step === 5 && (
            <Card>
              <CardHeader>
                <CardTitle>Save Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1.5">Template Name</label>
                    <Input value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1.5">Description</label>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-white/60 p-5">
                  <p className="text-sm text-foreground font-medium">Custom role setting</p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCustomRolesAllowed(true)}
                      className={cn(
                        'text-left rounded-2xl border px-4 py-3 transition-colors',
                        customRolesAllowed ? 'border-primary/30 bg-primary/5' : 'border-border bg-white/70 hover:bg-white'
                      )}
                    >
                      <p className="text-sm text-foreground font-medium">Allow custom roles (within boundary)</p>
                      <p className="text-xs text-muted-foreground mt-1">Tenant Admin can create roles but cannot exceed this template rights envelope.</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomRolesAllowed(false)}
                      className={cn(
                        'text-left rounded-2xl border px-4 py-3 transition-colors',
                        !customRolesAllowed ? 'border-primary/30 bg-primary/5' : 'border-border bg-white/70 hover:bg-white'
                      )}
                    >
                      <p className="text-sm text-foreground font-medium">Lock role editing</p>
                      <p className="text-xs text-muted-foreground mt-1">Tenant Admin cannot create or edit roles beyond the predefined set.</p>
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-white/60 p-5">
                  <p className="text-sm text-foreground font-medium">Default assignment</p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAvailableDuringTenantCreation((v) => !v)}
                      className={cn(
                        'text-left rounded-2xl border px-4 py-3 transition-colors',
                        availableDuringTenantCreation ? 'border-primary/30 bg-primary/5' : 'border-border bg-white/70 hover:bg-white'
                      )}
                    >
                      <p className="text-sm text-foreground font-medium">Make available during tenant creation</p>
                      <p className="text-xs text-muted-foreground mt-1">Expose this pack in the Create Tenant flow.</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAutoSuggest((v) => !v)}
                      className={cn(
                        'text-left rounded-2xl border px-4 py-3 transition-colors',
                        autoSuggest ? 'border-primary/30 bg-primary/5' : 'border-border bg-white/70 hover:bg-white'
                      )}
                    >
                      <p className="text-sm text-foreground font-medium">Auto-suggest for business type</p>
                      <p className="text-xs text-muted-foreground mt-1">Recommend this pack when business type matches.</p>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle>Recommended baseline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-2xl border border-border bg-white/60 p-4">
                <p className="text-sm text-foreground font-medium">{recommendedPack.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{recommendedPack.businessType}</p>
                <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Roles</p>
                    <p className="text-foreground font-medium">{recommendedPack.roles?.length || 5}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Permissions</p>
                    <p className="text-foreground font-medium">{recommendedPack.permissionCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tenants</p>
                    <p className="text-foreground font-medium">{recommendedPack.assignedTenants}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white/60 p-4">
                <p className="text-xs text-muted-foreground">Enabled modules (preview)</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {enabledModules.slice(0, 8).map((m) => (
                    <span key={m} className="inline-flex items-center rounded-full border border-border bg-white/70 px-3 py-1 text-[11px] text-foreground">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/10 blur-2xl" />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                You’re creating a template-level access boundary. This module does <strong>not</strong> manage individual tenant staff users.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-20 border-t border-border bg-background/90 backdrop-blur-md px-8 py-4 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={goBack}>
              Back
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {step < STEPS.length ? (
            <Button type="button" onClick={goNext}>
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button type="button" onClick={save}>
              <Sparkles className="w-4 h-4" />
              Save Role Pack
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

