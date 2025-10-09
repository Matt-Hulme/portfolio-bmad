import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const hasLiveLink = project.links?.some((link) => link.type === 'live');

  // Format technologies as comma-separated string with ellipsis if too long
  const techDisplay = project.technologies.join(', ');
  const maxTechLength = 60;
  const truncatedTech =
    techDisplay.length > maxTechLength
      ? techDisplay.slice(0, maxTechLength) + '...'
      : techDisplay;

  return (
    <Card
      className="group border-l-primary/40 hover:border-l-primary hover:shadow-primary/5 h-full cursor-pointer border-l-4 bg-gray-900/50 backdrop-blur-sm transition-all hover:bg-gray-900/70 hover:shadow-lg"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="space-y-4 p-6">
        {/* Header with title and live indicator */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="group-hover:text-primary text-xl leading-tight font-semibold text-gray-100 transition-colors">
            {project.title}
          </h3>
          {hasLiveLink && (
            <div
              className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1 rounded border px-2 py-1 font-mono text-xs"
              title="Live project"
            >
              <ExternalLink size={12} className="stroke-2" />
              <span className="font-semibold">LIVE</span>
            </div>
          )}
        </div>

        {/* Summary */}
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">
          {project.summary}
        </p>

        {/* Role badges */}
        <div className="flex flex-wrap gap-2">
          {project.roles.map((role) => (
            <Badge
              key={role}
              variant="outline"
              className="border-gray-700 bg-gray-800/50 text-xs text-gray-300"
            >
              {role}
            </Badge>
          ))}
        </div>

        {/* Technology line with $ prefix */}
        <div className="border-t border-gray-800 pt-2">
          <div className="font-mono text-sm text-gray-500">
            <span className="text-primary font-bold">$ </span>
            <span title={techDisplay}>{truncatedTech}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
