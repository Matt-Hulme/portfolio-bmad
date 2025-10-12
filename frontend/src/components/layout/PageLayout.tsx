import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Container } from './Container';

export function PageLayout() {
  return (
    <div className="bg-background flex min-h-screen w-full flex-col overflow-x-hidden">
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
          <div className="flex h-16 items-center justify-end text-sm">
            <div className="flex gap-4">
              <a
                href="https://github.com/Matt-Hulme"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:ring-primary font-mono text-gray-300 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/matt-hulme-1ba9a288/"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:ring-primary font-mono text-gray-300 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
