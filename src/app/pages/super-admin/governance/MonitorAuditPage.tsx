import { FileText } from 'lucide-react';
import { PremiumPageHeader } from '../../../components/common/PremiumPageHeader';
import { EmptyState } from '../../../components/common/EmptyState';

export function MonitorAuditPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="Governance"
        title="Monitor & Audit"
        description="Activity logs, login logs, permission changes, and suspicious admin actions across tenants."
      />

      <EmptyState
        icon={<FileText className="h-10 w-10 text-primary" />}
        title="Audit views are next"
        description="Next I’ll build premium log tables with risk badges, filters (tenant/actor/risk/status), and “suspicious changes” highlights using mock data."
        primaryCta={{ label: 'Back to Governance', to: '/super-admin/governance' }}
      />
    </div>
  );
}

