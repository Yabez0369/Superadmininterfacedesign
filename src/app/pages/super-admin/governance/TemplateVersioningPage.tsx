import { CloudCog } from 'lucide-react';
import { PremiumPageHeader } from '../../../components/common/PremiumPageHeader';
import { EmptyState } from '../../../components/common/EmptyState';

export function TemplateVersioningPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="Governance"
        title="Template Versioning & Migration"
        description="Manage template versions, review diffs, migrate tenants, and roll back safely."
      />

      <EmptyState
        icon={<CloudCog className="h-10 w-10 text-primary" />}
        title="Versioning dashboard is next"
        description="Next I’ll implement the version table (current vs latest), diff viewer, migration status, rollback actions, and mock tenant impact summaries."
        primaryCta={{ label: 'Back to Governance', to: '/super-admin/governance' }}
      />
    </div>
  );
}

