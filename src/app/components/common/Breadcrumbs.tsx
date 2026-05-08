import { Link, useLocation } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

const LABELS: Record<string, string> = {
  'super-admin': 'Super Admin',
  dashboard: 'Dashboard',
  tenants: 'Tenants',
  create: 'Create',
  created: 'Success',
  subscription: 'Subscription',
  subscriptions: 'Subscriptions',
  'platform-health': 'Platform Health',
  'audit-logs': 'Audit Logs',
  support: 'Support',
  settings: 'Settings',
  'access-templates': 'Access Templates',
  'role-packs': 'Role Packs',
  'user-groups': 'User Group Templates',
  permissions: 'Permission Catalog',
  generate: 'Generate Role Pack',
  assignments: 'Template Assignments',

  'tenant-admin': 'Tenant Admin',
  outlets: 'Outlets',
  staff: 'Staff & Roles',
  roles: 'Role Templates',
};

function labelForSegment(segment: string) {
  return LABELS[segment] ?? segment.replaceAll('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumbs() {
  const { pathname } = useLocation();

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length <= 1) return null;

  // Don’t show on login-like roots
  if (segments[0] === 'login') return null;

  const crumbs = segments.map((seg, idx) => {
    const to = '/' + segments.slice(0, idx + 1).join('/');
    const isLast = idx === segments.length - 1;
    const isIdLike = !LABELS[seg] && /^[a-z0-9-]{6,}$/i.test(seg);
    const label = isIdLike ? seg : seg.length > 22 ? seg.slice(0, 22) + '…' : labelForSegment(seg);
    return { to, isLast, label, isIdLike };
  });

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {crumbs.map((c, idx) => (
          <BreadcrumbItem key={c.to}>
            {c.isLast ? (
              <BreadcrumbPage className={c.isIdLike ? 'font-mono text-xs' : 'font-normal'}>
                {c.label}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={c.to} className={c.isIdLike ? 'font-mono text-xs' : undefined}>
                  {c.label}
                </Link>
              </BreadcrumbLink>
            )}
            {idx < crumbs.length - 1 ? <BreadcrumbSeparator /> : null}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

