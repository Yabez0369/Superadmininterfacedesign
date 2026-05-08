import { Activity } from 'lucide-react';
import { PremiumPageHeader } from '../../../components/common/PremiumPageHeader';
import { EmptyState } from '../../../components/common/EmptyState';

export function FeatureUpdatesPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="Governance"
        title="Update Features & Permissions"
        description="Add new platform features or permission actions and roll out updates to affected templates and tenants."
      />

      <EmptyState
        icon={<Activity className="h-10 w-10 text-primary" />}
        title="Feature update rollout UI is next"
        description="Next I’ll build an “update card” flow with affected templates/tenants previews, rollout status, and assign-to-templates actions using mock data only."
        primaryCta={{ label: 'Back to Governance', to: '/super-admin/governance' }}
      />
    </div>
  );
}

