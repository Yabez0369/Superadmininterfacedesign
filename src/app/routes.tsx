import { createBrowserRouter, Navigate } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { TenantsPage } from './pages/TenantsPage';
import { TenantDetailPage } from './pages/TenantDetailPage';
import { CreateTenantPage } from './pages/CreateTenantPage';
import { TenantCreatedPage } from './pages/TenantCreatedPage';
import { SubscriptionsPage } from './pages/SubscriptionsPage';
import { PlatformHealthPage } from './pages/PlatformHealthPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { SupportPage } from './pages/SupportPage';
import { SettingsPage } from './pages/SettingsPage';
import { AppLayout } from './components/layouts/AppLayout';
import { TenantLayout } from './components/layouts/TenantLayout';
import { AccessTemplatesOverviewPage } from './pages/super-admin/access-templates/AccessTemplatesOverviewPage';
import { RolePacksPage } from './pages/super-admin/access-templates/RolePacksPage';
import { RolePackDetailPage } from './pages/super-admin/access-templates/RolePackDetailPage';
import { UserGroupTemplatesPage } from './pages/super-admin/access-templates/UserGroupTemplatesPage';
import { PermissionCatalogPage } from './pages/super-admin/access-templates/PermissionCatalogPage';
import { GenerateRolePackPage } from './pages/super-admin/access-templates/GenerateRolePackPage';
import { TemplateAssignmentsPage } from './pages/super-admin/access-templates/TemplateAssignmentsPage';
import { AccessControlOverviewPage } from './pages/super-admin/access-control/AccessControlOverviewPage';
import { FeatureRegistryPage } from './pages/super-admin/access-control/FeatureRegistryPage';
import { PermissionActionsPage } from './pages/super-admin/access-control/PermissionActionsPage';
import { RoleTemplatesPage as PlatformRoleTemplatesPage } from './pages/super-admin/access-control/RoleTemplatesPage';
import { TemplateManagementPage } from './pages/super-admin/access-control/TemplateManagementPage';
import { GenerateRolePackWizardPage } from './pages/super-admin/access-control/GenerateRolePackWizardPage';
import { TemplateAssignmentsV2Page } from './pages/super-admin/access-control/TemplateAssignmentsV2Page';
import { GovernanceOverviewPage } from './pages/super-admin/governance/GovernanceOverviewPage';
import { MonitorAuditPage } from './pages/super-admin/governance/MonitorAuditPage';
import { TemplateVersioningPage } from './pages/super-admin/governance/TemplateVersioningPage';
import { FeatureUpdatesPage } from './pages/super-admin/governance/FeatureUpdatesPage';
import { BackupSecurityPage } from './pages/super-admin/governance/BackupSecurityPage';
import { TenantDashboardPage } from './pages/tenant/TenantDashboardPage';
import { OutletsPage } from './pages/tenant/OutletsPage';
import { CreateOutletPage } from './pages/tenant/CreateOutletPage';
import { OutletCreatedPage } from './pages/tenant/OutletCreatedPage';
import { OutletDetailPage } from './pages/tenant/OutletDetailPage';
import { StaffRolesPage } from './pages/tenant/StaffRolesPage';
import { RoleTemplatesPage } from './pages/tenant/RoleTemplatesPage';
import { CreateRolePage } from './pages/tenant/CreateRolePage';
import { CreateStaffPage } from './pages/tenant/CreateStaffPage';
import { StaffDetailPage } from './pages/tenant/StaffDetailPage';
import { StaffCreatedPage } from './pages/tenant/StaffCreatedPage';
import { TenantPermissionsPage } from './pages/tenant/TenantPermissionsPage';
import { TenantAccessBoundaryPage } from './pages/tenant/TenantAccessBoundaryPage';
import { TenantRoleAccessInActionPage } from './pages/tenant/TenantRoleAccessInActionPage';
import { TenantSettingsPage } from './pages/tenant/TenantSettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LoginPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/super-admin',
    Component: AppLayout,
    children: [
      { index: true, Component: () => <Navigate to="/super-admin/dashboard" replace /> },
      { path: 'dashboard', Component: DashboardPage },
      { path: 'tenants', Component: TenantsPage },
      { path: 'tenants/create', Component: CreateTenantPage },
      { path: 'tenants/created/:tenantId', Component: TenantCreatedPage },
      { path: 'tenants/:tenantId', Component: TenantDetailPage },
      { path: 'tenants/:tenantId/subscription', Component: SubscriptionsPage },
      { path: 'subscriptions', Component: TenantsPage },
      { path: 'platform-health', Component: PlatformHealthPage },
      { path: 'audit-logs', Component: AuditLogsPage },
      { path: 'support', Component: SupportPage },
      { path: 'settings', Component: SettingsPage },
      { path: 'access-templates', Component: AccessTemplatesOverviewPage },
      { path: 'access-templates/role-packs', Component: RolePacksPage },
      { path: 'access-templates/role-packs/:packId', Component: RolePackDetailPage },
      { path: 'access-templates/user-groups', Component: UserGroupTemplatesPage },
      { path: 'access-templates/permissions', Component: PermissionCatalogPage },
      { path: 'access-templates/generate', Component: GenerateRolePackPage },
      { path: 'access-templates/assignments', Component: TemplateAssignmentsPage },

      // Role & Permission Management Flow (v2 IA)
      { path: 'access-control', Component: AccessControlOverviewPage },
      { path: 'access-control/features', Component: FeatureRegistryPage },
      { path: 'access-control/permission-actions', Component: PermissionActionsPage },
      { path: 'access-control/role-templates', Component: PlatformRoleTemplatesPage },
      { path: 'access-control/template-management', Component: TemplateManagementPage },
      { path: 'access-control/generate-role-pack', Component: GenerateRolePackWizardPage },
      { path: 'access-control/template-assignments', Component: TemplateAssignmentsV2Page },

      { path: 'governance', Component: GovernanceOverviewPage },
      { path: 'governance/monitor-audit', Component: MonitorAuditPage },
      { path: 'governance/template-versioning', Component: TemplateVersioningPage },
      { path: 'governance/feature-updates', Component: FeatureUpdatesPage },
      { path: 'governance/backup-security', Component: BackupSecurityPage },
    ],
  },
  {
    path: '/tenant-admin',
    Component: TenantLayout,
    children: [
      { index: true, Component: () => <Navigate to="/tenant-admin/dashboard" replace /> },
      { path: 'dashboard', Component: TenantDashboardPage },
      { path: 'outlets', Component: OutletsPage },
      { path: 'outlets/create', Component: CreateOutletPage },
      { path: 'outlets/created/:outletId', Component: OutletCreatedPage },
      { path: 'outlets/:outletId', Component: OutletDetailPage },
      { path: 'staff/create', Component: CreateStaffPage },
      { path: 'staff/created/:staffId', Component: StaffCreatedPage },
      { path: 'staff', Component: StaffRolesPage },
      { path: 'staff/:staffId', Component: StaffDetailPage },
      { path: 'roles/create', Component: CreateRolePage },
      { path: 'roles/:roleId/edit', Component: CreateRolePage },
      { path: 'roles', Component: RoleTemplatesPage },
      { path: 'permissions', Component: TenantPermissionsPage },
      { path: 'access-boundary', Component: TenantAccessBoundaryPage },
      { path: 'role-access', Component: TenantRoleAccessInActionPage },
      { path: 'settings', Component: TenantSettingsPage },
    ],
  },
]);
