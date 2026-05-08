import { Badge } from '../ui/Badge';

export type StatusTone = 'neutral' | 'success' | 'warning' | 'destructive' | 'info';

export function StatusBadge({
  tone = 'neutral',
  children,
}: {
  tone?: StatusTone;
  children: React.ReactNode;
}) {
  if (tone === 'success') return <Badge variant="success">{children}</Badge>;
  if (tone === 'warning') return <Badge variant="warning">{children}</Badge>;
  if (tone === 'destructive') return <Badge variant="destructive">{children}</Badge>;
  if (tone === 'info') return <Badge variant="secondary">{children}</Badge>;
  return <Badge variant="secondary">{children}</Badge>;
}

