import { NavLink } from 'react-router-dom';
import { navLinks } from '@/routes';
import { cn } from '@/lib/utils';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  return (
    <nav className={cn('flex gap-6', className)} aria-label="Main navigation">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            cn(
              'font-mono text-sm transition-colors hover:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              isActive ? 'text-primary' : 'text-foreground',
            )
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
