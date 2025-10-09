// Technology types for project tech stacks
export type Technology =
  | 'React'
  | 'TypeScript'
  | 'JavaScript'
  | 'Node.js'
  | 'Python'
  | 'TensorFlow'
  | 'PyTorch'
  | 'PostgreSQL'
  | 'MongoDB'
  | 'Redis'
  | 'AWS'
  | 'Docker'
  | 'Kubernetes'
  | 'TailwindCSS'
  | 'Next.js'
  | 'Express'
  | 'FastAPI'
  | 'GraphQL'
  | 'REST API'
  | 'Git'
  | 'CI/CD'
  | 'Figma'
  | 'Analytics'
  | 'SEO';

// Role types for project contributions
export type Role =
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full-Stack Developer'
  | 'AI Engineer'
  | 'ML Engineer'
  | 'Data Analyst'
  | 'Data Engineer'
  | 'Product Manager'
  | 'Marketing Lead'
  | 'DevOps Engineer'
  | 'UI/UX Designer'
  | 'Technical Lead';

// Industry types for project domains
export type Industry =
  | 'Technology'
  | 'Healthcare'
  | 'Finance'
  | 'E-commerce'
  | 'Education'
  | 'Entertainment'
  | 'SaaS'
  | 'Consulting'
  | 'Non-Profit';

// Project link with metadata
export interface ProjectLink {
  label: string;
  url: string;
  type: 'live' | 'github' | 'case-study' | 'demo' | 'other';
}

// Project image with accessibility info
export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

// Main project interface
export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string; // One-line summary for card display
  description: string; // Full markdown description for modal
  roles: Role[];
  technologies: Technology[];
  industry: Industry;
  links?: ProjectLink[];
  images?: ProjectImage[];
  featured?: boolean; // Highlight key projects
  dateCompleted?: string; // ISO date string (YYYY-MM-DD)
}
