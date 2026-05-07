import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Check, Info, Pencil } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import * as Switch from '@radix-ui/react-switch';
import { cn } from '../lib/utils';
import { FlowAlertModal } from '../components/common/FlowAlertModal';

const STEPS = [
  { id: 1, title: 'Business', label: 'Business Details' },
  { id: 2, title: 'Contact', label: 'Contact Details' },
  { id: 3, title: 'Subscription', label: 'Subscription Plan' },
  { id: 4, title: 'Entitlements', label: 'Feature Entitlements' },
  { id: 5, title: 'Admin', label: 'Tenant Admin Account' },
  { id: 6, title: 'Settings', label: 'Tenant Settings' },
  { id: 7, title: 'Review', label: 'Review Summary' },
  { id: 8, title: 'Confirm', label: 'Confirm' },
] as const;

const PLANS = [
  { name: 'Basic', price: '$49/mo', yearly: '$470/yr', features: ['Up to 3 outlets', 'Up to 15 staff', 'Core POS'] },
  { name: 'Pro', price: '$199/mo', yearly: '$1,910/yr', features: ['Up to 10 outlets', 'Up to 50 staff', 'Advanced reporting'], recommended: true },
  { name: 'Enterprise', price: 'Custom', yearly: 'Contact sales', features: ['Unlimited scale', 'Dedicated support', 'Custom SLA'] },
];

const ENTITLEMENTS: {
  id: string;
  name: string;
  description: string;
  requires?: string[];
  disables?: string[];
}[] = [
  { id: 'pos', name: 'POS', description: 'Point of sale terminals and checkout.' },
  { id: 'inventory', name: 'Inventory', description: 'Stock levels, receiving, adjustments.', requires: ['pos'] },
  { id: 'staff', name: 'Staff Management', description: 'Outlet staff, roles, and invites.' },
  { id: 'reports', name: 'Reporting', description: 'Sales, shifts, and operational reports.', requires: ['pos'] },
  { id: 'payments', name: 'Payments', description: 'Card and integrated payment providers.', requires: ['pos'] },
  { id: 'ecommerce', name: 'E-Commerce', description: 'Online catalog sync (add-on).' },
];

const selectClass =
  'w-full rounded-xl border border-border bg-input-background/80 px-3.5 py-2.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30';

