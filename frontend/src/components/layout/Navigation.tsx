import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { navLinks, homeLink } from '@/routes';
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
  const location = useLocation();

  const handleMobileNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      'font-mono text-sm transition-colors hover:text-primary/80',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      isActive ? 'text-primary' : 'text-gray-300',
    );

  return (
    <>
      {/* Desktop Navigation */}
      <div
        className={cn(
          'hidden w-full items-center justify-between md:flex',
          className,
        )}
      >
        <NavLink to={homeLink.path} className={navLinkClasses}>
          {homeLink.label}
        </NavLink>
        <nav className="flex gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={navLinkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className="text-primary hover:text-primary/80 ml-auto md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-background border-muted w-[250px]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Site navigation</SheetDescription>
          </SheetHeader>
          <nav
            className="mt-8 flex flex-col gap-4"
            aria-label="Mobile navigation"
          >
            <button
              onClick={() => handleMobileNavClick(homeLink.path)}
              className={cn(
                'hover:text-primary/80 text-left font-mono text-sm transition-colors',
                'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                location.pathname === homeLink.path
                  ? 'text-primary'
                  : 'text-gray-300',
              )}
            >
              {homeLink.label}
            </button>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleMobileNavClick(link.path)}
                className={cn(
                  'hover:text-primary/80 text-left font-mono text-sm transition-colors',
                  'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-gray-300',
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
