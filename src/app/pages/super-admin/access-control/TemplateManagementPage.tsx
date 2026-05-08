import { Link } from 'react-router';
import { Layers } from 'lucide-react';
import { PremiumPageHeader } from '../../../components/common/PremiumPageHeader';
import { Button } from '../../../components/ui/Button';
import { AccessTemplatesOverviewPage } from '../access-templates/AccessTemplatesOverviewPage';

export function TemplateManagementPage() {
  return (
    <div className="max-w-[1600px]">
      <PremiumPageHeader
        eyebrow="Access Control"
        title="Template Management"
        description="Manage reusable access template sets for tenant provisioning (create, clone, version, set default)."
        actions={
          <Link to="/super-admin/access-control/generate-role-pack">
            <Button className="gap-2">
              <Layers className="h-4 w-4" />
              Create / Generate Template Set
            </Button>
          </Link>
        }
      />

      <AccessTemplatesOverviewPage />
    </div>
  );
}

