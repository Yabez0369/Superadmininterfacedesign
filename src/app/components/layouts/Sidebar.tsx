import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  Building2,
  Activity,
  Headphones,
  FileText,
  Settings,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/tenants', label: 'Tenants', icon: Building2 },
  { path: '/platform-health', label: 'Platform Health', icon: Activity },
  { path: '/support', label: 'Support', icon: Headphones },
  { path: '/audit-logs', label: 'Audit Logs', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-foreground">Unified Commerce</h1>
        <p className="text-xs text-muted-foreground mt-1">Super Admin Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
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

      <div className="p-4 m-4 rounded-lg bg-accent/50 border border-border">
        <p className="text-xs text-muted-foreground text-center">
          Secure. Reliable. Platform-grade.
        </p>
      </div>
    </aside>
  );
}
