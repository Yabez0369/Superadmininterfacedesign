import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export function PremiumPageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 flex-wrap mb-8', className)}>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-foreground mb-2">{title}</h1>
        {description ? <p className="text-muted-foreground max-w-3xl">{description}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  );
}

