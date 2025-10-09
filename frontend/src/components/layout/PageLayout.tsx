import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Container } from './Container';

export function PageLayout() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Skip to content link for screen readers */}
      <a
        href="#main-content"
        className="focus:bg-primary focus:text-background focus:ring-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="border-muted bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a
              href="/"
              className="text-primary hover:text-primary/80 focus-visible:ring-primary font-mono text-lg font-bold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              bmad.dev
            </a>
            <Navigation />
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-muted bg-background border-t">
        <Container>
          <div className="text-muted-foreground flex h-16 items-center justify-between text-sm">
            <p className="font-mono">© 2025 bmad.dev</p>
            <div className="flex gap-4">
              <a
                href="https://github.com/bmad4ever"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary focus-visible:ring-primary font-mono transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/bruno-fonseca-bmad/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary focus-visible:ring-primary font-mono transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
