import { Link } from 'react-router';
import { ArrowRight, Layers, Users } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { ROLE_PACKS, USER_GROUP_TEMPLATES } from './accessTemplatesData';

export function UserGroupTemplatesPage() {
  return (
    <div className="max-w-[1600px]">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-foreground mb-2">User Group Templates</h1>
          <p className="text-muted-foreground">
            Create reusable staff group structures. These templates map to a role pack boundary for consistent tenant setup.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/super-admin/access-templates/role-packs">
            <Button variant="outline">
              <Layers className="w-4 h-4" />
              View Role Packs
            </Button>
          </Link>
          <Button>
            <Users className="w-4 h-4" />
            Create Group Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {USER_GROUP_TEMPLATES.map((t) => {
          const pack = ROLE_PACKS.find((p) => p.id === t.mappedRolePackId);
          return (
            <Card key={t.id} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>{t.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{t.businessType}</p>
                </div>
                <Badge variant="secondary">{t.groups.length} groups</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-border bg-white/60 p-4">
                  <p className="text-xs text-muted-foreground mb-2">Included groups</p>
                  <div className="flex flex-wrap gap-2">
                    {t.groups.map((g) => (
                      <span key={g} className="inline-flex items-center rounded-full border border-border bg-white/70 px-3 py-1 text-xs text-foreground">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-white/60 p-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Mapped role pack</p>
                    <p className="text-sm text-foreground font-medium mt-1">{pack?.name ?? '—'}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Ensures groups align to the permission boundary for this business type.
                    </p>
                  </div>
                  {pack ? (
                    <Link to={`/super-admin/access-templates/role-packs/${pack.id}`}>
                      <Button variant="outline" size="sm">
                        Preview pack
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  ) : null}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button size="sm">Use template</Button>
                </div>
              </CardContent>

              <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/10 blur-2xl" />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

