import { HardDriveDownload } from 'lucide-react';
import { PremiumPageHeader } from '../../../components/common/PremiumPageHeader';
import { EmptyState } from '../../../components/common/EmptyState';

export function BackupSecurityPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="Governance"
        title="Backup & Security"
        description="Backup status, access configuration backups, security checks, and compliance posture."
      />

      <EmptyState
        icon={<HardDriveDownload className="h-10 w-10 text-primary" />}
        title="Backup & security dashboard is next"
        description="Next I’ll add premium status cards (last backup, security checks, compliance checklist) and mock signals for config backup coverage and alerts."
        primaryCta={{ label: 'Back to Governance', to: '/super-admin/governance' }}
      />
    </div>
  );
}

