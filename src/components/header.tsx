'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, History, Settings, ScanSearch } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export function Header() {
  const isMobile = useIsMobile();

  const navLinks = [
    { href: '/', label: 'Home', icon: Home, disabled: false },
    { href: '#', label: 'History', icon: History, disabled: true },
    { href: '#', label: 'Settings', icon: Settings, disabled: true },
  ];

  const desktopNav = (
    <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
      <Link href="/" className="flex items-center gap-2 font-semibold mr-4">
        <ScanSearch className="h-6 w-6 text-primary" />
        <span className="text-lg">MedLens</span>
      </Link>
      {navLinks.map((link) => (
        <Button key={link.label} variant="link" asChild disabled={link.disabled} className={cn(link.disabled ? 'text-muted-foreground/50' : 'text-muted-foreground')}>
          <Link href={link.href} className="transition-colors hover:text-foreground">
            {link.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
  
  const mobileBottomNav = (
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-card border-t md:hidden">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-muted",
                link.href === '/' ? 'text-primary' : 'text-muted-foreground',
                link.disabled && "text-muted-foreground/50 cursor-not-allowed pointer-events-none"
              )}
            >
              <link.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
  )

  return (
    <>
      <header className="sticky top-0 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 z-40">
        {desktopNav}
        <div className="flex w-full items-center justify-between md:hidden">
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <ScanSearch className="h-6 w-6 text-primary" />
                <span className="text-lg">MedLens</span>
            </Link>
        </div>
      </header>
      {isMobile && mobileBottomNav}
    </>
  );
}
