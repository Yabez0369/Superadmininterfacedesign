import { Link } from 'react-router';
import { Copy, Edit3, Eye, Layers, Plus, ShieldCheck, UsersRound } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { ROLE_PACKS } from './accessTemplatesData';

export function RolePacksPage() {
  return (
    <div className="max-w-[1600px]">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-foreground mb-2">Role Packs</h1>
          <p className="text-muted-foreground">
            Platform-level role boundaries used to generate tenant roles and permission rights.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/super-admin/access-templates/generate">
            <Button>
              <Plus className="w-4 h-4" />
              Generate Role Pack
            </Button>
          </Link>
          <Link to="/super-admin/access-templates/assignments">
            <Button variant="outline">
              <ShieldCheck className="w-4 h-4" />
              Assign to Tenant
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>All role packs</CardTitle>
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Layers className="h-4 w-4" />
            {ROLE_PACKS.length} packs
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Name</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Business type</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Included roles</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Permissions</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Assigned tenants</th>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground">Status</th>
                  <th className="text-right px-6 py-3 text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ROLE_PACKS.map((p) => (
                  <tr key={p.id} className="border-b border-border hover:bg-accent/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link to={`/super-admin/access-templates/role-packs/${p.id}`} className="text-sm text-foreground hover:text-primary font-medium">
                        {p.name}
                      </Link>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant={p.customRolesAllowed ? 'success' : 'secondary'}>
                          {p.customRolesAllowed ? 'Custom roles enabled' : 'Custom roles locked'}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{p.businessType}</td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 text-sm text-foreground">
                        <UsersRound className="h-4 w-4 text-muted-foreground" />
                        {p.roles?.length || 5}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{p.permissionCount}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{p.assignedTenants}</td>
                    <td className="px-6 py-4">
                      <Badge variant={p.status === 'Active' ? 'success' : p.status === 'Draft' ? 'secondary' : 'warning'}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link to={`/super-admin/access-templates/role-packs/${p.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                          Duplicate
                        </Button>
                        <Link to="/super-admin/access-templates/assignments">
                          <Button size="sm">
                            <ShieldCheck className="w-4 h-4" />
                            Assign
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

