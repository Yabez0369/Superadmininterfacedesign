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
    ],
  },
]);
