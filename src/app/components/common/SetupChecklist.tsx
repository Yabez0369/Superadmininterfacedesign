import { Link } from 'react-router';
import { CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { cn } from '../../lib/utils';

export type ChecklistItem = {
  id: string;
  label: string;
  done?: boolean;
  to?: string;
  helper?: string;
};

export function SetupChecklist({
  title,
  description,
  items,
}: {
  title: string;
  description?: string;
  items: ChecklistItem[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <p className="text-sm text-muted-foreground mt-1">{description}</p> : null}
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((it) => {
          const row = (
            <div className={cn('flex items-start gap-3 rounded-2xl border border-border bg-white/60 px-4 py-3', it.done && 'opacity-90')}>
              <div className="mt-0.5">
                {it.done ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground/60" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-foreground font-medium">{it.label}</p>
                {it.helper ? <p className="text-xs text-muted-foreground mt-0.5">{it.helper}</p> : null}
              </div>
            </div>
          );

          return it.to ? (
            <Link key={it.id} to={it.to} className="block hover:opacity-100">
              {row}
            </Link>
          ) : (
            <div key={it.id}>{row}</div>
          );
        })}
      </CardContent>
    </Card>
  );
}

