import { Layers } from 'lucide-react';
import { PremiumPageHeader } from '../../../components/common/PremiumPageHeader';
import { EmptyState } from '../../../components/common/EmptyState';

export function RoleTemplatesPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="Access Control"
        title="Role Templates"
        description="Create reusable role blueprints used during tenant onboarding."
      />

      <EmptyState
        icon={<Layers className="h-10 w-10 text-primary" />}
        title="Role Template cards are next"
        description="Next I’ll build premium role template cards (Superadmin/Admin/Manager/Cashier/Staff) with scope, access level, permission counts, risk badges, and permission preview chips."
        primaryCta={{ label: 'Back to Access Control', to: '/super-admin/access-control' }}
      />
    </div>
  );
}

