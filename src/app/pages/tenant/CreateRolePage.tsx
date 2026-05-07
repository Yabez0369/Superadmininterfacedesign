import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import * as Switch from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';
import { FlowAlertModal } from '../../components/common/FlowAlertModal';

const POS_PERMS = ['Open POS', 'Create sale', 'Hold / recall sale', 'Process return', 'Apply discount', 'Request manager override'] as const;
const INV_PERMS = ['View inventory', 'Adjust stock', 'Receive stock', 'Set low-stock threshold', 'Transfer stock'] as const;
const REP_PERMS = ['View daily sales summary', 'View stock reports', 'Export reports'] as const;

const selectClass =
  'w-full rounded-xl border border-border bg-input-background/80 px-3.5 py-2.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30';

function initPerms<const T extends readonly string[]>(keys: T): Record<T[number], boolean> {
  return Object.fromEntries(keys.map((k) => [k, false])) as Record<T[number], boolean>;
}

function countTrue(m: Record<string, boolean>): number {
  return Object.values(m).filter(Boolean).length;
}

/** Demo seed when editing a known mock id */
function seedForEdit(roleId: string | undefined): {
  name: string;
  description: string;
  scope: 'tenant' | 'outlet';
  pos: Record<(typeof POS_PERMS)[number], boolean>;
  inv: Record<(typeof INV_PERMS)[number], boolean>;
  rep: Record<(typeof REP_PERMS)[number], boolean>;
} | null {
  if (roleId !== 'custom-1') return null;
  return {
    name: 'Floor Supervisor',
    description: 'Supervises floor staff; limited overrides.',
    scope: 'outlet',
    pos: {
      'Open POS': true,
      'Create sale': true,
      'Hold / recall sale': true,
      'Process return': true,
      'Apply discount': false,
      'Request manager override': true,
    },
    inv: {
      'View inventory': true,
      'Adjust stock': false,
      'Receive stock': false,
      'Set low-stock threshold': false,
      'Transfer stock': false,
    },
    rep: {
      'View daily sales summary': true,
      'View stock reports': true,
      'Export reports': false,
    },
  };
}

