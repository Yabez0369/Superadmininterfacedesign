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
]);
