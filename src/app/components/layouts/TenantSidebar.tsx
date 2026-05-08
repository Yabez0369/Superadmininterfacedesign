import { NavLink, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  LogOut,
  User,
  Lock,
  ChevronDown,
  ChevronRight,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';

type NavItem = { path: string; label: string; icon: any; helper?: string };

export function TenantSidebar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState<Record<string, boolean>>({
    outlets: pathname.startsWith('/tenant-admin/outlets'),
    people: pathname.startsWith('/tenant-admin/staff') || pathname.startsWith('/tenant-admin/roles'),
  });

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-sidebar-border">
        <div className="space-y-1">
          <p className="text-sm text-foreground leading-none">Retail Hub Inc</p>
          <p className="text-xs text-muted-foreground">Tenant Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="space-y-1">
          <p className="px-3 text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Workspace</p>
          <NavLink
            to="/tenant-admin/dashboard"
            end
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-l-primary -ml-px pl-[11px]'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className="space-y-1">
          <p className="px-3 text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Operations</p>
          <button
            type="button"
            onClick={() => setOpen((o) => ({ ...o, outlets: !o.outlets }))}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm',
              pathname.startsWith('/tenant-admin/outlets')
                ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-l-primary -ml-px pl-[11px]'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
            )}
            title="Outlet management & setup"
          >
            <Building2 className="w-5 h-5" />
            <span className="flex-1 text-left">Outlets</span>
            {open.outlets ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {open.outlets && (
            <div className="ml-3.5 pl-3 border-l border-sidebar-border space-y-1">
              {([
                { path: '/tenant-admin/outlets', label: 'All Outlets', icon: Building2, helper: 'View all outlets and status' },
                { path: '/tenant-admin/outlets/create', label: 'Create Outlet', icon: Plus, helper: 'Create a new outlet workspace' },
              ] as NavItem[]).map((c) => (
                <NavLink
                  key={c.path}
                  to={c.path}
                  title={c.helper}
                  className={() =>
                    cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm',
                      pathname === c.path
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground/90 hover:bg-sidebar-accent/50'
                    )
                  }
                >
                  <c.icon className="w-4 h-4" />
                  <span>{c.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="px-3 text-[11px] uppercase tracking-wide text-muted-foreground mb-2">People & Access</p>
          <button
            type="button"
            onClick={() => setOpen((o) => ({ ...o, people: !o.people }))}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm',
              pathname.startsWith('/tenant-admin/staff') || pathname.startsWith('/tenant-admin/roles')
                ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-l-primary -ml-px pl-[11px]'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
            )}
            title="Staff users and tenant-level roles"
          >
            <Users className="w-5 h-5" />
            <span className="flex-1 text-left">Staff & Roles</span>
            {open.people ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {open.people && (
            <div className="ml-3.5 pl-3 border-l border-sidebar-border space-y-1">
              {([
                { path: '/tenant-admin/staff', label: 'Staff Users', icon: Users, helper: 'Create and manage actual staff users' },
                { path: '/tenant-admin/staff/create', label: 'Create Staff User', icon: Plus, helper: 'Add manager/cashier/staff users' },
                { path: '/tenant-admin/roles', label: 'Role Templates', icon: Lock, helper: 'Roles within Super Admin boundary' },
                { path: '/tenant-admin/roles/create', label: 'Create Role', icon: ShieldCheck, helper: 'Create custom roles (if allowed)' },
              ] as NavItem[]).map((c) => (
                <NavLink
                  key={c.path}
                  to={c.path}
                  title={c.helper}
                  className={() =>
                    cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm',
                      pathname === c.path
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground/90 hover:bg-sidebar-accent/50'
                    )
                  }
                >
                  <c.icon className="w-4 h-4" />
                  <span>{c.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="px-3 text-[11px] uppercase tracking-wide text-muted-foreground mb-2">System</p>
          <NavLink
            to="/tenant-admin/settings"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-l-primary -ml-px pl-[11px]'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )
            }
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </NavLink>
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
