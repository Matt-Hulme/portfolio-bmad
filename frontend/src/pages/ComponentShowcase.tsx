import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/layout/Container';

export function ComponentShowcase() {
  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-primary">Design System Showcase</h1>
            <p className="text-lg">
              A comprehensive demonstration of the Hacker Minimalist design
              system components, colors, and typography.
            </p>
          </div>

          {/* Color Palette */}
          <section className="space-y-6">
            <h2>Color Palette</h2>

            <div className="space-y-4">
              <div>
                <h3 className="mb-4">Primary Colors</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-primary"></div>
                    <p className="text-sm font-medium">Primary</p>
                    <p className="text-xs text-gray-500">#7fda89</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-background border border-gray-800"></div>
                    <p className="text-sm font-medium">Background</p>
                    <p className="text-xs text-gray-500">#0f0f0f</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4">Gray Scale</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5 lg:grid-cols-10">
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-gray-50"></div>
                    <p className="text-xs text-gray-500">50</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-gray-100"></div>
                    <p className="text-xs text-gray-500">100</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-gray-200"></div>
                    <p className="text-xs text-gray-500">200</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-gray-300"></div>
                    <p className="text-xs text-gray-500">300</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-gray-400"></div>
                    <p className="text-xs text-gray-500">400</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-gray-500"></div>
                    <p className="text-xs text-gray-500">500</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-gray-600"></div>
                    <p className="text-xs text-gray-500">600</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-gray-700"></div>
                    <p className="text-xs text-gray-500">700</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-gray-800"></div>
                    <p className="text-xs text-gray-500">800</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-gray-900"></div>
                    <p className="text-xs text-gray-500">900</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="space-y-6">
            <h2>Typography</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <h1>Heading 1 - 3rem (48px)</h1>
                <h2>Heading 2 - 2.25rem (36px)</h2>
                <h3>Heading 3 - 1.875rem (30px)</h3>
                <h4>Heading 4 - 1.5rem (24px)</h4>
                <h5>Heading 5 - 1.25rem (20px)</h5>
                <h6>Heading 6 - 1.125rem (18px)</h6>
              </div>

              <div className="space-y-2">
                <p>
                  This is body text. All text uses a monospace font family for
                  the terminal aesthetic. The color is set to gray-400 for
                  comfortable reading on the dark background.
                </p>
                <p className="text-sm text-gray-500">
                  This is smaller text at 0.875rem (14px) in gray-500.
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  Links use the primary color:{' '}
                  <a href="#" className="text-primary hover:underline">
                    Example Link
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section className="space-y-6">
            <h2>Buttons</h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4">Button Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              <div>
                <h3 className="mb-4">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <span className="text-xl">+</span>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Badges */}
          <section className="space-y-6">
            <h2>Badges</h2>

            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </section>

          {/* Cards */}
          <section className="space-y-6">
            <h2>Cards</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>
                    A basic card with header and content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    This is the card content area. Cards provide a container
                    for related information and actions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-primary">
                    Card with Accent
                  </CardTitle>
                  <CardDescription>
                    Left border accent using primary color
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    This demonstrates the Hacker Minimalist aesthetic with a
                    green left border accent.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Card with Badge</CardTitle>
                    <Badge>New</Badge>
                  </div>
                  <CardDescription>
                    Combining multiple components
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Cards can contain other components like badges and buttons.</p>
                  <Button className="w-full">Action</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Container Variants */}
          <section className="space-y-6">
            <h2>Layout Containers</h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-4">Default Container (max-w-7xl)</h3>
                <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
                  <p className="text-sm text-gray-500">
                    Current container width: This showcase uses the default
                    container
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-4">Narrow Container (max-w-3xl)</h3>
                <Container size="narrow">
                  <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
                    <p className="text-sm text-gray-500">
                      This content is in a narrow container, ideal for articles
                      and forms
                    </p>
                  </div>
                </Container>
              </div>

              <div>
                <h3 className="mb-4">Wide Container (max-w-screen-2xl)</h3>
                <p className="mb-2 text-sm text-gray-500">
                  (Would extend beyond current container on large screens)
                </p>
              </div>
            </div>
          </section>

          {/* Responsive Demo */}
          <section className="space-y-6">
            <h2>Responsive Patterns</h2>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Responsive Grid</CardTitle>
                  <CardDescription>
                    1 column on mobile, 2 on tablet, 3 on desktop
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-gray-800 bg-gray-900 p-4 text-center"
                      >
                        Item {i}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Responsive Typography</CardTitle>
                  <CardDescription>
                    Text size adapts to viewport
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xl md:text-2xl lg:text-3xl">
                    This text scales responsively: xl → 2xl → 3xl
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
