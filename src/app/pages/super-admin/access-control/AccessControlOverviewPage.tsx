import { Link } from 'react-router';
import { ArrowRight, Sparkles, Workflow } from 'lucide-react';
import { PremiumPageHeader } from '../../../components/common/PremiumPageHeader';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { ModuleNavigationCard } from '../../../components/common/ModuleNavigationCard';

export function AccessControlOverviewPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="Access System"
        title="Access Control Command Center"
        description="Define master features, permission actions, reusable role templates, and tenant access boundaries."
        actions={
          <Link to="/super-admin/access-control/generate-role-pack">
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              Generate Role Pack
            </Button>
          </Link>
        }
      />

      <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-slate-950 text-white mb-6">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="min-w-0">
              <p className="text-white/70 text-xs font-medium uppercase tracking-wider">Role & Permission Management Flow</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Platform setup controls tenant onboarding and user access</h2>
              <p className="mt-2 text-sm text-white/70 max-w-3xl">
                Feature Registry → Permission Actions → Role Templates → Template Management → Tenant Provisioning
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Workflow className="h-4 w-4" />
              Platform Master Configuration Ready
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-3 text-sm">
            {[
              { label: 'Feature Registry', to: '/super-admin/access-control/features' },
              { label: 'Permission Actions', to: '/super-admin/access-control/permission-actions' },
              { label: 'Role Templates', to: '/super-admin/access-control/role-templates' },
              { label: 'Template Management', to: '/super-admin/access-control/template-management' },
              { label: 'Template Assignments', to: '/super-admin/access-control/template-assignments' },
            ].map((x) => (
              <Link
                key={x.label}
                to={x.to}
                className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors px-4 py-3 flex items-center justify-between gap-3"
              >
                <span className="truncate">{x.label}</span>
                <ArrowRight className="h-4 w-4 text-white/60 group-hover:text-white" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ModuleNavigationCard
          tone="primary"
          icon={<Workflow className="h-5 w-5 text-primary" />}
          title="Platform Access Setup Progress"
          description="Start from master features, then map permission actions, then build role templates and template sets."
          stat="Flow: Features → Actions → Roles → Templates"
          ctaLabel="Open overview"
          to="/super-admin/access-control"
        />
        <ModuleNavigationCard
          icon={<Workflow className="h-5 w-5 text-primary" />}
          title="Feature Registry"
          description="Define master features available for subscriptions and role templates."
          stat="Billing · Inventory · Reports · User Management"
          to="/super-admin/access-control/features"
        />
        <ModuleNavigationCard
          icon={<Workflow className="h-5 w-5 text-primary" />}
          title="Permission Actions"
          description="Map actions like create, view, edit, approve, export, print, refund to platform features."
          stat="Risk-based governance included"
          to="/super-admin/access-control/permission-actions"
        />
        <ModuleNavigationCard
          icon={<Workflow className="h-5 w-5 text-primary" />}
          title="Role Templates"
          description="Create reusable role blueprints used during tenant onboarding (Admin, Manager, Cashier, Staff)."
          stat="Scoped roles · Permission preview"
          to="/super-admin/access-control/role-templates"
        />
        <ModuleNavigationCard
          icon={<Workflow className="h-5 w-5 text-primary" />}
          title="Template Management"
          description="Create, clone, version, and set default template sets for provisioning."
          stat="Retail / Restaurant / Grocery"
          to="/super-admin/access-control/template-management"
        />
        <ModuleNavigationCard
          icon={<Workflow className="h-5 w-5 text-primary" />}
          title="Governance"
          description="Monitor & audit, version templates, roll out feature updates, manage backups & security."
          stat="Maintenance & governance lifecycle"
          to="/super-admin/governance"
        />
      </div>
    </div>
  );
}

