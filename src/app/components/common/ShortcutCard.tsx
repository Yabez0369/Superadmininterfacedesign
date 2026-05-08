import { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export function ShortcutCard({
  icon,
  title,
  description,
  cta,
  to,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  cta: string;
  to: string;
}) {
  return (
    <Card className="relative overflow-hidden hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="h-11 w-11 rounded-2xl border border-border bg-white/60 flex items-center justify-center">
              {icon}
            </div>
            <p className="text-foreground font-semibold mt-4">{title}</p>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          </div>
          <Link to={to} className="shrink-0">
            <Button size="sm" className="gap-2">
              {cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/10 blur-2xl" />
      </CardContent>
    </Card>
  );
}

