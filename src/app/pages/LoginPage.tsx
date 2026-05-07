import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Globe, Shield, Building2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'super-admin' | 'tenant-admin'>('super-admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === 'super-admin' ? '/super-admin/dashboard' : '/tenant-admin/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-12 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="#3730a3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="mb-8">
            <h1 className="text-foreground mb-2">Unified Commerce</h1>
            <div className="w-12 h-1 bg-primary rounded-full"></div>
          </div>

          <h2 className="text-3xl text-foreground mb-4">
            Control Commerce at Platform Scale
          </h2>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Manage tenants, subscriptions, feature access, and platform health from a single,
            secure command center. Built for platform operators who need complete visibility
            and control.
          </p>

          <div className="bg-white/80 backdrop-blur border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-foreground mb-1">Enterprise-Grade Security</h4>
                <p className="text-sm text-muted-foreground">
                  Bank-level encryption, audit trails, and role-based access control protect
                  your platform and tenant data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[520px] bg-card flex flex-col justify-center px-12 py-16 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-foreground mb-2">Welcome Back</h2>
          <p className="text-sm text-muted-foreground">
            Sign in to access your admin workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="role" className="block text-sm mb-2">
              Portal
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('super-admin')}
                className={[
                  'flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors',
                  role === 'super-admin'
                    ? 'border-primary bg-accent/50 text-foreground'
                    : 'border-border bg-background hover:bg-accent/30 text-muted-foreground',
                ].join(' ')}
              >
                <Shield className="h-4 w-4" />
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => setRole('tenant-admin')}
                className={[
                  'flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors',
                  role === 'tenant-admin'
                    ? 'border-primary bg-accent/50 text-foreground'
                    : 'border-border bg-background hover:bg-accent/30 text-muted-foreground',
                ].join(' ')}
              >
                <Building2 className="h-4 w-4" />
                Tenant Admin
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Demo routing only. Select a portal to preview the full admin journey.
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="w-4 h-4 rounded border-border" />
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>

          <Button type="button" variant="outline" className="w-full" size="lg">
            Sign in with SSO
          </Button>

          <div className="pt-4 text-center">
            <p className="text-xs text-muted-foreground bg-accent/50 rounded-lg py-2 px-4 inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              {role === 'super-admin' ? 'Super Admin Portal' : 'Tenant Admin Portal'}
            </p>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-border">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mx-auto">
            <Globe className="w-4 h-4" />
            <span>English (US)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