export function CreateTenantPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [dirty, setDirty] = useState(false);
  const [modal, setModal] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const [form, setForm] = useState({
    businessName: '',
    legalName: '',
    businessType: '',
    registrationNumber: '',
    taxVat: '',
    country: 'United States',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    businessStatus: 'Active',

    businessEmail: '',
    businessPhone: '',
    primaryContactName: '',
    primaryContactEmail: '',
    primaryContactPhone: '',

    plan: 'Pro',
    maxOutlets: 10,
    maxUsers: 50,
    maxProducts: 5000,

    adminFullName: '',
    adminEmail: '',
    adminPhone: '',
    inviteMethod: 'invite' as 'invite' | 'tempPassword',
    tempPassword: '',
    adminAccountStatus: 'Pending invite',
    tenantAdminRole: 'Tenant Admin',

    currency: 'USD',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    language: 'en-US',

    entitlements: ['pos', 'inventory', 'staff', 'reports', 'payments'] as string[],

    reviewAcknowledge: false,
    confirmAcknowledge: false,
  });

  const patch = useCallback((partial: Partial<typeof form>) => {
    setDirty(true);
    setForm((f) => ({ ...f, ...partial }));
  }, []);

  const toggleEntitlement = (id: string) => {
    setDirty(true);
    const ent = ENTITLEMENTS.find((e) => e.id === id);
    const isOn = form.entitlements.includes(id);
    if (!isOn && ent?.requires?.length) {
      const missing = ent.requires.filter((r) => !form.entitlements.includes(r));
      if (missing.length) {
        setModal('featureDep');
        return;
      }
    }
    if (isOn) {
      const dependents = ENTITLEMENTS.filter((e) => e.requires?.includes(id) && form.entitlements.includes(e.id));
      if (dependents.length) {
        patch({
          entitlements: form.entitlements.filter((x) => x !== id && !dependents.some((d) => d.id === x)),
        });
        return;
      }
    }
    setForm((f) => ({
      ...f,
      entitlements: isOn ? f.entitlements.filter((x) => x !== id) : [...f.entitlements, id],
    }));
  };

  const validateStep = (s: number): boolean => {
    if (s === 1) {
      if (!form.businessName.trim() || !form.legalName.trim()) return false;
      if (form.businessName.trim().toLowerCase() === 'duplicate demo') {
        setModal('dupBiz');
        return false;
      }
      if (form.taxVat && form.taxVat.length < 8) {
        setModal('badTax');
        return false;
      }
    }
    if (s === 2) {
      if (!form.businessEmail.trim() || !form.primaryContactEmail.trim()) return false;
    }
    if (s === 3) {
      const lim =
        form.plan === 'Basic' ? 3 : form.plan === 'Pro' ? 10 : 999;
      if (form.maxOutlets > lim) {
        setModal('planLimit');
        return false;
      }
    }
    if (s === 4) {
      if (form.entitlements.includes('inventory') && !form.entitlements.includes('pos')) {
        setModal('featureDep');
        return false;
      }
    }
    if (s === 5) {
      if (!form.adminFullName.trim() || !form.adminEmail.trim()) return false;
      if (form.adminEmail.toLowerCase() === 'duplicate@existing.com') {
        setModal('dupEmail');
        return false;
      }
      if (form.inviteMethod === 'tempPassword') {
        if (!form.tempPassword || form.tempPassword.length < 8) {
          setModal('weakPassword');
          return false;
        }
      }
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const tryLeave = () => {
    if (dirty) setModal('unsaved');
    else setModal('cancel');
  };

  const provisionTenant = () => {
    setModal('confirmCreate');
  };

  const doProvision = () => {
    setModal(null);
    const ok = Math.random() > 0.05;
    if (!ok) {
      setModal('fail');
      return;
    }
    navigate('/super-admin/tenants/created/retail-hub-inc');
  };

  return (
    <div className="w-full max-w-none pb-28">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <Link
            to="/super-admin/tenants"
            onClick={(e) => {
              if (dirty) {
                e.preventDefault();
                setModal('unsaved');
              }
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tenants
          </Link>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Tenant workspace</p>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Create New Tenant</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Provision a tenant workspace, subscription limits, feature entitlements, and the first Tenant Admin account.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={() => tryLeave()}>
          Cancel
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        Step {step} of {STEPS.length}: <span className="text-foreground font-medium">{STEPS[step - 1].label}</span>
      </p>

      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex items-center min-w-[720px] gap-0">
          {STEPS.map((s, index) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center border-2 text-xs font-medium transition-colors shrink-0',
                    step > s.id
                      ? 'bg-primary border-primary text-primary-foreground'
                      : step === s.id
                        ? 'border-primary text-primary bg-primary/10'
                        : 'border-border text-muted-foreground'
                  )}
                >
                  {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span
                  className={cn(
                    'text-[10px] sm:text-xs mt-1.5 text-center px-0.5 leading-tight',
                    step >= s.id ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {s.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={cn('flex-1 h-0.5 mb-5 mx-0.5', step > s.id ? 'bg-primary' : 'bg-border')} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1.5">Business Name *</label>
                    <Input value={form.businessName} onChange={(e) => patch({ businessName: e.target.value })} placeholder="e.g. Northwind Retail" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Legal Business Name *</label>
                    <Input value={form.legalName} onChange={(e) => patch({ legalName: e.target.value })} placeholder="Registered legal name" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Business Type</label>
                    <select className={selectClass} value={form.businessType} onChange={(e) => patch({ businessType: e.target.value })}>
                      <option value="">Select type</option>
                      <option value="Retail">Retail</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Services">Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Registration Number</label>
                    <Input value={form.registrationNumber} onChange={(e) => patch({ registrationNumber: e.target.value })} placeholder="REG-2026-0001" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Tax / VAT Number</label>
                    <Input value={form.taxVat} onChange={(e) => patch({ taxVat: e.target.value })} placeholder="Minimum 8 characters if provided" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Country</label>
                    <select className={selectClass} value={form.country} onChange={(e) => patch({ country: e.target.value })}>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1.5">Business Address</label>
                    <Input value={form.addressLine1} onChange={(e) => patch({ addressLine1: e.target.value })} placeholder="Street, building" className="mb-2" />
                    <Input value={form.addressLine2} onChange={(e) => patch({ addressLine2: e.target.value })} placeholder="Suite / unit (optional)" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">City</label>
                    <Input value={form.city} onChange={(e) => patch({ city: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">State / Province</label>
                    <Input value={form.state} onChange={(e) => patch({ state: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Postal Code</label>
                    <Input value={form.postalCode} onChange={(e) => patch({ postalCode: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Business Status</label>
                    <select className={selectClass} value={form.businessStatus} onChange={(e) => patch({ businessStatus: e.target.value })}>
                      <option>Active</option>
                      <option>Pending Setup</option>
                      <option>Suspended</option>
                    </select>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground flex gap-2">
                  <Info className="w-4 h-4 shrink-0" />
                  Demo: enter <span className="font-mono">Duplicate Demo</span> as business name to trigger duplicate detection.
                </p>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Organization</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1.5">Business Email *</label>
                      <Input type="email" value={form.businessEmail} onChange={(e) => patch({ businessEmail: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1.5">Business Phone</label>
                      <Input type="tel" value={form.businessPhone} onChange={(e) => patch({ businessPhone: e.target.value })} />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3">Primary contact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm mb-1.5">Primary Contact Name</label>
                      <Input value={form.primaryContactName} onChange={(e) => patch({ primaryContactName: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1.5">Primary Contact Email *</label>
                      <Input type="email" value={form.primaryContactEmail} onChange={(e) => patch({ primaryContactEmail: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1.5">Primary Contact Phone</label>
                      <Input type="tel" value={form.primaryContactPhone} onChange={(e) => patch({ primaryContactPhone: e.target.value })} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex rounded-xl border border-border p-1 bg-muted/30 w-fit">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      className={cn('px-4 py-2 rounded-lg text-sm transition-colors', billingCycle === 'monthly' ? 'bg-background shadow-sm' : '')}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('yearly')}
                      className={cn('px-4 py-2 rounded-lg text-sm transition-colors', billingCycle === 'yearly' ? 'bg-background shadow-sm' : '')}
                    >
                      Yearly
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PLANS.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => patch({ plan: p.name })}
                        className={cn(
                          'text-left p-4 rounded-2xl border-2 transition-all relative',
                          form.plan === p.name ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/40'
                        )}
                      >
                        {p.recommended && (
                          <span className="absolute -top-2.5 left-3 text-[10px] font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                        <p className="font-semibold text-foreground">{p.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">{billingCycle === 'monthly' ? p.price : p.yearly}</p>
                        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                          {p.features.map((f) => (
                            <li key={f}>• {f}</li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm mb-1.5">Max Outlets</label>
                      <Input type="number" value={form.maxOutlets} onChange={(e) => patch({ maxOutlets: Number(e.target.value) })} min={1} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1.5">Max Staff Users</label>
                      <Input type="number" value={form.maxUsers} onChange={(e) => patch({ maxUsers: Number(e.target.value) })} min={1} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1.5">Max Products</label>
                      <Input type="number" value={form.maxProducts} onChange={(e) => patch({ maxProducts: Number(e.target.value) })} min={1} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">* Basic plan allows up to 3 outlets. Exceeding plan caps will trigger a limit warning.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Feature Entitlements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground mb-2">
                  Enable modules for this tenant. Some capabilities depend on POS or other modules — unavailable combinations are blocked with a hint.
                </p>
                {ENTITLEMENTS.map((e) => {
                  const on = form.entitlements.includes(e.id);
                  const locked =
                    !on && e.requires?.some((r) => !form.entitlements.includes(r));
                  return (
                    <div
                      key={e.id}
                      className={cn(
                        'flex items-center justify-between gap-4 p-4 rounded-xl border',
                        on ? 'border-primary/30 bg-primary/5' : 'border-border',
                        locked && 'opacity-60'
                      )}
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{e.name}</p>
                        <p className="text-xs text-muted-foreground">{e.description}</p>
                        {e.requires?.length ? (
                          <p className="text-[11px] text-amber-700/90 mt-1">Requires: {e.requires.join(', ')}</p>
                        ) : null}
                      </div>
                      <Switch.Root
                        checked={on}
                        onCheckedChange={() => toggleEntitlement(e.id)}
                        disabled={locked && !on}
                        className={cn('w-11 h-6 rounded-full shrink-0 transition-colors', on ? 'bg-primary' : 'bg-switch-background')}
                      >
                        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                      </Switch.Root>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {step === 5 && (
            <Card>
              <CardHeader>
                <CardTitle>Tenant Admin Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground">
                  This user becomes the first <strong>Tenant Admin</strong> and can create outlets, managers, cashiers, and staff users for their business.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1.5">Admin Full Name *</label>
                    <Input value={form.adminFullName} onChange={(e) => patch({ adminFullName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Admin Email *</label>
                    <Input type="email" value={form.adminEmail} onChange={(e) => patch({ adminEmail: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Admin Phone</label>
                    <Input type="tel" value={form.adminPhone} onChange={(e) => patch({ adminPhone: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Role</label>
                    <Input disabled value={form.tenantAdminRole} className="bg-muted/50" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Account Status</label>
                    <select className={selectClass} value={form.adminAccountStatus} onChange={(e) => patch({ adminAccountStatus: e.target.value })}>
                      <option>Pending invite</option>
                      <option>Active</option>
                      <option>Suspended</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Access: invite or temporary password</label>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant={form.inviteMethod === 'invite' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => patch({ inviteMethod: 'invite' })}
                    >
                      Send Invite
                    </Button>
                    <Button
                      type="button"
                      variant={form.inviteMethod === 'tempPassword' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => patch({ inviteMethod: 'tempPassword' })}
                    >
                      Temporary Password
                    </Button>
                  </div>
                  {form.inviteMethod === 'tempPassword' && (
                    <div className="mt-3">
                      <label className="block text-sm mb-1.5">Temporary Password</label>
                      <Input type="password" value={form.tempPassword} onChange={(e) => patch({ tempPassword: e.target.value })} placeholder="Min. 8 characters" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Demo: use <span className="font-mono">duplicate@existing.com</span> to trigger duplicate email.
                </p>
              </CardContent>
            </Card>
          )}

          {step === 6 && (
            <Card>
              <CardHeader>
                <CardTitle>Tenant Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1.5">Default Currency</label>
                    <select className={selectClass} value={form.currency} onChange={(e) => patch({ currency: e.target.value })}>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Timezone</label>
                    <select className={selectClass} value={form.timezone} onChange={(e) => patch({ timezone: e.target.value })}>
                      <option value="America/New_York">Eastern (US)</option>
                      <option value="America/Los_Angeles">Pacific (US)</option>
                      <option value="Europe/London">London</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Date Format</label>
                    <select className={selectClass} value={form.dateFormat} onChange={(e) => patch({ dateFormat: e.target.value })}>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Language</label>
                    <select className={selectClass} value={form.language} onChange={(e) => patch({ language: e.target.value })}>
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 7 && (
            <div className="space-y-4">
              {[
                { title: 'Business', s: 1, rows: [
                  ['Business name', form.businessName || '—'],
                  ['Legal name', form.legalName || '—'],
                  ['Tax / VAT', form.taxVat || '—'],
                  ['Status', form.businessStatus],
                ] },
                { title: 'Contact', s: 2, rows: [
                  ['Business email', form.businessEmail || '—'],
                  ['Primary contact', form.primaryContactName || '—'],
                  ['Primary email', form.primaryContactEmail || '—'],
                ] },
                { title: 'Subscription', s: 3, rows: [
                  ['Plan', form.plan],
                  ['Billing', billingCycle],
                  ['Outlets / Users / Products', `${form.maxOutlets} / ${form.maxUsers} / ${form.maxProducts}`],
                ] },
                { title: 'Entitlements', s: 4, rows: [['Enabled', form.entitlements.join(', ') || 'None']] },
                { title: 'Tenant Admin', s: 5, rows: [
                  ['Name', form.adminFullName || '—'],
                  ['Email', form.adminEmail || '—'],
                  ['Access', form.inviteMethod === 'invite' ? 'Email invite' : 'Temporary password'],
                ] },
                { title: 'Settings', s: 6, rows: [
                  ['Currency / TZ', `${form.currency} · ${form.timezone}`],
                  ['Date / Language', `${form.dateFormat} · ${form.language}`],
                ] },
              ].map((block) => (
                <Card key={block.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
                        <p className="text-foreground font-medium">{v}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.reviewAcknowledge}
                  onChange={(e) => patch({ reviewAcknowledge: e.target.checked })}
                />
                I have reviewed all sections and the information is correct.
              </label>
            </div>
          )}

          {step === 8 && (
            <Card>
              <CardHeader>
                <CardTitle>Ready to provision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Creating this tenant workspace will activate subscription entitlements and provision the Tenant Admin account. No operational POS data is created until the tenant completes setup.
                </p>
                <ul className="text-sm space-y-2 list-disc pl-5 text-foreground">
                  <li>Tenant workspace shell and limits</li>
                  <li>Feature entitlements: {form.entitlements.length} modules</li>
                  <li>Tenant Admin: {form.adminEmail || '—'}</li>
                </ul>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.confirmAcknowledge}
                    onChange={(e) => patch({ confirmAcknowledge: e.target.checked })}
                  />
                  I confirm provisioning of this tenant workspace (demo).
                </label>
                <Button type="button" onClick={() => setModal('sendInvite')} variant="outline" className="w-full sm:w-auto">
                  Preview send invite confirmation
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Live summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between"><span className="text-muted-foreground">Tenant</span><span className="font-medium truncate max-w-[160px]">{form.businessName || '—'}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Plan</span><span>{form.plan}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Modules</span><span>{form.entitlements.length}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Admin</span><span className="truncate max-w-[160px]">{form.adminEmail || '—'}</span></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Next</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              After provisioning, you can open the tenant profile, adjust subscription, or send the admin invite from the success screen.
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-20 border-t border-border bg-background/90 backdrop-blur-md px-8 py-4 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={goBack}>
              Back
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDirty(false);
              setModal('draftSaved');
            }}
          >
            Save draft
          </Button>
        </div>
        <div className="flex gap-2">
          {step < STEPS.length ? (
            <Button type="button" onClick={goNext} disabled={step === 7 && !form.reviewAcknowledge}>
              Next: {STEPS[step].label}
            </Button>
          ) : (
            <Button type="button" onClick={provisionTenant} disabled={!form.confirmAcknowledge}>
              Provision tenant workspace
            </Button>
          )}
        </div>
      </div>

      <FlowAlertModal
        open={modal === 'cancel'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Cancel tenant creation?"
        description="You will lose unsaved progress on this wizard unless you saved a draft."
        cancelLabel="Keep editing"
        actionLabel="Leave"
        onAction={() => navigate('/super-admin/tenants')}
        actionVariant="destructive"
      />
      <FlowAlertModal
        open={modal === 'unsaved'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Unsaved changes"
        description="Save a draft or continue editing. If you leave now, changes may be lost."
        cancelLabel="Continue editing"
        actionLabel="Discard & leave"
        onAction={() => navigate('/super-admin/tenants')}
        actionVariant="destructive"
      />
      <FlowAlertModal
        open={modal === 'dupBiz'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Duplicate business name"
        description="A tenant with a similar business name already exists on the platform. Choose a unique legal or trading name."
        actionLabel="OK"
        onAction={() => setModal(null)}
      />
      <FlowAlertModal
        open={modal === 'dupEmail'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Duplicate admin email"
        description="This email is already associated with another tenant admin account."
        actionLabel="OK"
        onAction={() => setModal(null)}
      />
      <FlowAlertModal
        open={modal === 'badTax'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Invalid tax / VAT number"
        description="The tax identifier you entered is too short or uses an invalid format for the selected country."
        actionLabel="OK"
        onAction={() => setModal(null)}
      />
      <FlowAlertModal
        open={modal === 'planLimit'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Plan limit warning"
        description={`The selected plan (${form.plan}) does not support the outlet or user limits you entered. Lower limits or upgrade the plan.`}
        actionLabel="OK"
        onAction={() => setModal(null)}
      />
      <FlowAlertModal
        open={modal === 'featureDep'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Feature dependency"
        description="This module requires POS (or another module) to be enabled first. Enable dependencies or turn off conflicting options."
        actionLabel="OK"
        onAction={() => setModal(null)}
      />
      <FlowAlertModal
        open={modal === 'weakPassword'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Weak temporary password"
        description="Use at least 8 characters for the temporary password."
        actionLabel="OK"
        onAction={() => setModal(null)}
      />
      <FlowAlertModal
        open={modal === 'confirmCreate'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Confirm tenant creation"
        description="Provision this tenant workspace with the selected plan, entitlements, and Tenant Admin access?"
        cancelLabel="Not now"
        actionLabel="Yes, create tenant"
        onAction={doProvision}
      />
      <FlowAlertModal
        open={modal === 'sendInvite'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Send invite after creation?"
        description="You can send the Tenant Admin invite email immediately after the workspace is created, or resend it later from the tenant profile."
        cancelLabel="Decide later"
        actionLabel="Send invite after create"
        onAction={() => setModal(null)}
      />
      <FlowAlertModal
        open={modal === 'fail'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Tenant creation failed"
        description="Something went wrong while provisioning the workspace (demo). Retry or contact platform support."
        actionLabel="Close"
        onAction={() => setModal(null)}
      />
      <FlowAlertModal
        open={modal === 'draftSaved'}
        onOpenChange={(o) => !o && setModal(null)}
        title="Draft saved"
        description="Your progress has been saved locally for this demo session."
        actionLabel="OK"
        onAction={() => setModal(null)}
      />
    </div>
  );
}
