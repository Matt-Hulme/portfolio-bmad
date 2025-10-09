import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-mono text-2xl text-primary">
            Design System Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
