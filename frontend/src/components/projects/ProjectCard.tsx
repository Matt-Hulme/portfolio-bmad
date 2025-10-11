import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { ProjectResponse } from '@/lib/api';

interface ProjectCardProps {
  project: ProjectResponse;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const hasLiveLink = !!project.liveUrl;
  const hasImages = project.images && project.images.length > 0;
  const firstImage = hasImages ? project.images[0] : null;
  const isVideo = firstImage && /\.(mp4|webm|mov)$/i.test(firstImage.url);

  // Format title: preserve dash for Matt-Hulme.com, replace hyphens with spaces for others
  const displayTitle =
    project.slug === 'Matt-Hulme.com'
      ? 'Matt-Hulme.com'
      : project.slug.replace(/-/g, ' ');

  return (
    <Card
      className="group hover:shadow-primary/5 relative h-full min-w-0 cursor-pointer overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all hover:bg-gray-900/70 hover:shadow-lg"
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
      {/* Left accent border - straight vertical line */}
      <div className="bg-primary/40 group-hover:bg-primary absolute top-0 bottom-0 left-0 z-10 w-1 transition-colors" />

      {/* Visual area - thumbnail (only for cards with images) */}
      {firstImage && (
        <div className="aspect-video w-full">
          {isVideo ? (
            <video
              src={firstImage.url}
              className="h-full w-full object-cover"
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={firstImage.url}
              alt={firstImage.altText}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>
      )}

      <div className="space-y-4 p-6">
        {/* Header with title and live indicator */}
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`group-hover:text-primary text-xl leading-tight font-semibold text-gray-100 transition-colors ${
              project.slug === 'Matt-Hulme.com' ? '' : 'capitalize'
            }`}
          >
            {displayTitle}
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
              key={role.id}
              variant="default"
              className="text-xs text-gray-900"
            >
              {role.name}
            </Badge>
          ))}
        </div>

        {/* Technology badges */}
        <div className="border-t border-gray-800 pt-3">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge
                key={tech.id}
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary font-mono text-xs"
              >
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
