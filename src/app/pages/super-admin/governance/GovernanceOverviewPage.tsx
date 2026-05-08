import { Link } from 'react-router';
import { Shield, BookOpenCheck, CloudCog, Activity, HardDriveDownload } from 'lucide-react';
import { PremiumPageHeader } from '../../../components/common/PremiumPageHeader';
import { ModuleNavigationCard } from '../../../components/common/ModuleNavigationCard';
import { Card, CardContent } from '../../../components/ui/Card';

export function GovernanceOverviewPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="Governance"
        title="Maintenance & Governance"
        description="Monitor, update, version, and secure role-permission configurations across all tenants."
      />

      <Card className="relative overflow-hidden border-primary/20 bg-primary/5 mb-6">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Lifecycle</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">Keep access secure as the platform evolves</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
                Monitor & Audit → Feature Updates → Template Versioning & Migration → Backup & Security
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-primary/15 bg-white/60 px-4 py-3 text-sm text-foreground">
              <Shield className="h-4 w-4 text-primary" />
              Governance-ready
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 flex-wrap">
            {[
              { label: 'Monitor & Audit', to: '/super-admin/governance/monitor-audit' },
              { label: 'Feature Updates', to: '/super-admin/governance/feature-updates' },
              { label: 'Template Versioning', to: '/super-admin/governance/template-versioning' },
              { label: 'Backup & Security', to: '/super-admin/governance/backup-security' },
            ].map((x) => (
              <Link
                key={x.label}
                to={x.to}
                className="rounded-full border border-border bg-white/60 hover:bg-white/70 transition-colors px-4 py-2 text-sm text-foreground"
              >
                {x.label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <ModuleNavigationCard
          tone="primary"
          icon={<BookOpenCheck className="h-5 w-5 text-primary" />}
          title="Monitor & Audit"
          description="Track sensitive admin actions, permission changes, and suspicious activity patterns."
          stat="Activity logs · Risk scoring"
          to="/super-admin/governance/monitor-audit"
        />
        <ModuleNavigationCard
          icon={<Activity className="h-5 w-5 text-primary" />}
          title="Update Features & Permissions"
          description="Add new platform features or permission actions and roll them into templates."
          stat="Template impact preview"
          to="/super-admin/governance/feature-updates"
        />
        <ModuleNavigationCard
          icon={<CloudCog className="h-5 w-5 text-primary" />}
          title="Template Versioning & Migration"
          description="Manage versions, view diffs, migrate tenants, and roll back safely."
          stat="Migration status across tenants"
          to="/super-admin/governance/template-versioning"
        />
        <ModuleNavigationCard
          icon={<HardDriveDownload className="h-5 w-5 text-primary" />}
          title="Backup & Security"
          description="See backup status, security checks, and compliance posture."
          stat="Config backups · Compliance checklist"
          to="/super-admin/governance/backup-security"
        />
      </div>
    </div>
  );
}

