import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
} from 'lucide-react';
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
    navigate(role === 'super-admin' ? '/super-admin' : '/tenant-admin');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left premium hero */}
      <div className="relative hidden lg:block overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#0f172a]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-48 -top-52 h-[520px] w-[520px] rounded-full bg-indigo-600/30 blur-[120px]" />
          <div className="absolute -right-48 -bottom-60 h-[560px] w-[560px] rounded-full bg-cyan-500/25 blur-[130px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.65) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative z-10 h-full p-12 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/15 backdrop-blur flex items-center justify-center">
              <div className="h-5 w-5 rounded-md bg-gradient-to-br from-indigo-400 to-blue-500 shadow-[0_12px_30px_rgba(79,70,229,0.30)]" />
            </div>
            <div className="leading-tight">
              <p className="text-white font-semibold">Unified Commerce</p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                {role === 'super-admin' ? 'Super Admin Portal' : 'Tenant Admin Portal'}
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-xl">
            <h1 className="text-[44px] leading-[1.05] tracking-[-0.03em] text-white font-semibold">
              Control Commerce
              <span className="block text-white/85">at Platform Scale</span>
            </h1>
            <p className="mt-5 text-white/70 text-base leading-relaxed max-w-lg">
              Operate tenants, outlets, staff, and POS workflows from one premium command center.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {['Multi-tenant Control', 'Outlet Operations', 'Staff Access Flow'].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Floating cards */}
          <div className="mt-auto grid grid-cols-2 gap-4 max-w-2xl">
            <div className="rounded-3xl border border-white/12 bg-white/6 backdrop-blur-xl p-5 shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/60">Operational Pulse</p>
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />
              </div>
              <div className="mt-3 space-y-2.5">
                {[
                  { label: 'Auth Service', ok: true },
                  { label: 'Billing Service', ok: true },
                  { label: 'Tenant Provisioning', ok: true },
                  { label: 'API Health', ok: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-sm">
                    <span className="text-white/80">{s.label}</span>
                    <span className="text-emerald-300/90 text-xs">Healthy</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/12 bg-white/6 backdrop-blur-xl p-5 shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
              <p className="text-xs text-white/60">Tenants monitored</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-3xl font-semibold text-white">248</p>
                <span className="text-xs text-white/65">+15% this month</span>
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-indigo-400 to-blue-500" />
              </div>
              <p className="mt-3 text-xs text-white/60">Platform visibility across tenants and subscriptions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right login */}
      <div className="relative flex min-h-screen items-center justify-center p-6 lg:p-10">
        <div className="absolute right-6 top-6">
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/70 px-3 py-2 text-sm text-foreground backdrop-blur hover:bg-white/80 shadow-sm">
            <Globe className="h-4 w-4" />
            English
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="w-full max-w-[520px]">
          <div className="mb-4">
            <label className="block text-sm text-foreground mb-2">Portal</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('super-admin')}
                className={[
                  'flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition-all',
                  role === 'super-admin'
                    ? 'border-primary bg-white shadow-[0_18px_45px_rgba(79,70,229,0.10)]'
                    : 'border-border bg-white/60 hover:bg-white/75 text-muted-foreground',
                ].join(' ')}
              >
                <Shield className="h-4 w-4" />
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => setRole('tenant-admin')}
                className={[
                  'flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition-all',
                  role === 'tenant-admin'
                    ? 'border-primary bg-white shadow-[0_18px_45px_rgba(79,70,229,0.10)]'
                    : 'border-border bg-white/60 hover:bg-white/75 text-muted-foreground',
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

          <div className="rounded-3xl border border-white/70 bg-white/75 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.10)] p-8">
            <div className="mb-7">
              <h2 className="text-3xl tracking-[-0.02em] text-foreground font-semibold">
                Welcome Back
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Sign in to your {role === 'super-admin' ? 'Super Admin' : 'Tenant Admin'} account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-foreground">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm mb-2 text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4 rounded border-border" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-lg shadow-indigo-500/20 transition-transform hover:-translate-y-[1px]"
              >
                Sign In
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>

              <div className="relative py-1">
                <div className="h-px w-full bg-border" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/75 px-3 text-xs text-muted-foreground">
                  or
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full rounded-2xl bg-white/65 hover:bg-white/80"
              >
                <ShieldCheck className="h-4 w-4" />
                Sign in with SSO
              </Button>

              <div className="pt-4 text-center">
                <p className="text-xs text-muted-foreground inline-flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-2xl bg-accent/70 border border-border">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </span>
                  Super Admin Access Only
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Unauthorized access is strictly prohibited.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
