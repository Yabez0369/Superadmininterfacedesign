import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  Boxes,
  BarChart3,
  Settings,
  LogOut,
  User,
  Lock,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const coreMenu = [
  { path: '/tenant-admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/tenant-admin/outlets', label: 'Outlets', icon: Building2 },
  { path: '/tenant-admin/staff', label: 'Staff & Roles', icon: Users },
  { path: '/tenant-admin/roles', label: 'Role Templates', icon: Lock },
  { path: '/tenant-admin/settings', label: 'Settings', icon: Settings },
];

const comingSoon = [
  { label: 'Inventory', icon: Boxes },
  { label: 'Catalog', icon: Package },
  { label: 'Reports', icon: BarChart3 },
];

export function TenantSidebar() {
  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-sidebar-border">
        <div className="space-y-1">
          <p className="text-sm text-foreground leading-none">Retail Hub Inc</p>
          <p className="text-xs text-muted-foreground">Tenant Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {coreMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path.endsWith('/dashboard')}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-l-primary -ml-px pl-[11px]'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="pt-4 mt-4 border-t border-sidebar-border">
          <p className="px-3 text-[11px] uppercase tracking-wide text-muted-foreground mb-2">
            Coming soon
          </p>
          {comingSoon.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground/80 cursor-not-allowed"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              <span className="ml-auto text-[10px] rounded bg-accent px-2 py-0.5">Soon</span>
            </div>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl border border-border bg-accent/30">
          <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
            JD
          </div>
          <div className="min-w-0">
            <p className="text-sm text-foreground leading-none">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">admin@retailhub.com</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <NavLink
            to="/tenant-admin/settings"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground hover:bg-accent/30"
          >
            <User className="h-4 w-4" />
            Profile
          </NavLink>
          <NavLink
            to="/login"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs text-destructive hover:bg-accent/30"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
