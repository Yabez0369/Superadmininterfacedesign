import { Outlet } from 'react-router';
import { TenantSidebar } from './TenantSidebar';
import { TenantHeader } from './TenantHeader';

export function TenantLayout() {
  return (
    <div className="min-h-screen bg-background">
      <TenantSidebar />
      <TenantHeader />
      <main className="ml-64 mt-16 p-8">
        <Outlet />
      </main>
    </div>
  );
}
