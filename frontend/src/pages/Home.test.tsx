import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './Home';
import userEvent from '@testing-library/user-event';

describe('Home', () => {
  it('renders the name after animation', async () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    // Click to skip animation
    await userEvent.click(container.firstChild as Element);
    await waitFor(() => {
      expect(screen.getByText('Matt Hulme')).toBeInTheDocument();
    });
  });

  it('renders the tagline after animation', async () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    // Click to skip animation
    await userEvent.click(container.firstChild as Element);
    await waitFor(() => {
      expect(
        screen.getByText('Applied AI Engineer & Full-Stack Developer'),
      ).toBeInTheDocument();
    });
  });

  it('renders navigation buttons after animation', async () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    // Click to skip animation
    await userEvent.click(container.firstChild as Element);
    await waitFor(() => {
      expect(screen.getByText('View Projects')).toBeInTheDocument();
      expect(screen.getByText('View Resume')).toBeInTheDocument();
    });
  });

  it('has correct links after animation', async () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    // Click to skip animation
    await userEvent.click(container.firstChild as Element);
    await waitFor(() => {
      const projectsLink = screen.getByText('View Projects').closest('a');
      const resumeLink = screen.getByText('View Resume').closest('a');

      expect(projectsLink).toHaveAttribute('href', '/projects');
      expect(resumeLink).toHaveAttribute('href', '/resume');
    });
  });
});