export function CreateRolePage() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(roleId);

  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');
  const [scope, setScope] = useState<'tenant' | 'outlet'>('tenant');
  const [posPerms, setPosPerms] = useState(() => initPerms(POS_PERMS));
  const [invPerms, setInvPerms] = useState(() => initPerms(INV_PERMS));
  const [repPerms, setRepPerms] = useState(() => initPerms(REP_PERMS));
  const [modal, setModal] = useState<'validation' | 'cancel' | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const seed = seedForEdit(roleId);
    if (!seed) return;
    setRoleName(seed.name);
    setDescription(seed.description);
    setScope(seed.scope);
    setPosPerms(seed.pos);
    setInvPerms(seed.inv);
    setRepPerms(seed.rep);
    setDirty(false);
  }, [roleId]);

  const markDirty = useCallback(() => setDirty(true), []);

  const togglePos = useCallback(
    (key: (typeof POS_PERMS)[number], v: boolean) => {
      markDirty();
      setPosPerms((p) => ({ ...p, [key]: v }));
    },
    [markDirty]
  );
  const toggleInv = useCallback(
    (key: (typeof INV_PERMS)[number], v: boolean) => {
      markDirty();
      setInvPerms((p) => ({ ...p, [key]: v }));
    },
    [markDirty]
  );
  const toggleRep = useCallback(
    (key: (typeof REP_PERMS)[number], v: boolean) => {
      markDirty();
      setRepPerms((p) => ({ ...p, [key]: v }));
    },
    [markDirty]
  );

  const posOn = countTrue(posPerms);
  const invOn = countTrue(invPerms);
  const repOn = countTrue(repPerms);

  const summary = useMemo(
    () => ({
      pos: `${posOn} / ${POS_PERMS.length}`,
      inv: `${invOn} / ${INV_PERMS.length}`,
      rep: `${repOn} / ${REP_PERMS.length}`,
    }),
    [posOn, invOn, repOn]
  );

  const handleSave = () => {
    if (!roleName.trim()) {
      setModal('validation');
      return;
    }
    navigate('/tenant-admin/roles', {
      replace: false,
      state: {
        roleSaved: true,
        savedRoleName: roleName.trim(),
        savedMode: isEdit ? ('updated' as const) : ('created' as const),
      },
    });
  };

  const PermRow = ({
    label,
    checked,
    onCheckedChange,
  }: {
    label: string;
    checked: boolean;
    onCheckedChange: (v: boolean) => void;
  }) => (
    <div className="flex items-center justify-between p-3 rounded-xl border border-border">
      <span className="text-sm text-foreground">{label}</span>
      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn('w-11 h-6 rounded-full shrink-0', checked ? 'bg-primary' : 'bg-switch-background')}
      >
        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
      </Switch.Root>
    </div>
  );

  return (
    <div className="w-full max-w-[1000px] pb-8">
      <Link
        to="/tenant-admin/roles"
        onClick={(e) => {
          if (dirty) {
            e.preventDefault();
            setModal('cancel');
          }
        }}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Role Templates
      </Link>

      <div className="mb-8">
        <h1 className="text-foreground mb-2">{isEdit ? 'Edit Custom Role' : 'Create Custom Role'}</h1>
        <p className="text-muted-foreground">Define a role with custom permissions (demo — no backend).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5">Role Name *</label>
                <Input
                  placeholder="e.g., Senior Cashier"
                  value={roleName}
                  onChange={(e) => {
                    markDirty();
                    setRoleName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Role Description</label>
                <textarea
                  className={cn(
                    'w-full min-h-[88px] rounded-xl border border-border bg-input-background/80 px-3.5 py-2.5 text-sm shadow-sm',
                    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30'
                  )}
                  rows={3}
                  placeholder="Describe the responsibilities and purpose of this role"
                  value={description}
                  onChange={(e) => {
                    markDirty();
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Scope</label>
                <select
                  className={selectClass}
                  value={scope}
                  onChange={(e) => {
                    markDirty();
                    setScope(e.target.value as 'tenant' | 'outlet');
                  }}
                >
                  <option value="tenant">Tenant-wide (All outlets)</option>
                  <option value="outlet">Outlet-specific</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>POS Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {POS_PERMS.map((perm) => (
                <PermRow key={perm} label={perm} checked={posPerms[perm]} onCheckedChange={(v) => togglePos(perm, v)} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {INV_PERMS.map((perm) => (
                <PermRow key={perm} label={perm} checked={invPerms[perm]} onCheckedChange={(v) => toggleInv(perm, v)} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reports Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {REP_PERMS.map((perm) => (
                <PermRow key={perm} label={perm} checked={repPerms[perm]} onCheckedChange={(v) => toggleRep(perm, v)} />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Permission Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">POS Access</span>
                  <span className="text-foreground font-medium">{summary.pos}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Inventory</span>
                  <span className="text-foreground font-medium">{summary.inv}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reports</span>
                  <span className="text-foreground font-medium">{summary.rep}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Note</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Granting sensitive permissions like &quot;Apply discount&quot; or &quot;Adjust stock&quot; should be done carefully and only for trusted staff members.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 mt-8 pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={() => (dirty ? setModal('cancel') : navigate('/tenant-admin/roles'))}
        >
          Cancel
        </Button>
        <Button type="button" onClick={handleSave}>
          <Save className="w-4 h-4" />
          {isEdit ? 'Update Role' : 'Save Role'}
        </Button>
      </div>

      <FlowAlertModal
        open={modal === 'validation'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Role name required"
        description="Enter a role name before saving."
        actionLabel="OK"
        onAction={() => setModal(null)}
      />
      <FlowAlertModal
        open={modal === 'cancel'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Discard changes?"
        description="You have unsaved changes. Leave without saving?"
        cancelLabel="Keep editing"
        actionLabel="Discard"
        actionVariant="destructive"
        onAction={() => navigate('/tenant-admin/roles')}
      />
    </div>
  );
}
