import { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export function ModuleNavigationCard({
  icon,
  title,
  description,
  stat,
  ctaLabel = 'Open',
  to,
  tone = 'default',
}: {
  icon: ReactNode;
  title: string;
  description: string;
  stat?: string;
  ctaLabel?: string;
  to: string;
  tone?: 'default' | 'primary';
}) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] transition-shadow',
        tone === 'primary' && 'border-primary/20 bg-primary/5'
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className={cn('h-11 w-11 rounded-2xl border flex items-center justify-center', tone === 'primary' ? 'border-primary/20 bg-primary/10' : 'border-border bg-white/60')}>
                {icon}
              </div>
              <div className="min-w-0">
                <p className="text-foreground font-semibold truncate">{title}</p>
                {stat ? <p className="text-xs text-muted-foreground mt-0.5">{stat}</p> : null}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">{description}</p>
          </div>
          <Link to={to} className="shrink-0">
            <Button variant={tone === 'primary' ? 'default' : 'outline'} size="sm" className="gap-2">
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/10 blur-2xl" />
      </CardContent>
    </Card>
  );
}

