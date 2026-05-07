import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import * as Switch from '@radix-ui/react-switch';
import { cn } from '../lib/utils';

const steps = [
  { number: 1, title: 'Business Details' },
  { number: 2, title: 'Subscription Plan' },
  { number: 3, title: 'Admin Account' },
  { number: 4, title: 'Review & Confirm' },
];

const plans = [
  { name: 'Trial', price: 'Free for 14 days', features: ['1 Outlet', '5 Staff Users', '1GB Storage', '1000 API Calls/day'] },
  { name: 'Basic', price: '$49/month', features: ['3 Outlets', '15 Staff Users', '10GB Storage', '10K API Calls/day'] },
  { name: 'Pro', price: '$199/month', features: ['10 Outlets', '50 Staff Users', '50GB Storage', '100K API Calls/day'], recommended: true },
  { name: 'Enterprise', price: 'Custom', features: ['Unlimited Outlets', 'Unlimited Users', 'Unlimited Storage', 'Unlimited API Calls'] },
];

const modules = [
  { id: 'pos', name: 'POS', description: 'Core point of sale functionality' },
  { id: 'inventory', name: 'Inventory', description: 'Stock management and tracking' },
  { id: 'ai-onboarding', name: 'AI Onboarding', description: 'Intelligent setup assistance' },
  { id: 'ecommerce', name: 'E-Commerce', description: 'Online store integration' },
  { id: 'multi-outlet', name: 'Multi-Outlet', description: 'Manage multiple locations' },
  { id: 'offline-pos', name: 'Offline POS', description: 'Work without internet' },
];

