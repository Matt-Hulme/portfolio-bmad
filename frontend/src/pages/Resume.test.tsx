import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Resume from './Resume';

describe('Resume', () => {
  it('renders resume page with name heading', () => {
    render(
      <BrowserRouter>
        <Resume />
      </BrowserRouter>,
    );
    expect(screen.getByText('Matt Hulme')).toBeInTheDocument();
  });

  it('displays download PDF button', () => {
    render(
      <BrowserRouter>
        <Resume />
      </BrowserRouter>,
    );
    expect(screen.getByText('Download PDF')).toBeInTheDocument();
    const downloadLink = screen.getByRole('link', { name: /download pdf/i });
    expect(downloadLink).toHaveAttribute('href', '/resume.pdf');
    expect(downloadLink).toHaveAttribute('download', 'Matt-Hulme-Resume.pdf');
  });

  it('displays Experience, Technical Skills, and Education sections', () => {
    render(
      <BrowserRouter>
        <Resume />
      </BrowserRouter>,
    );
    expect(
      screen.getByRole('heading', { name: 'Experience' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Technical Skills' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Education' }),
    ).toBeInTheDocument();
  });
});
