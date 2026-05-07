import { createBrowserRouter } from 'react-router';
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
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: 'tenants', Component: TenantsPage },
      { path: 'tenants/:tenantId', Component: TenantDetailPage },
      { path: 'tenants/create', Component: CreateTenantPage },
      { path: 'tenants/created/:tenantId', Component: TenantCreatedPage },
      { path: 'subscriptions/:tenantId', Component: SubscriptionsPage },
      { path: 'platform-health', Component: PlatformHealthPage },
      { path: 'audit-logs', Component: AuditLogsPage },
      { path: 'support', Component: SupportPage },
      { path: 'settings', Component: SettingsPage },
    ],
  },
  {
    path: '/tenant',
    Component: TenantLayout,
    children: [
      { index: true, Component: TenantDashboardPage },
      { path: 'outlets', Component: OutletsPage },
      { path: 'outlets/create', Component: CreateOutletPage },
      { path: 'outlets/created/:outletId', Component: OutletCreatedPage },
      { path: 'outlets/:outletId', Component: OutletDetailPage },
      { path: 'staff', Component: StaffRolesPage },
      { path: 'staff/roles', Component: RoleTemplatesPage },
      { path: 'staff/roles/create', Component: CreateRolePage },
      { path: 'staff/roles/:roleId/edit', Component: CreateRolePage },
      { path: 'staff/create', Component: CreateStaffPage },
      { path: 'staff/:staffId', Component: StaffDetailPage },
      { path: 'staff/created/:staffId', Component: StaffCreatedPage },
    ],
  },
]);
