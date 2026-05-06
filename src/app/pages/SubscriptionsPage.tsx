import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import * as Switch from '@radix-ui/react-switch';
import { cn } from '../lib/utils';

const plans = [
  { name: 'Trial', price: 'Free for 14 days', features: ['1 Outlet', '5 Staff Users', '1GB Storage', '1000 API Calls/day'] },
  { name: 'Basic', price: '$49/month', features: ['3 Outlets', '15 Staff Users', '10GB Storage', '10K API Calls/day'] },
  { name: 'Pro', price: '$199/month', features: ['10 Outlets', '50 Staff Users', '50GB Storage', '100K API Calls/day'], current: true },
  { name: 'Enterprise', price: 'Custom', features: ['Unlimited Outlets', 'Unlimited Users', 'Unlimited Storage', 'Unlimited API Calls'] },
];

const features = [
  { id: 'pos', name: 'POS', description: 'Core point of sale functionality', enabled: true },
  { id: 'inventory', name: 'Inventory', description: 'Stock management and tracking', enabled: true },
  { id: 'ai-onboarding', name: 'AI Onboarding', description: 'Intelligent setup assistance', enabled: true },
  { id: 'ecommerce', name: 'E-Commerce', description: 'Online store integration', enabled: true },
  { id: 'multi-outlet', name: 'Multi-Outlet', description: 'Manage multiple locations', enabled: true },
  { id: 'offline-pos', name: 'Offline POS', description: 'Work without internet', enabled: false },
  { id: 'advanced-reporting', name: 'Advanced Reporting', description: 'Deep analytics and insights', enabled: true },
  { id: 'priority-support', name: 'Priority Support', description: '24/7 premium support', enabled: true },
];

export function SubscriptionsPage() {
  const { tenantId } = useParams();
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [enabledFeatures, setEnabledFeatures] = useState<string[]>(['pos', 'inventory', 'ai-onboarding', 'ecommerce', 'multi-outlet', 'advanced-reporting', 'priority-support']);
  const [confirmImpact, setConfirmImpact] = useState(false);

  const handleFeatureToggle = (featureId: string) => {
    setEnabledFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId]
    );
    setConfirmImpact(false);
  };

  return (
    <div className="max-w-[1600px]">
      <Link to={`/tenants/${tenantId}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Tenant
      </Link>

      <div className="mb-8">
        <h1 className="text-foreground mb-2">Subscriptions & Feature Access</h1>
        <p className="text-muted-foreground">Manage subscription plan and module entitlements for Retail Hub Inc</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                  <h4 className="text-foreground">Pro Plan</h4>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Billing Cycle</p>
                  <p className="text-foreground">Monthly</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Renewal Date</p>
                  <p className="text-foreground">June 1, 2026</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Auto Renew</p>
                  <div className="flex items-center gap-2">
                    <Switch.Root
                      defaultChecked
                      className="w-11 h-6 bg-primary rounded-full"
                    >
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                    <span className="text-sm text-foreground">Enabled</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                    className={cn(
                      'p-4 border-2 rounded-lg cursor-pointer transition-all relative',
                      selectedPlan === plan.name || plan.current
                        ? 'border-primary bg-accent/50'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    {plan.current && (
                      <div className="absolute -top-3 left-4 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                        Current Plan
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage & Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">Outlets</span>
                    <span className="text-sm text-muted-foreground">5 / 10</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">Staff Users</span>
                    <span className="text-sm text-muted-foreground">42 / 50</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">Storage</span>
                    <span className="text-sm text-muted-foreground">28GB / 50GB</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '56%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">API Calls Today</span>
                    <span className="text-sm text-muted-foreground">45K / 100K</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Period</p>
                  <p className="text-foreground">May 1 - May 31, 2026</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Amount Due</p>
                  <p className="text-foreground">$199.00</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                  <p className="text-foreground">•••• 4242</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                  <Badge variant="success">Current</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Access & Entitlements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {features.map((feature) => {
                  const isEnabled = enabledFeatures.includes(feature.id);
                  return (
                    <div key={feature.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-foreground">{feature.name}</h4>
                          <Badge variant={isEnabled ? 'success' : 'secondary'}>
                            {isEnabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <Switch.Root
                        checked={isEnabled}
                        onCheckedChange={() => handleFeatureToggle(feature.id)}
                        className={cn(
                          'w-11 h-6 rounded-full transition-colors ml-4',
                          isEnabled ? 'bg-primary' : 'bg-switch-background'
                        )}
                      >
                        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                      </Switch.Root>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Impact of Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning rounded-lg">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground mb-1">Plan Changes</p>
                    <p className="text-xs text-muted-foreground">
                      Changing the plan will affect limits and pricing. Changes take effect on the next billing cycle.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning rounded-lg">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground mb-1">Feature Changes</p>
                    <p className="text-xs text-muted-foreground">
                      Disabling features may impact tenant operations. Tenant admins will be notified of changes.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mt-0.5"
                      checked={confirmImpact}
                      onChange={(e) => setConfirmImpact(e.target.checked)}
                    />
                    <span className="text-sm text-foreground">
                      I understand the impact of these changes and confirm they should be applied.
                    </span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full"
            disabled={!confirmImpact}
          >
            Apply Changes
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                View Billing History
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Update Payment Method
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Download Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
