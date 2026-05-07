import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Check, Pencil, Shield, Banknote } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import * as Switch from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';
import { FlowAlertModal } from '../../components/common/FlowAlertModal';

const STEPS = [
  { id: 1, title: 'Details', label: 'Staff Details' },
  { id: 2, title: 'Role', label: 'Select Role' },
  { id: 3, title: 'Outlet', label: 'Assign Outlet' },
  { id: 4, title: 'Access', label: 'Access & Login' },
  { id: 5, title: 'Permissions', label: 'Permission Preview' },
  { id: 6, title: 'Review', label: 'Review Summary' },
  { id: 7, title: 'Confirm', label: 'Confirm' },
] as const;

type StaffRole = 'outlet-manager' | 'cashier' | '';

const OUTLETS = [
  { id: 'o1', name: 'Main Store', code: 'MS-001' },
  { id: 'o2', name: 'Downtown Branch', code: 'DT-002' },
];

const selectClass =
  'w-full rounded-xl border border-border bg-input-background/80 px-3.5 py-2.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30';

const MANAGER_PERMS = [
  'Manage outlet operations and staff assignments',
  'Approve discounts, refunds, and voids per policy',
  'Review shifts and outlet performance metrics',
];

const CASHIER_PERMS = [
  'Access POS and create sales',
  'Accept payments and print receipts',
  'Manage own shift and cash drawer handoff',
  'Request manager approval when limits are exceeded',
];

type StaffCreateLocationState = { presetRole?: StaffRole } | null;

