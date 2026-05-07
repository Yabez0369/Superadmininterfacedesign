import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Breadcrumbs } from '../common/Breadcrumbs';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className="ml-64 mt-16 p-8 min-w-0">
        <div className="w-full min-w-0">
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>
    </div>
  );
}
