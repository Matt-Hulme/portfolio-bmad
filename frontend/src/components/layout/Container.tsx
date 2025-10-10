import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: 'default' | 'narrow' | 'wide';
}

export function Container({
  children,
  className,
  as: Component = 'div',
  size = 'default',
}: ContainerProps) {
  const maxWidthClasses = {
    default: 'max-w-7xl',
    narrow: 'max-w-3xl',
    wide: 'max-w-screen-2xl',
  };

  return (
    <Component
      className={cn(
        'mx-auto w-full min-w-0 px-4 md:px-8 lg:px-12',
        maxWidthClasses[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
