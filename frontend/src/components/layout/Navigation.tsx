import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { navLinks } from '@/routes';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMobileNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      'font-mono text-sm transition-colors hover:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      isActive ? 'text-primary' : 'text-foreground',
    );

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={cn('hidden gap-6 md:flex', className)}
        aria-label="Main navigation"
      >
        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path} className={navLinkClasses}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className="text-foreground hover:text-primary"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[250px] bg-background border-muted"
        >
          <SheetHeader>
            <SheetTitle className="font-mono text-primary">Menu</SheetTitle>
            <SheetDescription>Navigate to different sections</SheetDescription>
          </SheetHeader>
          <nav
            className="mt-8 flex flex-col gap-4"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleMobileNavClick(link.path)}
                className={cn(
                  'font-mono text-left text-sm transition-colors hover:text-primary',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  'text-foreground',
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
