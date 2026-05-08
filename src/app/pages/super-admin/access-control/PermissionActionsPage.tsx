import { ListChecks } from 'lucide-react';
import { PremiumPageHeader } from '../../../components/common/PremiumPageHeader';
import { EmptyState } from '../../../components/common/EmptyState';

export function PermissionActionsPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="Access Control"
        title="Permission Actions"
        description="Map actions such as create, view, edit, delete, approve, export, print, refund, assign, and configure to platform features."
      />

      <EmptyState
        icon={<ListChecks className="h-10 w-10 text-primary" />}
        title="Permission Actions UI is next"
        description="Next I’ll implement the split layout: left feature list + right action permissions for the selected feature, plus a readable permission-action matrix with risk levels and status badges."
        primaryCta={{ label: 'Back to Access Control', to: '/super-admin/access-control' }}
      />
    </div>
  );
}

