import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

export function NotFound() {
  return (
    <div className="bg-background flex items-center justify-center py-24">
      <Container size="narrow">
        <div className="space-y-6 text-center">
          <h1 className="text-primary text-6xl font-bold">404</h1>
          <h2>Page Not Found</h2>
          <p className="text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
