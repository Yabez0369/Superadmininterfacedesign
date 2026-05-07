import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  Boxes,
  Settings as SettingsIcon,
  Store,
  BarChart3,
  Settings,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const menuItems = [
  { path: '/tenant', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/tenant/outlets', label: 'Outlets', icon: Building2 },
  { path: '/tenant/staff', label: 'Staff & Roles', icon: Users },
  { path: '/tenant/products', label: 'Products', icon: Package },
  { path: '/tenant/inventory', label: 'Inventory', icon: Boxes },
  { path: '/tenant/pos-settings', label: 'POS Settings', icon: SettingsIcon },
  { path: '/tenant/online-store', label: 'Online Store', icon: Store },
  { path: '/tenant/reports', label: 'Reports', icon: BarChart3 },
  { path: '/tenant/settings', label: 'Settings', icon: Settings },
];

export function TenantSidebar() {
  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-foreground">Unified Commerce</h1>
        <p className="text-xs text-muted-foreground mt-1">Tenant Admin Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/tenant'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-l-primary -ml-px pl-[11px]'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
