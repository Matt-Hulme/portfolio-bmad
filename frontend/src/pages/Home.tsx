import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

export function Home() {
  return (
    <main className="py-12 md:py-20">
      <Container>
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Name */}
          <h1 className="text-primary font-mono text-5xl font-bold md:text-6xl">
            Matt Hulme
          </h1>

          {/* Title/Tagline */}
          <p className="max-w-2xl text-xl text-gray-300 md:text-2xl">
            Applied AI Engineer & Full-Stack Developer
          </p>

          {/* Quick Navigation */}
          <div className="flex gap-4 pt-4">
            <Link to="/projects">
              <Button size="lg">View Projects</Button>
            </Link>
            <Link to="/resume">
              <Button size="lg" variant="outline">
                View Resume
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
