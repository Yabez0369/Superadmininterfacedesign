import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Check, Info, Pencil, UserCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import * as Switch from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';
import { FlowAlertModal } from '../../components/common/FlowAlertModal';

const STEPS = [
  { id: 1, title: 'Details', label: 'Outlet Details' },
  { id: 2, title: 'Address', label: 'Outlet Address' },
  { id: 3, title: 'Hours', label: 'Operating Hours' },
  { id: 4, title: 'POS', label: 'POS Settings' },
  { id: 5, title: 'Payment', label: 'Payment Settings' },
  { id: 6, title: 'Manager', label: 'Assign Manager' },
  { id: 7, title: 'Review', label: 'Review Summary' },
  { id: 8, title: 'Confirm', label: 'Confirm' },
] as const;

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

const MOCK_STAFF = [
  { id: 's1', name: 'Sarah Johnson', email: 'sarah@retailhub.com' },
  { id: 's2', name: 'Mike Chen', email: 'mike@retailhub.com' },
];

const selectClass =
  'w-full rounded-xl border border-border bg-input-background/80 px-3.5 py-2.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30';

type DayHours = { open: string; close: string; closed: boolean };

export function CreateOutletPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [dirty, setDirty] = useState(false);
  const [modal, setModal] = useState<string | null>(null);
  const [applySameHours, setApplySameHours] = useState(true);

  const [form, setForm] = useState({
    outletName: '',
    outletCode: '',
    outletType: 'Retail Store',
    phone: '',
    email: '',
    openingDate: '',
    status: 'Setup',

    address1: '',
    address2: '',
    city: '',
    province: '',
    country: 'United States',
    postalCode: '',

    hours: DAYS.reduce(
      (acc, d) => {
        acc[d] = { open: '09:00', close: '21:00', closed: false } as DayHours;
        return acc;
      },
      {} as Record<(typeof DAYS)[number], DayHours>
    ),
    holidayNote: '',

    posEnabled: true,
    defaultTax: 'Inclusive',
    receiptTemplate: 'Standard',
    cashDrawer: true,
    barcodeScanner: true,
    printerEnabled: true,
    offlineMode: false,
    currencyDisplay: 'Symbol',

    payCash: true,
    payCard: true,
    payQr: true,
    payTransfer: false,
    payOrder: 'Cash, Card, QR',
    requirePaymentRef: false,

    managerStaffId: '' as string,
    skipManager: false,

    reviewAck: false,
    confirmAck: false,
  });

  const patch = useCallback((partial: Partial<typeof form>) => {
    setDirty(true);
    setForm((f) => ({ ...f, ...partial }));
  }, []);

  const patchHours = (day: (typeof DAYS)[number], p: Partial<DayHours>) => {
    setDirty(true);
    setForm((f) => ({
      ...f,
      hours: { ...f.hours, [day]: { ...f.hours[day], ...p } },
    }));
  };

  const applyAllHoursFromMonday = () => {
    const mon = form.hours.Monday;
    const next = { ...form.hours };
    DAYS.forEach((d) => {
      if (d !== 'Monday') next[d] = { ...mon };
    });
    patch({ hours: next });
  };

  const validateStep = (s: number): boolean => {
    if (s === 1) {
      if (!form.outletName.trim() || !form.outletCode.trim()) return false;
      if (form.outletCode.toUpperCase() === 'DUP') {
        setModal('dupCode');
        return false;
      }
    }
    if (s === 2) {
      if (!form.address1.trim() || !form.city.trim() || !form.country.trim()) {
        setModal('badAddress');
        return false;
      }
    }
    if (s === 3) {
      for (const d of DAYS) {
        const h = form.hours[d];
        if (!h.closed && h.open >= h.close) {
          setModal('hoursConflict');
          return false;
        }
      }
    }
    if (s === 4) {
      if (!form.posEnabled && form.payCard) {
        setModal('posWarn');
        return false;
      }
    }
    if (s === 5) {
      if (!form.payCash && !form.payCard && !form.payQr && !form.payTransfer) {
        setModal('payWarn');
        return false;
      }
    }
    if (s === 6) {
      if (!form.skipManager && !form.managerStaffId) {
        setModal('managerRequired');
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

  const selectedManager = MOCK_STAFF.find((m) => m.id === form.managerStaffId);

  const doCreate = () => {
    setModal(null);
    if (Math.random() < 0.03) {
      setModal('fail');
      return;
    }
    navigate('/tenant-admin/outlets/created/main-store');
  };

  return (
    <div className="w-full max-w-none pb-28">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <Link
            to="/tenant-admin/outlets"
            onClick={(e) => {
              if (dirty) {
                e.preventDefault();
                setModal('unsaved');
              }
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Outlets
          </Link>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Outlet workspace</p>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Create New Outlet</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Configure outlet profile, address, hours, POS, payments, and assign an outlet manager.
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
        <div className="flex items-center min-w-[640px] gap-0">
          {STEPS.map((st, index) => (
            <div key={st.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center border-2 text-xs font-medium shrink-0',
                    step > st.id
                      ? 'bg-primary border-primary text-primary-foreground'
                      : step === st.id
                        ? 'border-primary text-primary bg-primary/10'
                        : 'border-border text-muted-foreground'
                  )}
                >
                  {step > st.id ? <Check className="w-4 h-4" /> : st.id}
                </div>
                <span className={cn('text-[10px] mt-1.5 text-center', step >= st.id ? 'text-foreground' : 'text-muted-foreground')}>
                  {st.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={cn('flex-1 h-0.5 mb-5 mx-0.5', step > st.id ? 'bg-primary' : 'bg-border')} />
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
                <CardTitle>Outlet Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1.5">Outlet Name *</label>
                  <Input value={form.outletName} onChange={(e) => patch({ outletName: e.target.value })} placeholder="Main Store" />
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Outlet Code *</label>
                  <Input value={form.outletCode} onChange={(e) => patch({ outletCode: e.target.value.toUpperCase() })} placeholder="MS-001" />
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Outlet Type</label>
                  <select className={selectClass} value={form.outletType} onChange={(e) => patch({ outletType: e.target.value })}>
                    <option>Retail Store</option>
                    <option>Restaurant</option>
                    <option>Warehouse</option>
                    <option>Kiosk</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Outlet Status</label>
                  <select className={selectClass} value={form.status} onChange={(e) => patch({ status: e.target.value })}>
                    <option>Setup</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Phone</label>
                  <Input type="tel" value={form.phone} onChange={(e) => patch({ phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Email</label>
                  <Input type="email" value={form.email} onChange={(e) => patch({ email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Opening Date</label>
                  <Input type="date" value={form.openingDate} onChange={(e) => patch({ openingDate: e.target.value })} />
                </div>
                <p className="md:col-span-2 text-xs text-muted-foreground flex gap-2">
                  <Info className="w-4 h-4 shrink-0" />
                  Demo: set outlet code to <span className="font-mono">DUP</span> to trigger duplicate code.
                </p>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Outlet Address</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1.5">Address Line 1 *</label>
                  <Input value={form.address1} onChange={(e) => patch({ address1: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1.5">Address Line 2</label>
                  <Input value={form.address2} onChange={(e) => patch({ address2: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5">City *</label>
                  <Input value={form.city} onChange={(e) => patch({ city: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Province / District</label>
                  <Input value={form.province} onChange={(e) => patch({ province: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Country *</label>
                  <select className={selectClass} value={form.country} onChange={(e) => patch({ country: e.target.value })}>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>India</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Postal Code</label>
                  <Input value={form.postalCode} onChange={(e) => patch({ postalCode: e.target.value })} />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Operating Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={applySameHours} onChange={(e) => setApplySameHours(e.target.checked)} />
                    Apply Monday hours to all days
                  </label>
                  {applySameHours && (
                    <Button type="button" variant="outline" size="sm" onClick={applyAllHoursFromMonday}>
                      Sync from Monday
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {DAYS.map((d) => (
                    <div key={d} className="flex flex-wrap items-center gap-3 p-3 rounded-xl border border-border">
                      <span className="w-28 text-sm font-medium">{d}</span>
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={form.hours[d].closed}
                          onChange={(e) => patchHours(d, { closed: e.target.checked })}
                        />
                        Closed
                      </label>
                      {!form.hours[d].closed && (
                        <>
                          <Input
                            type="time"
                            className="w-32"
                            value={form.hours[d].open}
                            onChange={(e) => patchHours(d, { open: e.target.value })}
                          />
                          <span className="text-muted-foreground">to</span>
                          <Input
                            type="time"
                            className="w-32"
                            value={form.hours[d].close}
                            onChange={(e) => patchHours(d, { close: e.target.value })}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Holiday / exception note</label>
                  <Input value={form.holidayNote} onChange={(e) => patch({ holidayNote: e.target.value })} placeholder="Optional" />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>POS Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'posEnabled' as const, label: 'Enable POS for outlet', sub: 'Allow POS terminals and sales at this location.' },
                  { key: 'cashDrawer' as const, label: 'Cash drawer', sub: 'Track cash drawer open/close.' },
                  { key: 'barcodeScanner' as const, label: 'Barcode scanner', sub: 'Scan items at checkout.' },
                  { key: 'printerEnabled' as const, label: 'Receipt printer', sub: 'Print receipts and reports at counter.' },
                  { key: 'offlineMode' as const, label: 'Offline mode', sub: 'Queue sales when connectivity drops.' },
                ].map((row) => (
                  <div key={row.key} className="flex items-center justify-between p-4 rounded-xl border border-border gap-4">
                    <div>
                      <p className="text-sm font-medium">{row.label}</p>
                      <p className="text-xs text-muted-foreground">{row.sub}</p>
                    </div>
                    <Switch.Root
                      checked={form[row.key] as boolean}
                      onCheckedChange={(c) => patch({ [row.key]: c })}
                      className={cn(
                        'w-11 h-6 rounded-full shrink-0',
                        (form[row.key] as boolean) ? 'bg-primary' : 'bg-switch-background'
                      )}
                    >
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>
                ))}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1.5">Default tax behavior</label>
                    <select className={selectClass} value={form.defaultTax} onChange={(e) => patch({ defaultTax: e.target.value })}>
                      <option value="Inclusive">Tax inclusive</option>
                      <option value="Exclusive">Tax exclusive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Receipt template</label>
                    <select className={selectClass} value={form.receiptTemplate} onChange={(e) => patch({ receiptTemplate: e.target.value })}>
                      <option>Standard</option>
                      <option>Compact</option>
                      <option>Restaurant</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Currency display</label>
                    <select className={selectClass} value={form.currencyDisplay} onChange={(e) => patch({ currencyDisplay: e.target.value })}>
                      <option value="Symbol">Symbol ($)</option>
                      <option value="Code">Code (USD)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 5 && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'payCash' as const, label: 'Cash' },
                  { key: 'payCard' as const, label: 'Card' },
                  { key: 'payQr' as const, label: 'QR / digital wallet' },
                  { key: 'payTransfer' as const, label: 'Manual bank transfer' },
                ].map((row) => (
                  <div key={row.key} className="flex items-center justify-between p-3 rounded-xl border border-border">
                    <span className="text-sm">{row.label}</span>
                    <Switch.Root
                      checked={form[row.key]}
                      onCheckedChange={(c) => patch({ [row.key]: c })}
                      className={cn('w-11 h-6 rounded-full', form[row.key] ? 'bg-primary' : 'bg-switch-background')}
                    >
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>
                ))}
                <div>
                  <label className="block text-sm mb-1.5">Checkout display order</label>
                  <Input value={form.payOrder} onChange={(e) => patch({ payOrder: e.target.value })} placeholder="e.g. Cash, Card, QR" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                  <span className="text-sm">Require payment reference (transfer)</span>
                  <Switch.Root
                    checked={form.requirePaymentRef}
                    onCheckedChange={(c) => patch({ requirePaymentRef: c })}
                    className={cn('w-11 h-6 rounded-full', form.requirePaymentRef ? 'bg-primary' : 'bg-switch-background')}
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 6 && (
            <Card>
              <CardHeader>
                <CardTitle>Assign Outlet Manager</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.skipManager} onChange={(e) => patch({ skipManager: e.target.checked, managerStaffId: '' })} />
                  Skip for now (you can assign later)
                </label>
                {!form.skipManager && (
                  <>
                    <div>
                      <label className="block text-sm mb-1.5">Search existing staff</label>
                      <select
                        className={selectClass}
                        value={form.managerStaffId}
                        onChange={(e) => patch({ managerStaffId: e.target.value })}
                      >
                        <option value="">Select manager…</option>
                        {MOCK_STAFF.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name} — {m.email}
                          </option>
                        ))}
                      </select>
                    </div>
                    {selectedManager && (
                      <div className="flex items-center gap-4 p-4 rounded-2xl border border-primary/30 bg-primary/5">
                        <UserCircle className="w-12 h-12 text-primary" />
                        <div>
                          <p className="font-medium">{selectedManager.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedManager.email}</p>
                          <p className="text-xs text-muted-foreground mt-1">Role: Outlet Manager (preview)</p>
                        </div>
                        <Button type="button" className="ml-auto" variant="outline" size="sm" onClick={() => setModal('managerAssign')}>
                          Confirm assignment
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {step === 7 && (
            <div className="space-y-4">
              {[
                {
                  title: 'Outlet',
                  s: 1,
                  rows: [
                    ['Name / Code', `${form.outletName || '—'} / ${form.outletCode || '—'}`],
                    ['Type / Status', `${form.outletType} · ${form.status}`],
                    ['Contact', [form.phone, form.email].filter(Boolean).join(' · ') || '—'],
                  ],
                },
                {
                  title: 'Address',
                  s: 2,
                  rows: [
                    ['Line 1', form.address1 || '—'],
                    ['City / Region', [form.city, form.province].filter(Boolean).join(', ') || '—'],
                    ['Country', form.country],
                    ['Postal', form.postalCode || '—'],
                  ],
                },
                {
                  title: 'Hours',
                  s: 3,
                  rows: [['Sample', `${DAYS[0]}: ${form.hours.Monday.closed ? 'Closed' : `${form.hours.Monday.open}–${form.hours.Monday.close}`}`]],
                },
                {
                  title: 'POS',
                  s: 4,
                  rows: [['POS enabled', form.posEnabled ? 'Yes' : 'No'], ['Offline', form.offlineMode ? 'Yes' : 'No']],
                },
                {
                  title: 'Payments',
                  s: 5,
                  rows: [['Methods', [form.payCash && 'Cash', form.payCard && 'Card', form.payQr && 'QR'].filter(Boolean).join(', ') || '—']],
                },
                {
                  title: 'Manager',
                  s: 6,
                  rows: [[form.skipManager ? 'Skipped' : 'Assigned', form.skipManager ? '—' : selectedManager?.name ?? '—']],
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
                  <CardContent className="text-sm space-y-2">
                    {block.rows.map((row, i) => (
                      <div key={i}>
                        <p className="text-muted-foreground">{row[0]}</p>
                        <p className="font-medium">{row[1]}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.reviewAck} onChange={(e) => patch({ reviewAck: e.target.checked })} />
                I have verified outlet details, POS, and payments.
              </label>
            </div>
          )}

          {step === 8 && (
            <Card>
              <CardHeader>
                <CardTitle>Confirm outlet creation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You are about to create <strong>{form.outletName || 'this outlet'}</strong> and apply POS and payment settings.
                </p>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.confirmAck} onChange={(e) => patch({ confirmAck: e.target.checked })} />
                  I confirm creation of this outlet (demo).
                </label>
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
              <p><span className="text-muted-foreground">Outlet:</span> {form.outletName || '—'}</p>
              <p><span className="text-muted-foreground">Code:</span> {form.outletCode || '—'}</p>
              <p><span className="text-muted-foreground">POS:</span> {form.posEnabled ? 'On' : 'Off'}</p>
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
          <Button type="button" variant="outline" onClick={() => { setDirty(false); setModal('draftSaved'); }}>
            Save draft
          </Button>
        </div>
        <div className="flex gap-2">
          {step < STEPS.length ? (
            <Button type="button" onClick={goNext} disabled={step === 7 && !form.reviewAck}>
              Next: {STEPS[step].label}
            </Button>
          ) : (
            <Button type="button" disabled={!form.confirmAck} onClick={() => setModal('confirmCreate')}>
              Create outlet workspace
            </Button>
          )}
        </div>
      </div>

      <FlowAlertModal open={modal === 'cancel'} onOpenChange={(o) => !o && setModal(null)} title="Leave outlet wizard?" description="Any unsaved changes will be lost." cancelLabel="Stay" actionLabel="Leave" actionVariant="destructive" onAction={() => navigate('/tenant-admin/outlets')} />
      <FlowAlertModal open={modal === 'unsaved'} onOpenChange={(o) => !o && setModal(null)} title="Unsaved changes" description="Save a draft or continue editing." cancelLabel="Keep editing" actionLabel="Discard" actionVariant="destructive" onAction={() => navigate('/tenant-admin/outlets')} />
      <FlowAlertModal open={modal === 'dupCode'} onOpenChange={(o) => !o && setModal(null)} title="Duplicate outlet code" description="This outlet code is already in use. Choose another code." actionLabel="OK" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'badAddress'} onOpenChange={(o) => !o && setModal(null)} title="Invalid address" description="Address line 1, city, and country are required." actionLabel="OK" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'hoursConflict'} onOpenChange={(o) => !o && setModal(null)} title="Operating hours conflict" description="Open time must be before close time for open days." actionLabel="OK" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'posWarn'} onOpenChange={(o) => !o && setModal(null)} title="POS setting warning" description="Card payments typically require POS to be enabled. Enable POS or turn off card payments." actionLabel="OK" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'payWarn'} onOpenChange={(o) => !o && setModal(null)} title="Payment method warning" description="Enable at least one payment method for checkout." actionLabel="OK" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'managerRequired'} onOpenChange={(o) => !o && setModal(null)} title="Manager required" description="Select an outlet manager or choose Skip for now." actionLabel="OK" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'managerAssign'} onOpenChange={(o) => !o && setModal(null)} title="Assign manager?" description={selectedManager ? `${selectedManager.name} will be assigned as Outlet Manager for this outlet.` : ''} cancelLabel="Cancel" actionLabel="Confirm" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'confirmCreate'} onOpenChange={(o) => !o && setModal(null)} title="Create outlet?" description="Provision this outlet with the configured settings?" cancelLabel="Cancel" actionLabel="Create outlet" onAction={doCreate} />
      <FlowAlertModal open={modal === 'fail'} onOpenChange={(o) => !o && setModal(null)} title="Creation failed" description="Could not create outlet (demo). Try again." actionLabel="Close" onAction={() => setModal(null)} />
      <FlowAlertModal open={modal === 'draftSaved'} onOpenChange={(o) => !o && setModal(null)} title="Draft saved" description="Progress saved for this demo session." actionLabel="OK" onAction={() => setModal(null)} />
    </div>
  );
}
