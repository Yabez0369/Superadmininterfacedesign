import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowLeft, Plus, Check, X, UserPlus, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

const roles = ['Outlet Manager', 'Cashier', 'Stock Keeper', 'Maintenance Staff'];

const permissions = {
  'POS Access': [
    'Open POS',
    'Create sale',
    'Hold / recall sale',
    'Process return',
    'Apply discount',
    'Request manager override',
  ],
  'Inventory Access': [
    'View inventory',
    'Adjust stock',
    'Receive stock',
    'Set low-stock threshold',
    'Transfer stock',
  ],
  'Outlet Management': [
    'View outlet dashboard',
    'Edit outlet settings',
    'Manage staff',
    'Configure hardware',
  ],
  'Reports': [
    'View daily sales summary',
    'View stock reports',
    'Export reports',
  ],
  'Hardware / Maintenance': [
    'View hardware status',
    'Configure printer',
    'Configure scanner',
    'Test customer display',
  ],
};

const rolePermissions = {
  'Outlet Manager': {
    'POS Access': [true, true, true, true, true, true],
    'Inventory Access': [true, true, true, true, true],
    'Outlet Management': [true, true, true, true],
    'Reports': [true, true, true],
    'Hardware / Maintenance': [true, true, true, true],
  },
  'Cashier': {
    'POS Access': [true, true, true, true, true, false],
    'Inventory Access': [true, false, false, false, false],
    'Outlet Management': [true, false, false, false],
    'Reports': [true, false, false],
    'Hardware / Maintenance': [true, false, false, false],
  },
  'Stock Keeper': {
    'POS Access': [false, false, false, false, false, false],
    'Inventory Access': [true, true, true, true, true],
    'Outlet Management': [true, false, false, false],
    'Reports': [false, true, false],
    'Hardware / Maintenance': [true, false, false, false],
  },
  'Maintenance Staff': {
    'POS Access': [false, false, false, false, false, false],
    'Inventory Access': [true, false, false, false, false],
    'Outlet Management': [true, false, false, true],
    'Reports': [false, false, false],
    'Hardware / Maintenance': [true, true, true, true],
  },
};

type RolesFlashState = {
  roleSaved?: boolean;
  savedRoleName?: string;
  savedMode?: 'created' | 'updated';
};

export function RoleTemplatesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [saveBanner, setSaveBanner] = useState<{ name: string; mode: 'created' | 'updated' } | null>(null);

  useEffect(() => {
    const s = location.state as RolesFlashState | null;
    if (!s?.roleSaved || !s.savedRoleName) return;
    setSaveBanner({ name: s.savedRoleName, mode: s.savedMode ?? 'created' });
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.key, location.pathname, navigate]);

  return (
    <div className="max-w-[1600px]">
      {saveBanner && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground">
              {saveBanner.mode === 'updated' ? 'Role updated' : 'Custom role saved'}
            </p>
            <p className="text-muted-foreground">
              {saveBanner.mode === 'updated'
                ? `“${saveBanner.name}” was updated (demo).`
                : `“${saveBanner.name}” is ready to assign to staff (demo).`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSaveBanner(null)}
            className="rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-background/80"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <Link to="/tenant-admin/staff" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Staff
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
        <div>
          <h1 className="text-foreground mb-2">Role Templates & Permissions</h1>
          <p className="text-muted-foreground">Manage role permissions and access control</p>
        </div>
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <div className="flex flex-wrap gap-2 justify-end">
            <Link to="/tenant-admin/staff/create">
              <Button>
                <UserPlus className="w-4 h-4" />
                Add Staff User
              </Button>
            </Link>
            <Link to="/tenant-admin/staff/create" state={{ presetRole: 'outlet-manager' as const }}>
              <Button variant="outline" size="sm">
                Add as Outlet Manager
              </Button>
            </Link>
            <Link to="/tenant-admin/staff/create" state={{ presetRole: 'cashier' as const }}>
              <Button variant="outline" size="sm">
                Add as Cashier
              </Button>
            </Link>
          </div>
          <Link to="/tenant-admin/roles/create">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4" />
              Create Custom Role
            </Button>
          </Link>
        </div>
      </div>

      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="py-4 px-6 text-sm text-muted-foreground">
          Use <strong className="text-foreground">Add Staff User</strong> to open the staff wizard, or{' '}
          <strong className="text-foreground">Add as Outlet Manager</strong> /{' '}
          <strong className="text-foreground">Add as Cashier</strong> to start with that role pre-selected (this sprint).
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left px-6 py-3 text-sm text-muted-foreground sticky left-0 bg-muted/30">
                    Permission Group
                  </th>
                  {roles.map((role) => (
                    <th key={role} className="text-center px-6 py-3 text-sm text-muted-foreground">
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(permissions).map(([group, perms]) => (
                  <Fragment key={group}>
                    <tr className="border-b border-border bg-accent/20">
                      <td className="px-6 py-3 text-sm font-medium text-foreground sticky left-0 bg-accent/20" colSpan={5}>
                        {group}
                      </td>
                    </tr>
                    {perms.map((perm, idx) => (
                      <tr key={perm} className="border-b border-border hover:bg-accent/30">
                        <td className="px-6 py-3 text-sm text-foreground sticky left-0 bg-card">
                          {perm}
                        </td>
                        {roles.map((role) => {
                          const hasPermission = rolePermissions[role][group][idx];
                          return (
                            <td key={role} className="px-6 py-3 text-center">
                              {hasPermission ? (
                                <Check className="w-5 h-5 text-success mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
