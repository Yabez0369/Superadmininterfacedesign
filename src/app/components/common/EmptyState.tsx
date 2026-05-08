import { ReactNode } from 'react';
import { Link } from 'react-router';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';

export function EmptyState({
  icon,
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
}) {
  return (
    <Card>
      <CardContent className="p-16 text-center">
        <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <h3 className="text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{description}</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {primaryCta ? (
            <Link to={primaryCta.to}>
              <Button>{primaryCta.label}</Button>
            </Link>
          ) : null}
          {secondaryCta ? (
            <Link to={secondaryCta.to}>
              <Button variant="outline">{secondaryCta.label}</Button>
            </Link>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

