import { Blocks } from 'lucide-react';
import { PremiumPageHeader } from '../../../components/common/PremiumPageHeader';
import { EmptyState } from '../../../components/common/EmptyState';

export function FeatureRegistryPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="Access Control"
        title="Feature Registry"
        description="Manage master features available for tenant subscriptions and role templates."
      />

      <EmptyState
        icon={<Blocks className="h-10 w-10 text-primary" />}
        title="Feature Registry UI is next"
        description="Next I’ll build grouped feature cards with search, module/status filters, and a premium table/card hybrid with “Used in templates” visibility — using frontend mock data only."
        primaryCta={{ label: 'Back to Access Control', to: '/super-admin/access-control' }}
      />
    </div>
  );
}

