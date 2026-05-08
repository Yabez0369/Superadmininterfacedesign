import { Settings } from 'lucide-react';
import { PremiumPageHeader } from '../../components/common/PremiumPageHeader';
import { EmptyState } from '../../components/common/EmptyState';

export function TenantSettingsPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="System"
        title="Settings"
        description="Tenant workspace preferences and operational defaults."
      />

      <EmptyState
        icon={<Settings className="h-10 w-10 text-primary" />}
        title="Tenant settings is a placeholder"
        description="Next I’ll add tenant-level settings panels (timezone, currency, receipt/WhatsApp defaults) that stay strictly within tenant scope."
        primaryCta={{ label: 'Back to Dashboard', to: '/tenant-admin/dashboard' }}
      />
    </div>
  );
}

