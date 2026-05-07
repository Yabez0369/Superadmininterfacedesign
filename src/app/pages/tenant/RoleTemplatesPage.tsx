import { Link } from 'react-router';
import { ArrowLeft, Plus, Check, X } from 'lucide-react';
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

export function RoleTemplatesPage() {
  return (
    <div className="max-w-[1600px]">
      <Link to="/tenant/staff" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Staff
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-foreground mb-2">Role Templates & Permissions</h1>
          <p className="text-muted-foreground">Manage role permissions and access control</p>
        </div>
        <Link to="/tenant/staff/roles/create">
          <Button>
            <Plus className="w-4 h-4" />
            Create Custom Role
          </Button>
        </Link>
      </div>

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
                  <>
                    <tr key={group} className="border-b border-border bg-accent/20">
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
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
