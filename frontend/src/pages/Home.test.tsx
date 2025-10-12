import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './Home';

describe('Home', () => {
  it('renders the name', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(screen.getByText('Matt Hulme')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(
      screen.getByText('Applied AI Engineer & Full-Stack Developer'),
    ).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(screen.getByText('View Projects')).toBeInTheDocument();
    expect(screen.getByText('View Resume')).toBeInTheDocument();
  });

  it('has correct links', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    const projectsLink = screen.getByText('View Projects').closest('a');
    const resumeLink = screen.getByText('View Resume').closest('a');

    expect(projectsLink).toHaveAttribute('href', '/projects');
    expect(resumeLink).toHaveAttribute('href', '/resume');
  });
});
