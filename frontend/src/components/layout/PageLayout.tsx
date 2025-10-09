import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Container } from './Container';

export function PageLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Skip to content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a
              href="/"
              className="font-mono text-lg font-bold text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
      <footer className="border-t border-muted bg-background">
        <Container>
          <div className="flex h-16 items-center justify-between text-sm text-muted-foreground">
            <p className="font-mono">© 2025 bmad.dev</p>
            <div className="flex gap-4">
              <a
                href="https://github.com/bmad4ever"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/bruno-fonseca-bmad/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
