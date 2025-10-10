import { describe, it, expect } from 'vitest';
import {
  getAllProjects,
  getProjectBySlug,
  getUniqueTechnologies,
  getUniqueRoles,
  filterProjects,
  projects,
} from './projects';
import type { Technology, Role } from '@/types/project';

describe('projects data', () => {
  describe('data validation', () => {
    it('has exactly 7 projects', () => {
      expect(projects).toHaveLength(7);
    });

    it('all projects have required fields', () => {
      projects.forEach((project) => {
        expect(project.id).toBeDefined();
        expect(project.slug).toBeDefined();
        expect(project.title).toBeDefined();
        expect(project.summary).toBeDefined();
        expect(project.description).toBeDefined();
        expect(project.roles).toBeDefined();
        expect(project.roles.length).toBeGreaterThan(0);
        expect(project.technologies).toBeDefined();
        expect(project.technologies.length).toBeGreaterThan(0);
        expect(project.industry).toBeDefined();
      });
    });

    it('at least 2 projects have live links', () => {
      const projectsWithLiveLinks = projects.filter((p) =>
        p.links?.some((link) => link.type === 'live'),
      );
      expect(projectsWithLiveLinks.length).toBeGreaterThanOrEqual(2);
    });

    it('at least 3 projects have images', () => {
      const projectsWithImages = projects.filter(
        (p) => p.images && p.images.length > 0,
      );
      expect(projectsWithImages.length).toBeGreaterThanOrEqual(3);
    });

    it('at least 2 projects have neither links nor images', () => {
      const projectsWithoutLinksOrImages = projects.filter(
        (p) =>
          (!p.links || p.links.length === 0) &&
          (!p.images || p.images.length === 0),
      );
      expect(projectsWithoutLinksOrImages.length).toBeGreaterThanOrEqual(2);
    });

    it('all project slugs are unique', () => {
      const slugs = projects.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('all project IDs are unique', () => {
      const ids = projects.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('getAllProjects', () => {
    it('returns all 7 projects', () => {
      const result = getAllProjects();
      expect(result).toHaveLength(7);
    });

    it('returns the same array reference as projects', () => {
      const result = getAllProjects();
      expect(result).toBe(projects);
    });
  });

  describe('getProjectBySlug', () => {
    it('finds project by valid slug', () => {
      const project = getProjectBySlug('modern-portfolio-website');
      expect(project).toBeDefined();
      expect(project?.title).toBe('Modern Portfolio Website');
    });

    it('returns undefined for invalid slug', () => {
      const project = getProjectBySlug('non-existent-project');
      expect(project).toBeUndefined();
    });

    it('finds all projects by their slugs', () => {
      projects.forEach((p) => {
        const found = getProjectBySlug(p.slug);
        expect(found).toBeDefined();
        expect(found?.id).toBe(p.id);
      });
    });

    it('returns undefined for empty string slug', () => {
      const project = getProjectBySlug('');
      expect(project).toBeUndefined();
    });
  });

  describe('getUniqueTechnologies', () => {
    it('returns array of technologies', () => {
      const techs = getUniqueTechnologies();
      expect(Array.isArray(techs)).toBe(true);
      expect(techs.length).toBeGreaterThan(0);
    });

    it('returns unique technologies (no duplicates)', () => {
      const techs = getUniqueTechnologies();
      const uniqueTechs = new Set(techs);
      expect(uniqueTechs.size).toBe(techs.length);
    });

    it('returns sorted technologies', () => {
      const techs = getUniqueTechnologies();
      const sortedTechs = [...techs].sort();
      expect(techs).toEqual(sortedTechs);
    });

    it('includes technologies from all projects', () => {
      const techs = getUniqueTechnologies();
      // Verify some known technologies are present
      expect(techs).toContain('React');
      expect(techs).toContain('TypeScript');
      expect(techs).toContain('Python');
    });
  });

  describe('getUniqueRoles', () => {
    it('returns array of roles', () => {
      const roles = getUniqueRoles();
      expect(Array.isArray(roles)).toBe(true);
      expect(roles.length).toBeGreaterThan(0);
    });

    it('returns unique roles (no duplicates)', () => {
      const roles = getUniqueRoles();
      const uniqueRoles = new Set(roles);
      expect(uniqueRoles.size).toBe(roles.length);
    });

    it('returns sorted roles', () => {
      const roles = getUniqueRoles();
      const sortedRoles = [...roles].sort();
      expect(roles).toEqual(sortedRoles);
    });

    it('includes roles from all projects', () => {
      const roles = getUniqueRoles();
      // Verify some known roles are present
      expect(roles).toContain('Frontend Developer');
      expect(roles).toContain('Backend Developer');
      expect(roles).toContain('Full-Stack Developer');
    });
  });

  describe('filterProjects', () => {
    it('returns all projects when no filters provided', () => {
      const result = filterProjects();
      expect(result).toHaveLength(7);
    });

    it('returns all projects when filters object is empty', () => {
      const result = filterProjects({});
      expect(result).toHaveLength(7);
    });

    it('returns all projects when empty arrays provided', () => {
      const result = filterProjects({ technologies: [], roles: [] });
      expect(result).toHaveLength(7);
    });

    it('filters by single technology', () => {
      const result = filterProjects({ technologies: ['React'] });
      expect(result.length).toBeGreaterThan(0);
      result.forEach((project) => {
        expect(project.technologies).toContain('React');
      });
    });

    it('filters by multiple technologies with AND logic', () => {
      const result = filterProjects({ technologies: ['React', 'TypeScript'] });
      expect(result.length).toBeGreaterThan(0);
      result.forEach((project) => {
        expect(project.technologies).toContain('React');
        expect(project.technologies).toContain('TypeScript');
      });
    });

    it('filters by single role', () => {
      const result = filterProjects({ roles: ['Backend Developer'] });
      expect(result.length).toBeGreaterThan(0);
      result.forEach((project) => {
        expect(project.roles).toContain('Backend Developer');
      });
    });

    it('filters by multiple roles with AND logic', () => {
      const result = filterProjects({
        roles: ['Frontend Developer', 'Full-Stack Developer'],
      });
      // Projects must have BOTH roles
      result.forEach((project) => {
        expect(project.roles).toContain('Frontend Developer');
        expect(project.roles).toContain('Full-Stack Developer');
      });
    });

    it('filters by both technologies and roles with AND logic', () => {
      const result = filterProjects({
        technologies: ['React'],
        roles: ['Frontend Developer'],
      });
      expect(result.length).toBeGreaterThan(0);
      result.forEach((project) => {
        expect(project.technologies).toContain('React');
        expect(project.roles).toContain('Frontend Developer');
      });
    });

    it('returns empty array when no projects match technology filter', () => {
      const result = filterProjects({
        technologies: ['NonExistentTech' as Technology],
      });
      expect(result).toHaveLength(0);
    });

    it('returns empty array when no projects match role filter', () => {
      const result = filterProjects({ roles: ['NonExistentRole' as Role] });
      expect(result).toHaveLength(0);
    });

    it('returns empty array when no projects match combined filters', () => {
      // Find a technology and role that don't appear together
      const result = filterProjects({
        technologies: ['Python'],
        roles: ['UI/UX Designer'],
      });
      expect(result).toHaveLength(0);
    });

    it('filters TypeScript projects', () => {
      const result = filterProjects({ technologies: ['TypeScript'] });
      expect(result.length).toBeGreaterThan(0);
      result.forEach((project) => {
        expect(project.technologies).toContain('TypeScript');
      });
    });

    it('filters Full-Stack Developer role', () => {
      const result = filterProjects({ roles: ['Full-Stack Developer'] });
      expect(result.length).toBeGreaterThan(0);
      result.forEach((project) => {
        expect(project.roles).toContain('Full-Stack Developer');
      });
    });

    it('handles multiple projects matching same filter', () => {
      const techResult = filterProjects({ technologies: ['Docker'] });
      const roleResult = filterProjects({ roles: ['DevOps Engineer'] });

      expect(techResult.length).toBeGreaterThan(0);
      expect(roleResult.length).toBeGreaterThan(0);
    });

    it('requires ALL selected technologies (AND logic)', () => {
      const result = filterProjects({
        technologies: ['React', 'TypeScript', 'TailwindCSS'],
      });
      result.forEach((project) => {
        expect(project.technologies).toContain('React');
        expect(project.technologies).toContain('TypeScript');
        expect(project.technologies).toContain('TailwindCSS');
      });
    });

    it('returns specific project when filtered precisely', () => {
      const result = filterProjects({ technologies: ['TensorFlow'] });
      expect(result.length).toBe(1);
      expect(result[0].title).toBe('Real-Time Sentiment Analysis Pipeline');
    });

    it('handles complex multi-filter scenario', () => {
      const result = filterProjects({
        technologies: ['Docker', 'Kubernetes'],
        roles: ['DevOps Engineer'],
      });
      result.forEach((project) => {
        expect(project.technologies).toContain('Docker');
        expect(project.technologies).toContain('Kubernetes');
        expect(project.roles).toContain('DevOps Engineer');
      });
    });
  });

  describe('project diversity', () => {
    it('includes Frontend projects', () => {
      const frontendProjects = projects.filter((p) =>
        p.roles.includes('Frontend Developer'),
      );
      expect(frontendProjects.length).toBeGreaterThan(0);
    });

    it('includes Backend projects', () => {
      const backendProjects = projects.filter((p) =>
        p.roles.includes('Backend Developer'),
      );
      expect(backendProjects.length).toBeGreaterThan(0);
    });

    it('includes AI/ML projects', () => {
      const aiProjects = projects.filter(
        (p) =>
          p.roles.includes('AI Engineer') || p.roles.includes('ML Engineer'),
      );
      expect(aiProjects.length).toBeGreaterThan(0);
    });

    it('includes Data projects', () => {
      const dataProjects = projects.filter(
        (p) =>
          p.roles.includes('Data Analyst') || p.roles.includes('Data Engineer'),
      );
      expect(dataProjects.length).toBeGreaterThan(0);
    });

    it('includes Product/SaaS projects', () => {
      const productProjects = projects.filter(
        (p) =>
          p.roles.includes('Product Manager') ||
          p.roles.includes('Full-Stack Developer'),
      );
      expect(productProjects.length).toBeGreaterThan(0);
    });

    it('includes DevOps projects', () => {
      const devopsProjects = projects.filter((p) =>
        p.roles.includes('DevOps Engineer'),
      );
      expect(devopsProjects.length).toBeGreaterThan(0);
    });

    it('has variety in technologies', () => {
      const allTechs = getUniqueTechnologies();
      // Should have significant variety (at least 15 different technologies)
      expect(allTechs.length).toBeGreaterThanOrEqual(15);
    });

    it('has variety in roles', () => {
      const allRoles = getUniqueRoles();
      // Should have significant variety (at least 8 different roles)
      expect(allRoles.length).toBeGreaterThanOrEqual(8);
    });

    it('has variety in industries', () => {
      const industries = new Set(projects.map((p) => p.industry));
      // Should have at least 3 different industries
      expect(industries.size).toBeGreaterThanOrEqual(3);
    });
  });
});
