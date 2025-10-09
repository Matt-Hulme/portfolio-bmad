import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Design System Test')).toBeInTheDocument();
  });

  it('renders shadcn/ui components', () => {
    render(<App />);

    // Check for badges (use getAllByText since some labels appear multiple times)
    expect(screen.getAllByText('Default').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Secondary').length).toBe(2); // Badge + Button

    // Check for buttons
    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Secondary' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Outline' })).toBeInTheDocument();
  });
});
