import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders component showcase', () => {
    render(<App />);
    expect(screen.getByText('Design System Showcase')).toBeInTheDocument();
  });

  it('displays color palette section', () => {
    render(<App />);
    expect(screen.getByText('Color Palette')).toBeInTheDocument();
    expect(screen.getByText('Primary Colors')).toBeInTheDocument();
    expect(screen.getByText('Gray Scale')).toBeInTheDocument();
  });

  it('displays typography section', () => {
    render(<App />);
    expect(screen.getByText('Typography')).toBeInTheDocument();
  });

  it('displays component sections', () => {
    render(<App />);
    expect(screen.getByText('Buttons')).toBeInTheDocument();
    expect(screen.getByText('Badges')).toBeInTheDocument();
    expect(screen.getByText('Cards')).toBeInTheDocument();
  });
});
