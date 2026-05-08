import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { cn } from '../../../lib/utils';
import { PERMISSIONS, RiskLevel } from './accessTemplatesData';

const selectClass =
  'px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring';

function riskBadge(risk: RiskLevel) {
  if (risk === 'Low') return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
  if (risk === 'Medium') return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
  if (risk === 'High') return 'bg-rose-500/10 text-rose-700 border-rose-500/20';
  return 'bg-slate-900/5 text-slate-700 border-slate-200';
}

export function PermissionCatalogPage() {
  const [q, setQ] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('All');
  const [riskFilter, setRiskFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const rows = useMemo(() => {
    return PERMISSIONS.filter((p) => {
      const matchQ =
        !q.trim() ||
        p.key.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase());
      const matchModule = moduleFilter === 'All' || p.module === moduleFilter;
      const matchRisk = riskFilter === 'All' || p.risk === riskFilter;
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchQ && matchModule && matchRisk && matchStatus;
    });
  }, [q, moduleFilter, riskFilter, statusFilter]);

  return (
    <div className="max-w-[1600px]">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-foreground mb-2">Permission Catalog</h1>
          <p className="text-muted-foreground">Manage platform-level rights used inside role templates.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Create Permission Right
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Filters</CardTitle>
          <div className="text-xs text-muted-foreground">{rows.length} results</div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search permission key or description…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-9"
              />
            </div>
            <select className={selectClass} value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)}>
              <option value="All">Module: All</option>
              <option value="POS">POS</option>
              <option value="Catalog">Catalog</option>
              <option value="Inventory">Inventory</option>
              <option value="Staff">Staff</option>
              <option value="Reports">Reports</option>
              <option value="Settings">Settings</option>
              <option value="Audit">Audit</option>
            </select>
            <select className={selectClass} value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
              <option value="All">Risk: All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="System">System</option>
            </select>
            <select className={selectClass} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">Status: All</option>
              <option value="Active">Active</option>
              <option value="Deprecated">Deprecated</option>
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
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Permission Key</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Module</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Description</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Risk Level</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Used In Roles</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Status</th>
                  <th className="text-right px-6 py-3 text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.key} className="border-b border-border hover:bg-accent/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm text-foreground font-medium">{p.key}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Access Boundary right</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{p.module}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground max-w-[520px]">{p.description}</td>
                    <td className="px-6 py-4">
                      <span className={cn('text-xs border rounded-full px-2.5 py-1', riskBadge(p.risk))}>{p.risk}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{p.usedInRoles}</td>
                    <td className="px-6 py-4">
                      <Badge variant={p.status === 'Active' ? 'success' : 'secondary'}>{p.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!rows.length && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center">
                      <p className="text-sm text-foreground font-medium">No permission rights found</p>
                      <p className="text-xs text-muted-foreground mt-1">Try clearing filters or searching by module key.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

