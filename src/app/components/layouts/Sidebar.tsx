import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  KeyRound,
  Activity,
  Headphones,
  FileText,
  Settings,
  LogOut,
  User,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const platformManagement = [
  { path: '/super-admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/super-admin/tenants', label: 'Tenants', icon: Building2 },
  { path: '/super-admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { path: '/super-admin/access-templates', label: 'Access Templates', icon: KeyRound },
];

const system = [
  { path: '/super-admin/platform-health', label: 'Platform Health', icon: Activity },
  { path: '/super-admin/audit-logs', label: 'Audit Logs', icon: FileText },
  { path: '/super-admin/support', label: 'Support', icon: Headphones },
  { path: '/super-admin/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-foreground">Unified Commerce</h1>
        <p className="text-xs text-muted-foreground mt-1">Super Admin Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-4">
        <div className="space-y-1">
          <p className="px-3 text-[11px] uppercase tracking-wide text-muted-foreground mb-2">
            Platform Management
          </p>
          {platformManagement.map((item) => (
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
        </div>

        <div className="space-y-1">
          <p className="px-3 text-[11px] uppercase tracking-wide text-muted-foreground mb-2">
            System
          </p>
          {system.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl border border-border bg-accent/30">
          <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
            SA
          </div>
          <div className="min-w-0">
            <p className="text-sm text-foreground leading-none">Super Admin</p>
            <p className="text-xs text-muted-foreground truncate">platform@unifiedcommerce.io</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <NavLink
            to="/super-admin/settings"
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
