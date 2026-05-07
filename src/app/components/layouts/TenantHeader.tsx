import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function TenantHeader() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search outlets, staff, products…"
            className="w-full pl-9 pr-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />
        </div>

        <select className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-ring min-w-[200px]">
          <option>Retail Hub Inc</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>

        <Button variant="ghost" size="sm">
          <HelpCircle className="w-5 h-5" />
        </Button>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                JD
              </div>
              <span className="text-sm">John Doe</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[200px] bg-popover border border-border rounded-lg shadow-lg p-1"
              sideOffset={5}
            >
              <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none">
                My Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none">
                Business Settings
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-border my-1" />
              <DropdownMenu.Item className="px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer outline-none text-destructive">
                Sign Out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
