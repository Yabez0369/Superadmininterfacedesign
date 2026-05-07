import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import * as Switch from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';

const steps = [
  { number: 1, title: 'Outlet Details' },
  { number: 2, title: 'Outlet Settings' },
  { number: 3, title: 'Assign Staff' },
  { number: 4, title: 'Review & Confirm' },
];

export function CreateOutletPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = () => {
    navigate('/tenant-admin/outlets/created/main-store');
  };

  return (
    <div className="max-w-[1200px]">
      <Link to="/tenant-admin/outlets" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Outlets
      </Link>

      <div className="mb-8">
        <h1 className="text-foreground mb-2">Create New Outlet</h1>
        <p className="text-muted-foreground">Set up a new outlet with operational settings and staff assignments</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors',
                    currentStep > step.number
                      ? 'bg-primary border-primary text-primary-foreground'
                      : currentStep === step.number
                      ? 'border-primary text-primary'
                      : 'border-border text-muted-foreground'
                  )}
                >
                  {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span
                  className={cn(
                    'text-xs mt-2 text-center',
                    currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mb-6',
                    currentStep > step.number ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Outlet Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-foreground mb-4">Outlet Identity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Outlet Name</label>
                      <Input placeholder="Main Store" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Outlet Code</label>
                      <Input placeholder="MS-001" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Outlet Type</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Retail Store</option>
                        <option>Warehouse</option>
                        <option>Pickup Point</option>
                        <option>Kiosk</option>
                        <option>Pop-up Store</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Outlet Status</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Active</option>
                        <option>Setup</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-foreground mb-4">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Outlet Phone Number</label>
                      <Input type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Outlet Email</label>
                      <Input type="email" placeholder="mainstore@example.com" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm mb-2">Contact Person</label>
                      <Input placeholder="Store manager name" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-foreground mb-4">Address</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm mb-2">Address Line 1</label>
                      <Input placeholder="Street address" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm mb-2">Address Line 2</label>
                      <Input placeholder="Apartment, suite, etc. (optional)" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">City</label>
                      <Input placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">State / Province</label>
                      <Input placeholder="State" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Postal Code</label>
                      <Input placeholder="10001" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Country</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-foreground mb-4">Operating Hours</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Opening Time</label>
                      <Input type="time" defaultValue="09:00" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Closing Time</label>
                      <Input type="time" defaultValue="21:00" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Working Days</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Monday - Sunday</option>
                        <option>Monday - Friday</option>
                        <option>Monday - Saturday</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Time Zone</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>EST (UTC-5)</option>
                        <option>PST (UTC-8)</option>
                        <option>CST (UTC-6)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>POS Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Enable POS at this outlet</p>
                      <p className="text-xs text-muted-foreground">Allow point of sale transactions</p>
                    </div>
                    <Switch.Root
                      defaultChecked
                      className="w-11 h-6 bg-primary rounded-full"
                    >
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Receipt Prefix</label>
                      <Input placeholder="MS" defaultValue="MS" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Default Payment Methods</label>
                    <div className="space-y-2">
                      {['Cash', 'Card', 'QR / Digital Payment'].map((method) => (
                        <div key={method} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                          <input type="checkbox" className="w-4 h-4" defaultChecked />
                          <span className="text-sm text-foreground">{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm text-foreground">Offline POS enabled</span>
                    <Switch.Root className="w-11 h-6 bg-switch-background rounded-full">
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm text-foreground">Cash drawer enabled</span>
                    <Switch.Root defaultChecked className="w-11 h-6 bg-primary rounded-full">
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm text-foreground">Enable inventory tracking</span>
                    <Switch.Root defaultChecked className="w-11 h-6 bg-primary rounded-full">
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm text-foreground">Allow negative stock</span>
                    <Switch.Root className="w-11 h-6 bg-switch-background rounded-full">
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm text-foreground">Low-stock alert enabled</span>
                    <Switch.Root defaultChecked className="w-11 h-6 bg-primary rounded-full">
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Default low-stock threshold</label>
                    <Input type="number" defaultValue="10" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Return & Discount Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Return window (days)</label>
                      <Input type="number" defaultValue="30" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Cashier discount limit (%)</label>
                      <Input type="number" defaultValue="10" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm text-foreground">Require manager approval for out-of-policy returns</span>
                    <Switch.Root defaultChecked className="w-11 h-6 bg-primary rounded-full">
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm text-foreground">Require manager PIN above discount limit</span>
                    <Switch.Root defaultChecked className="w-11 h-6 bg-primary rounded-full">
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hardware Setup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm text-foreground">Barcode scanner support</span>
                    <Switch.Root defaultChecked className="w-11 h-6 bg-primary rounded-full">
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm text-foreground">Receipt printer enabled</span>
                    <Switch.Root defaultChecked className="w-11 h-6 bg-primary rounded-full">
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm text-foreground">Customer display enabled</span>
                    <Switch.Root className="w-11 h-6 bg-switch-background rounded-full">
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Assign Staff to Outlet</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Assign outlet manager, cashiers, stock keepers, and maintenance staff
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border-2 border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-foreground mb-1">Outlet Manager</h4>
                      <p className="text-sm text-muted-foreground">
                        Manages daily outlet operations, staff activity, overrides, stock alerts, and outlet settings
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Assign Existing User</Button>
                      <Link to="/tenant-admin/staff/create">
                      <Button size="sm">Create New User</Button>
                    </Link>
                  </div>
                </div>

                <div className="p-4 border-2 border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-foreground mb-1">Cashiers</h4>
                      <p className="text-sm text-muted-foreground">
                        Handle POS transactions, customer service, and basic returns
                      </p>
                    </div>
                    <Button size="sm">Add Cashier</Button>
                  </div>
                </div>

                <div className="p-4 border-2 border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-foreground mb-1">Stock Keepers</h4>
                      <p className="text-sm text-muted-foreground">
                        Manages stock receiving, stock adjustments, inventory counts, and low-stock review
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Add Stock Keeper</Button>
                  </div>
                </div>

                <div className="p-4 border-2 border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-foreground mb-1">Maintenance Staff</h4>
                      <p className="text-sm text-muted-foreground">
                        Can manage hardware status, device setup, printer/scanner checks, and support tasks
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Add Maintenance Staff</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <>
              <div className="bg-warning/10 border border-warning rounded-lg p-4 mb-6">
                <p className="text-sm text-foreground">
                  This will create a new outlet under your business. Staff assigned to this outlet will only access outlet-scoped screens based on their role permissions.
                </p>
              </div>

              <Card className="mb-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Outlet Details</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>Edit</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Outlet Name</p>
                      <p className="text-foreground">Main Store</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Outlet Code</p>
                      <p className="text-foreground">MS-001</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Type</p>
                      <p className="text-foreground">Retail Store</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <p className="text-foreground">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                <input type="checkbox" className="w-5 h-5" required />
                <label className="text-sm text-foreground">I confirm the outlet details and staff assignments are correct.</label>
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Setup Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-xs',
                        currentStep > step.number
                          ? 'bg-primary text-primary-foreground'
                          : currentStep === step.number
                          ? 'bg-accent text-accent-foreground border border-primary'
                          : 'bg-secondary text-muted-foreground'
                      )}
                    >
                      {currentStep > step.number ? <Check className="w-4 h-4" /> : step.number}
                    </div>
                    <span className={cn('text-sm', currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground')}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Outlet is created</li>
                <li>Staff assignments activated</li>
                <li>POS system configured</li>
                <li>Outlet ready for operations</li>
              </ol>
            </CardContent>
          </Card>

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Staff Assignment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">At least one Outlet Manager recommended</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">At least one Cashier recommended</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4" />
                    <span className="text-muted-foreground">Stock Keeper optional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4" />
                    <span className="text-muted-foreground">Maintenance Staff optional</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
              Back
            </Button>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Save Draft</Button>
          {currentStep < 4 ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              Continue to {steps[currentStep].title}
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Create Outlet</Button>
          )}
        </div>
      </div>
    </div>
  );
}
