import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Resume from './Resume';

describe('Resume', () => {
  it('renders resume page with name heading after animation', async () => {
    const { container } = render(
      <BrowserRouter>
        <Resume />
      </BrowserRouter>,
    );
    // Click to skip animation
    await userEvent.click(container.firstChild as Element);
    await waitFor(() => {
      expect(screen.getByText('Matt Hulme')).toBeInTheDocument();
    });
  });

  it('displays download PDF button after animation', async () => {
    const { container } = render(
      <BrowserRouter>
        <Resume />
      </BrowserRouter>,
    );
    // Click to skip animation
    await userEvent.click(container.firstChild as Element);
    await waitFor(() => {
      expect(screen.getByText('Download PDF')).toBeInTheDocument();
      const downloadLink = screen.getByRole('link', {
        name: /download pdf/i,
      });
      expect(downloadLink).toHaveAttribute('href', '/resume.pdf');
      expect(downloadLink).toHaveAttribute('download', 'Matt-Hulme-Resume.pdf');
    });
  });

  it('displays Experience, Technical Skills, and Education sections after animation', async () => {
    const { container } = render(
      <BrowserRouter>
        <Resume />
      </BrowserRouter>,
    );
    // Click to skip animation
    await userEvent.click(container.firstChild as Element);
    await waitFor(() => {
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
});
