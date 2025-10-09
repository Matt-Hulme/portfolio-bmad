import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <p>Test content</p>
      </Container>,
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies default max-width class', () => {
    const { container } = render(
      <Container>
        <p>Test</p>
      </Container>,
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.className).toContain('max-w-7xl');
  });

  it('applies narrow max-width class when size is narrow', () => {
    const { container } = render(
      <Container size="narrow">
        <p>Test</p>
      </Container>,
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.className).toContain('max-w-3xl');
  });

  it('applies wide max-width class when size is wide', () => {
    const { container } = render(
      <Container size="wide">
        <p>Test</p>
      </Container>,
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.className).toContain('max-w-screen-2xl');
  });

  it('applies responsive padding classes', () => {
    const { container } = render(
      <Container>
        <p>Test</p>
      </Container>,
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.className).toContain('px-4');
    expect(containerDiv.className).toContain('md:px-8');
    expect(containerDiv.className).toContain('lg:px-12');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Container className="custom-class">
        <p>Test</p>
      </Container>,
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.className).toContain('custom-class');
  });

  it('renders as different element when as prop is provided', () => {
    const { container } = render(
      <Container as="section">
        <p>Test</p>
      </Container>,
    );

    expect(container.firstChild?.nodeName).toBe('SECTION');
  });
});