export function CreateTenantPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [enabledModules, setEnabledModules] = useState<string[]>(['pos', 'inventory', 'ai-onboarding', 'ecommerce', 'multi-outlet']);

  const handleModuleToggle = (moduleId: string) => {
    setEnabledModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const handleSubmit = () => {
    navigate('/super-admin/tenants/created/retail-hub-inc');
  };

  return (
    <div className="w-full max-w-none">
      <Link to="/super-admin/tenants" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Tenants
      </Link>

      <div className="mb-8">
        <h1 className="text-foreground mb-2">Create New Tenant</h1>
        <p className="text-muted-foreground">Set up a new tenant with subscription plan and admin access</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between w-full">
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
                <CardTitle>Business Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-foreground mb-4">Business Identity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Business Name</label>
                      <Input placeholder="Enter business name" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Legal Business Name</label>
                      <Input placeholder="Enter legal name" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Business Type</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Select type</option>
                        <option>Retail</option>
                        <option>Restaurant</option>
                        <option>Services</option>
                        <option>E-Commerce</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Registration Number</label>
                      <Input placeholder="Enter registration number" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-foreground mb-4">Location & Localization</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Country / Region</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
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
                    <div>
                      <label className="block text-sm mb-2">Base Currency</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Language / Locale</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-foreground mb-4">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Business Email</label>
                      <Input type="email" placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Contact Number</label>
                      <Input type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm mb-2">Website</label>
                      <Input type="url" placeholder="https://example.com" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-foreground mb-4">Primary Address</h4>
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
                      <Input placeholder="Postal code" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Choose Subscription Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {plans.map((plan) => (
                      <div
                        key={plan.name}
                        onClick={() => setSelectedPlan(plan.name)}
                        className={cn(
                          'p-4 border-2 rounded-lg cursor-pointer transition-all relative',
                          selectedPlan === plan.name
                            ? 'border-primary bg-accent/50'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        {plan.recommended && (
                          <div className="absolute -top-3 left-4 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                            Recommended
                          </div>
                        )}
                        <h4 className="text-foreground mb-1">{plan.name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{plan.price}</p>
                        <ul className="space-y-2">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                              <Check className="w-4 h-4 text-success flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm mb-2">Billing Cycle</label>
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-3 border-2 border-primary bg-accent/50 rounded-lg text-sm">
                        Monthly
                      </button>
                      <button className="flex-1 px-4 py-3 border border-border rounded-lg text-sm hover:border-primary">
                        Annual <span className="text-success">(Save 20%)</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Usage Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Outlet Limit</label>
                      <Input type="number" defaultValue="10" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Staff User Limit</label>
                      <Input type="number" defaultValue="50" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Storage (GB)</label>
                      <Input type="number" defaultValue="50" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">API Calls per Day</label>
                      <Input type="number" defaultValue="100000" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enabled Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {modules.map((module) => (
                      <div key={module.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <p className="text-sm text-foreground">{module.name}</p>
                          <p className="text-xs text-muted-foreground">{module.description}</p>
                        </div>
                        <Switch.Root
                          checked={enabledModules.includes(module.id)}
                          onCheckedChange={() => handleModuleToggle(module.id)}
                          className={cn(
                            'w-11 h-6 rounded-full transition-colors',
                            enabledModules.includes(module.id) ? 'bg-primary' : 'bg-switch-background'
                          )}
                        >
                          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                        </Switch.Root>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Create Admin Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-foreground mb-4">Admin Identity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">First Name</label>
                      <Input placeholder="First name" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Last Name</label>
                      <Input placeholder="Last name" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Email</label>
                      <Input type="email" placeholder="admin@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Phone</label>
                      <Input type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm mb-2">Job Title</label>
                      <Input placeholder="Owner, Manager, etc." />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-foreground mb-4">Access Setup</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Role</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Tenant Admin</option>
                        <option>Tenant Manager</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Login Method</label>
                      <div className="flex gap-3">
                        <button className="flex-1 px-4 py-3 border-2 border-primary bg-accent/50 rounded-lg text-sm">
                          Invite Email
                        </button>
                        <button className="flex-1 px-4 py-3 border border-border rounded-lg text-sm hover:border-primary">
                          Temporary Password
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <label className="text-sm text-foreground">Require password reset on first login</label>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <input type="checkbox" className="w-4 h-4" />
                      <label className="text-sm text-foreground">Enable 2FA (Two-Factor Authentication)</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <>
              <div className="bg-warning/10 border border-warning rounded-lg p-4 mb-6">
                <p className="text-sm text-foreground">
                  This will create a tenant shell, subscription access, and primary admin account. No operational data will be created.
                </p>
              </div>

              <Card className="mb-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Business Details</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>Edit</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Business Name</p>
                      <p className="text-foreground">Retail Hub Inc</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Business Type</p>
                      <p className="text-foreground">Retail</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Country</p>
                      <p className="text-foreground">United States</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Time Zone</p>
                      <p className="text-foreground">EST (UTC-5)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Subscription Plan</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>Edit</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Plan</p>
                      <p className="text-foreground">{selectedPlan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Billing Cycle</p>
                      <p className="text-foreground">Monthly</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Outlet Limit</p>
                      <p className="text-foreground">10</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Staff Limit</p>
                      <p className="text-foreground">50</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Enabled Modules</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>Edit</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {enabledModules.map((moduleId) => {
                      const module = modules.find((m) => m.id === moduleId);
                      return module ? <span key={moduleId} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">{module.name}</span> : null;
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Admin Account</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)}>Edit</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p className="text-foreground">John Smith</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="text-foreground">john@retailhub.com</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Role</p>
                      <p className="text-foreground">Tenant Admin</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Login Method</p>
                      <p className="text-foreground">Invite Email</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                <input type="checkbox" className="w-5 h-5" required />
                <label className="text-sm text-foreground">I confirm the tenant details are correct.</label>
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
                <li>Tenant account is created</li>
                <li>Subscription is activated</li>
                <li>Admin receives invite email</li>
                <li>Admin can begin setup</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Contact support if you need assistance with tenant creation.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
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
            <Button onClick={handleSubmit}>Create Tenant</Button>
          )}
        </div>
      </div>
    </div>
  );
}