export function CreateStaffPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [dirty, setDirty] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    employeeCode: '',
    jobTitle: '',
    status: 'Pending invite',
    role: '' as StaffRole,
    outletId: '',
    sendInvite: true,
    tempPassword: '',
    requireReset: true,
    pinLogin: false,
    managerPin: '',
    accountActive: true,
    reviewAck: false,
    confirmAck: false,
  });

  const patch = useCallback((partial: Partial<typeof form>) => {
    setDirty(true);
    setForm((f) => ({ ...f, ...partial }));
  }, []);

  /** Apply role preset from Role Templates (`Link` state). No history replace — avoids Strict Mode races clearing state before apply. */
  useEffect(() => {
    const st = location.state as StaffCreateLocationState;
    const pr = st?.presetRole;
    if (!pr || (pr !== 'outlet-manager' && pr !== 'cashier')) return;
    setForm((f) => (f.role === pr ? f : { ...f, role: pr }));
  }, [location.key]);

  const outlet = OUTLETS.find((o) => o.id === form.outletId);

  const validateStep = (s: number): boolean => {
    if (s === 1) {
      if (!form.fullName.trim() || !form.email.trim() || !form.employeeCode.trim()) return false;
      if (form.email.toLowerCase() === 'duplicate@existing.com') {
        setModal('dupEmail');
        return false;
      }
      if (form.employeeCode.toUpperCase() === 'DUP-EMP') {
        setModal('dupCode');
        return false;
      }
    }
    if (s === 2) {
      if (form.role !== 'outlet-manager' && form.role !== 'cashier') {
        setModal('badRole');
        return false;
      }
    }
    if (s === 3) {
      if (!form.outletId) {
        setModal('outletReq');
        return false;
      }
    }
    if (s === 4) {
      if (!form.sendInvite && (!form.tempPassword || form.tempPassword.length < 8)) {
        setModal('weakPwd');
        return false;
      }
      if (form.role === 'outlet-manager' && (!form.managerPin || form.managerPin.length < 4)) {
        setModal('mgrPin');
        return false;
      }
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((x) => Math.min(x + 1, STEPS.length));
  };
  const goBack = () => setStep((x) => Math.max(x - 1, 1));

  const roleLabel = form.role === 'outlet-manager' ? 'Outlet Manager' : form.role === 'cashier' ? 'Cashier' : '—';

  const doCreate = () => {
    setModal(null);
    navigate('/tenant-admin/staff/created/1', {
      state: {
        fullName: form.fullName,
        email: form.email,
        roleLabel,
        outletName: outlet?.name ?? '',
        outletCode: outlet?.code ?? '',
        sendInvite: form.sendInvite,
      },
    });
  };

  const openConfirmCreate = () => {
    if (form.sendInvite) setModal('sendInviteConfirm');
    else setModal('confirmCreate');
  };

  /** Defer so AlertDialog close + onOpenChange(null) runs first; otherwise confirm modal never opens. */
  const afterSendInviteConfirm = () => {
    setTimeout(() => setModal('confirmCreate'), 0);
  };

  return (
    <div className="w-full max-w-none pb-28">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <Link
            to="/tenant-admin/staff"
            onClick={(e) => {
              if (dirty) {
                e.preventDefault();
                setModal('unsaved');
              }
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Staff
          </Link>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Staff & access</p>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Create Staff User</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Add an Outlet Manager or Cashier, assign their primary outlet, and configure login access.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={() => setModal(dirty ? 'unsaved' : 'cancel')}>
          Cancel
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        Step {step} of {STEPS.length}: <span className="text-foreground font-medium">{STEPS[step - 1].label}</span>
      </p>

      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex items-center min-w-[600px] gap-0">
          {STEPS.map((st, index) => (
            <div key={st.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center border-2 text-xs font-medium shrink-0',
                    step > st.id ? 'bg-primary border-primary text-primary-foreground' : step === st.id ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'
                  )}
                >
                  {step > st.id ? <Check className="w-4 h-4" /> : st.id}
                </div>
                <span className={cn('text-[10px] mt-1.5 text-center px-0.5', step >= st.id ? 'text-foreground' : 'text-muted-foreground')}>{st.title}</span>
              </div>
              {index < STEPS.length - 1 && <div className={cn('flex-1 h-0.5 mb-5 mx-0.5', step > st.id ? 'bg-primary' : 'bg-border')} />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Staff Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1.5">Full Name *</label>
                  <Input value={form.fullName} onChange={(e) => patch({ fullName: e.target.value })} placeholder="e.g. Alex Kumar" />
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Email *</label>
                  <Input type="email" value={form.email} onChange={(e) => patch({ email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Phone</label>
                  <Input type="tel" value={form.phone} onChange={(e) => patch({ phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Employee Code *</label>
                  <Input value={form.employeeCode} onChange={(e) => patch({ employeeCode: e.target.value })} placeholder="EMP-1024" />
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Job Title</label>
                  <Input value={form.jobTitle} onChange={(e) => patch({ jobTitle: e.target.value })} placeholder="Optional" />
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Status</label>
                  <select className={selectClass} value={form.status} onChange={(e) => patch({ status: e.target.value })}>
                    <option>Pending invite</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex items-center gap-3 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                  <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-xs">Photo</div>
                  Profile image can be added after the user accepts the invite (demo).
                </div>
                <p className="md:col-span-2 text-xs text-muted-foreground">
                  Demo: email <span className="font-mono">duplicate@existing.com</span> or code <span className="font-mono">DUP-EMP</span> triggers validation.
                </p>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => patch({ role: 'outlet-manager' })}
                className={cn(
                  'text-left p-6 rounded-2xl border-2 transition-all',
                  form.role === 'outlet-manager' ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/40'
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Outlet Manager</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
                  <li>Manage outlet day-to-day operations</li>
                  <li>Approve discounts, refunds, and voids</li>
                  <li>Review shifts and outlet performance</li>
                </ul>
              </button>
              <button
                type="button"
                onClick={() => patch({ role: 'cashier' })}
                className={cn(
                  'text-left p-6 rounded-2xl border-2 transition-all',
                  form.role === 'cashier' ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/40'
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Banknote className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Cashier</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
                  <li>Access POS and create sales</li>
                  <li>Accept payment and print receipts</li>
                  <li>Manage own shift; request manager approval when required</li>
                </ul>
              </button>
            </div>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Assign Outlet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm mb-1.5">Primary outlet *</label>
                  <select className={selectClass} value={form.outletId} onChange={(e) => patch({ outletId: e.target.value })}>
                    <option value="">Search / select outlet…</option>
                    {OUTLETS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.name} ({o.code})
                      </option>
                    ))}
                  </select>
                </div>
                {outlet && (
                  <div className="rounded-xl border border-border p-4 bg-muted/30">
                    <p className="font-medium">{outlet.name}</p>
                    <p className="text-sm text-muted-foreground">Code: {outlet.code}</p>
                    <p className="text-xs text-muted-foreground mt-2">Primary assignment for POS and shift access.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Access & Login Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                  <span className="text-sm">Send invite email</span>
                  <Switch.Root checked={form.sendInvite} onCheckedChange={(c) => patch({ sendInvite: c })} className={cn('w-11 h-6 rounded-full', form.sendInvite ? 'bg-primary' : 'bg-switch-background')}>
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>
                {!form.sendInvite && (
                  <div>
                    <label className="block text-sm mb-1.5">Temporary password</label>
                    <Input type="password" value={form.tempPassword} onChange={(e) => patch({ tempPassword: e.target.value })} placeholder="Min. 8 characters" />
                  </div>
                )}
                <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                  <span className="text-sm">Require password reset on first login</span>
                  <Switch.Root checked={form.requireReset} onCheckedChange={(c) => patch({ requireReset: c })} className={cn('w-11 h-6 rounded-full', form.requireReset ? 'bg-primary' : 'bg-switch-background')}>
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                  <span className="text-sm">Enable PIN login at POS</span>
                  <Switch.Root checked={form.pinLogin} onCheckedChange={(c) => patch({ pinLogin: c })} className={cn('w-11 h-6 rounded-full', form.pinLogin ? 'bg-primary' : 'bg-switch-background')}>
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>
                {form.role === 'outlet-manager' && (
                  <div>
                    <label className="block text-sm mb-1.5">Manager approval PIN *</label>
                    <Input value={form.managerPin} onChange={(e) => patch({ managerPin: e.target.value.replace(/\D/g, '').slice(0, 8) })} placeholder="4–8 digits" />
                    <p className="text-xs text-muted-foreground mt-1">Used for overrides and sensitive POS actions.</p>
                  </div>
                )}
                <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                  <span className="text-sm">Account active</span>
                  <Switch.Root checked={form.accountActive} onCheckedChange={(c) => patch({ accountActive: c })} className={cn('w-11 h-6 rounded-full', form.accountActive ? 'bg-primary' : 'bg-switch-background')}>
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => setModal('invitePreview')}>
                  Preview send invite confirmation
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 5 && (
            <Card>
              <CardHeader>
                <CardTitle>Permission Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Effective access for <strong className="text-foreground">{roleLabel}</strong> at <strong className="text-foreground">{outlet?.name ?? '—'}</strong>.</p>
                <div className={cn('rounded-xl border p-4 border-primary/20 bg-primary/5')}>
                  <ul className="space-y-2 text-sm">
                    {(form.role === 'outlet-manager' ? MANAGER_PERMS : CASHIER_PERMS).map((p) => (
                      <li key={p} className="flex gap-2">
                        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 6 && (
            <div className="space-y-4">
              {[
                { title: 'Staff', s: 1, rows: [['Name', form.fullName], ['Email', form.email], ['Code', form.employeeCode], ['Status', form.status]] },
                { title: 'Role & Outlet', s: 2, rows: [['Role', roleLabel], ['Outlet', outlet ? `${outlet.name} (${outlet.code})` : '—']] },
                {
                  title: 'Access',
                  s: 4,
                  rows: [
                    ['Invite', form.sendInvite ? 'Yes' : 'No'],
                    ['Reset on first login', form.requireReset ? 'Yes' : 'No'],
                    ['PIN login', form.pinLogin ? 'Yes' : 'No'],
                    ...(form.role === 'outlet-manager' ? [['Manager PIN', form.managerPin ? '••••••' : '—']] : []),
                  ],
                },
              ].map((block) => (
                <Card key={block.title}>
                  <CardHeader className="flex flex-row items-center justify-between py-4">
                    <CardTitle className="text-base">{block.title}</CardTitle>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setStep(block.s)}>
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {block.rows.map(([k, v]) => (
                      <div key={k}>
                        <p className="text-muted-foreground">{k}</p>
                        <p className="font-medium">{v}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.reviewAck} onChange={(e) => patch({ reviewAck: e.target.checked })} />
                I confirm staff details and access settings are correct.
              </label>
            </div>
          )}

          {step === 7 && (
            <Card>
              <CardHeader>
                <CardTitle>Confirm staff creation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Create <strong>{roleLabel}</strong> for <strong>{outlet?.name ?? '—'}</strong>? An invite will be sent if enabled.
                </p>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.confirmAck} onChange={(e) => patch({ confirmAck: e.target.checked })} />
                  I authorize creation of this staff account (demo).
                </label>
                <Button type="button" variant="outline" onClick={() => setModal('createAnother')}>
                  Create another after this?
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><span className="text-muted-foreground">Name:</span> {form.fullName || '—'}</p>
              <p><span className="text-muted-foreground">Role:</span> {roleLabel}</p>
              <p><span className="text-muted-foreground">Outlet:</span> {outlet?.name ?? '—'}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-20 border-t border-border bg-background/90 backdrop-blur-md px-8 py-4 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          {step > 1 && <Button type="button" variant="outline" onClick={goBack}>Back</Button>}
          <Button type="button" variant="outline" onClick={() => { setDirty(false); setModal('draftSaved'); }}>
            Save draft
          </Button>
        </div>
        <div className="flex gap-2">
          {step < STEPS.length ? (
            <Button type="button" onClick={goNext} disabled={step === 6 && !form.reviewAck}>
              Next: {STEPS[step].label}
            </Button>
          ) : (
            <Button type="button" disabled={!form.confirmAck} onClick={openConfirmCreate}>
              Create staff user
            </Button>
          )}
        </div>
      </div>

      <FlowAlertModal open={modal === 'cancel'} onOpenChange={(o) => !o && setModal(null)} title="Leave wizard?" description="Unsaved changes will be lost." cancelLabel="Stay" actionLabel="Leave" actionVariant="destructive" onAction={() => navigate('/tenant-admin/staff')} />
      <FlowAlertModal open={modal === 'unsaved'} onOpenChange={(o) => !o && setModal(null)} title="Unsaved changes" description="Discard changes and leave?" cancelLabel="Keep editing" actionLabel="Discard" actionVariant="destructive" onAction={() => navigate('/tenant-admin/staff')} />
      <FlowAlertModal open={modal === 'dupEmail'} onOpenChange={(o) => !o && setModal(null)} title="Duplicate email" description="This email is already in use for another staff user." actionLabel="OK" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'dupCode'} onOpenChange={(o) => !o && setModal(null)} title="Duplicate employee code" description="Employee code must be unique within the tenant." actionLabel="OK" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'badRole'} onOpenChange={(o) => !o && setModal(null)} title="Role required" description="Select Outlet Manager or Cashier to continue." actionLabel="OK" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'outletReq'} onOpenChange={(o) => !o && setModal(null)} title="Outlet required" description="Assign a primary outlet for this staff member." actionLabel="OK" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'mgrPin'} onOpenChange={(o) => !o && setModal(null)} title="Manager PIN required" description="Set a manager approval PIN (at least 4 digits) for Outlet Manager role." actionLabel="OK" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'weakPwd'} onOpenChange={(o) => !o && setModal(null)} title="Weak password" description="Temporary password must be at least 8 characters, or enable send invite." actionLabel="OK" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'invitePreview'} onOpenChange={(o) => !o && setModal(null)} title="Send invite?" description="An email invite will be sent to the staff member’s inbox after the account is created (demo)." cancelLabel="Cancel" actionLabel="Understood" onAction={() => setModal(null)} />
      <FlowAlertModal
        open={modal === 'sendInviteConfirm'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Send invitation email?"
        description={
          <>
            We will email login instructions to <strong className="text-foreground">{form.email || 'this user'}</strong> after the account is provisioned (demo).
          </>
        }
        cancelLabel="Cancel"
        actionLabel="Continue"
        onAction={afterSendInviteConfirm}
      />
      <FlowAlertModal open={modal === 'confirmCreate'} onOpenChange={(o) => !o && setModal(null)} title="Create staff user?" description="This will create the account and apply the selected permissions." cancelLabel="Cancel" actionLabel="Create" onAction={doCreate} />
      <FlowAlertModal open={modal === 'createAnother'} onOpenChange={(o) => !o && setModal(null)} title="Create another staff user?" description="You can finish this user first, then use Create Another Staff User on the success screen—or go to a new wizard now (current draft will be lost in this demo)." cancelLabel="Stay" actionLabel="Start new wizard" actionVariant="destructive" onAction={() => navigate('/tenant-admin/staff/create')} />
      <FlowAlertModal open={modal === 'fail'} onOpenChange={(o) => !o && setModal(null)} title="Creation failed" description="Could not create staff user (demo). Retry." actionLabel="Close" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'draftSaved'} onOpenChange={(o) => !o && setModal(null)} title="Draft saved" description="Progress saved for this demo session." actionLabel="OK" onAction={() => setModal(null)} />
    </div>
  );
}
