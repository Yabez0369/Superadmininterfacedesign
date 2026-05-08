import { NavLink, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  KeyRound,
  Activity,
  FileText,
  Settings,
  LogOut,
  User,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Layers,
  UsersRound,
  Sparkles,
  ListChecks,
  Workflow,
  DatabaseZap,
  Blocks,
  Shield,
  BookOpenCheck,
  CloudCog,
  HardDriveDownload,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useMemo, useState } from 'react';

type NavItem = { path: string; label: string; icon: any; helper?: string };
type NavGroup =
  | { id: string; label: string; items: NavItem[]; collapsible?: false }
  | { id: string; label: string; collapsible: true; items: (NavItem & { children?: NavItem[] })[] };

const GROUPS: NavGroup[] = [
  {
    id: 'platform',
    label: 'Platform',
    items: [
      { path: '/super-admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, helper: 'Platform overview and shortcuts' },
      { path: '/super-admin/tenants', label: 'Tenants', icon: Building2, helper: 'Create and manage tenant workspaces' },
      { path: '/super-admin/subscriptions', label: 'Subscriptions', icon: CreditCard, helper: 'Plans, limits, and billing' },
    ],
  },
  {
    id: 'access',
    label: 'Access System',
    collapsible: true,
    items: [
      {
        path: '/super-admin/access-control',
        label: 'Access Control',
        icon: Workflow,
        helper: 'Master features, permissions, templates',
        children: [
          { path: '/super-admin/access-control', label: 'Overview', icon: KeyRound },
          { path: '/super-admin/access-control/features', label: 'Feature Registry', icon: Blocks },
          { path: '/super-admin/access-control/permission-actions', label: 'Permission Actions', icon: ListChecks },
          { path: '/super-admin/access-control/role-templates', label: 'Role Templates', icon: Layers },
          { path: '/super-admin/access-control/template-management', label: 'Template Management', icon: DatabaseZap },
          { path: '/super-admin/access-control/generate-role-pack', label: 'Generate Role Pack', icon: Sparkles },
          { path: '/super-admin/access-control/template-assignments', label: 'Template Assignments', icon: ShieldCheck },
        ],
      },
    ],
  },
  {
    id: 'governance',
    label: 'Governance',
    collapsible: true,
    items: [
      {
        path: '/super-admin/governance',
        label: 'Governance',
        icon: Shield,
        helper: 'Audit, versioning, backups, rollout',
        children: [
          { path: '/super-admin/governance', label: 'Overview', icon: BookOpenCheck },
          { path: '/super-admin/governance/monitor-audit', label: 'Monitor & Audit', icon: FileText },
          { path: '/super-admin/governance/template-versioning', label: 'Template Versioning', icon: CloudCog },
          { path: '/super-admin/governance/feature-updates', label: 'Feature Updates', icon: Activity },
          { path: '/super-admin/governance/backup-security', label: 'Backup & Security', icon: HardDriveDownload },
        ],
      },
    ],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { path: '/super-admin/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const defaultAccessOpen =
    pathname.startsWith('/super-admin/access-control') || pathname.startsWith('/super-admin/access-templates');
  const defaultGovOpen = pathname.startsWith('/super-admin/governance');
  const [open, setOpen] = useState<Record<string, boolean>>({
    access: defaultAccessOpen,
    governance: defaultGovOpen,
  });

  const activeChildPath = useMemo(() => {
    const supportedParents = ['/super-admin/access-control', '/super-admin/access-templates', '/super-admin/governance'];
    if (!supportedParents.some((p) => pathname.startsWith(p))) return null;
    const exact = GROUPS.flatMap((g) =>
      (g as any).items?.flatMap((i: any) => (i.children ? i.children : [i]))
    ).find((x: NavItem) => x.path === pathname);
    if (exact?.path) return exact.path;
    if (pathname.startsWith('/super-admin/governance')) return '/super-admin/governance';
    if (pathname.startsWith('/super-admin/access-control')) return '/super-admin/access-control';
    return '/super-admin/access-templates';
  }, [pathname]);

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-foreground">Unified Commerce</h1>
        <p className="text-xs text-muted-foreground mt-1">Super Admin Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        {GROUPS.map((group) => (
          <div key={group.id} className="space-y-1">
            <p className="px-3 text-[11px] uppercase tracking-wide text-muted-foreground mb-2">
              {group.label}
            </p>

            {(group as any).items.map((item: any) => {
              const hasChildren = !!item.children?.length;
              const parentActive = pathname === item.path || (hasChildren && pathname.startsWith(item.path));
              const isOpen = open[group.id] ?? false;

              if (!hasChildren) {
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path.endsWith('/dashboard')}
                    title={item.helper}
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
                );
              }

              return (
                <div key={item.path} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setOpen((o) => ({ ...o, [group.id]: !isOpen }))}
                    title={item.helper}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm',
                      parentActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-l-primary -ml-px pl-[11px]'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  {isOpen && (
                    <div className="ml-3.5 pl-3 border-l border-sidebar-border space-y-1">
                      {item.children.map((c: NavItem) => {
                        const childActive = activeChildPath === c.path;
                        return (
                          <NavLink
                            key={c.path}
                            to={c.path}
                            title={c.helper}
                            className={() =>
                              cn(
                                'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm',
                                childActive
                                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                  : 'text-sidebar-foreground/90 hover:bg-sidebar-accent/50'
                              )
                            }
                          >
                            <c.icon className="w-4 h-4" />
                            <span>{c.label}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
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
