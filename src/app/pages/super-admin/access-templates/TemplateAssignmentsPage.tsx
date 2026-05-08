import { useMemo, useState } from 'react';
import { Search, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/Input';
import { cn } from '../../../lib/utils';
import { ROLE_PACKS } from './accessTemplatesData';

const selectClass =
  'px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring';

const tenants = [
  { name: 'RetailHub Inc', plan: 'Pro', status: 'Active', businessType: 'Retail Store', rolePackId: 'retail-standard' },
  { name: 'Metro Dine Group', plan: 'Enterprise', status: 'Active', businessType: 'Restaurant', rolePackId: 'restaurant-standard' },
  { name: 'GreenBite Foods', plan: 'Pro', status: 'Active', businessType: 'Grocery / Supermarket', rolePackId: 'grocery-pack' },
  { name: 'Dockside Supply', plan: 'Basic', status: 'Active', businessType: 'Warehouse + Retail', rolePackId: 'warehouse-retail' },
];

export function TemplateAssignmentsPage() {
  const [q, setQ] = useState('');
  const [plan, setPlan] = useState('All');
  const [status, setStatus] = useState('All');
  const [biz, setBiz] = useState('All');

  const rows = useMemo(() => {
    return tenants.filter((t) => {
      const matchQ = !q.trim() || t.name.toLowerCase().includes(q.toLowerCase());
      const matchPlan = plan === 'All' || t.plan === plan;
      const matchStatus = status === 'All' || t.status === status;
      const matchBiz = biz === 'All' || t.businessType === biz;
      return matchQ && matchPlan && matchStatus && matchBiz;
    });
  }, [q, plan, status, biz]);

  const [assignDraft, setAssignDraft] = useState({
    tenant: tenants[0].name,
    rolePackId: 'retail-standard',
    mode: 'replace' as 'newOnly' | 'replace' | 'additional',
  });

  return (
    <div className="max-w-[1600px]">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-foreground mb-2">Template Assignment</h1>
          <p className="text-muted-foreground">
            Assign role packs to tenants. This affects future role creation boundaries — existing staff assignments are not removed.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <ShieldCheck className="w-4 h-4" />
              Assign / Change Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[680px] rounded-3xl">
            <DialogHeader>
              <DialogTitle>Assign Role Pack to Tenant</DialogTitle>
              <DialogDescription>
                Replacing an existing template may affect future role creation. Existing staff assignments should not be removed.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5">Select Tenant</label>
                <select
                  className={selectClass + ' w-full'}
                  value={assignDraft.tenant}
                  onChange={(e) => setAssignDraft((d) => ({ ...d, tenant: e.target.value }))}
                >
                  {tenants.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1.5">Select Role Pack</label>
                <select
                  className={selectClass + ' w-full'}
                  value={assignDraft.rolePackId}
                  onChange={(e) => setAssignDraft((d) => ({ ...d, rolePackId: e.target.value }))}
                >
                  {ROLE_PACKS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1.5">Assignment Mode</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'newOnly', title: 'Apply to new tenant only', desc: 'Stage this template for future provisioning.' },
                    { id: 'replace', title: 'Replace current tenant template', desc: 'Use this boundary going forward.' },
                    { id: 'additional', title: 'Apply as additional custom template', desc: 'Add an optional boundary preset.' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setAssignDraft((d) => ({ ...d, mode: m.id as any }))}
                      className={cn(
                        'text-left rounded-2xl border px-4 py-3 transition-colors bg-white/60',
                        assignDraft.mode === m.id ? 'border-primary/30 bg-primary/5' : 'border-border hover:bg-white/70'
                      )}
                    >
                      <p className="text-sm text-foreground font-medium">{m.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>
                <Sparkles className="w-4 h-4" />
                Assign Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Tenant filters</CardTitle>
          <div className="text-xs text-muted-foreground">{rows.length} tenants</div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tenant…" className="pl-9" />
            </div>
            <select className={selectClass} value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option value="All">Plan: All</option>
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
            <select className={selectClass} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">Status: All</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
            <select className={selectClass} value={biz} onChange={(e) => setBiz(e.target.value)}>
              <option value="All">Business: All</option>
              <option value="Retail Store">Retail Store</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Grocery / Supermarket">Grocery / Supermarket</option>
              <option value="Warehouse + Retail">Warehouse + Retail</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Tenant</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Plan</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Status</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Business type</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Current Role Pack</th>
                  <th className="text-right px-6 py-3 text-sm text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((t) => {
                  const pack = ROLE_PACKS.find((p) => p.id === t.rolePackId);
                  return (
                    <tr key={t.name} className="border-b border-border hover:bg-accent/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{t.name}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{t.plan}</td>
                      <td className="px-6 py-4">
                        <Badge variant="success">{t.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{t.businessType}</td>
                      <td className="px-6 py-4">
                        <div className="rounded-xl border border-border bg-white/60 px-3 py-2">
                          <p className="text-sm text-foreground font-medium">{pack?.name ?? '—'}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {pack?.customRolesAllowed ? 'Custom roles enabled' : 'Custom roles locked'}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button size="sm">
                          <ShieldCheck className="w-4 h-4" />
                          Change
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

