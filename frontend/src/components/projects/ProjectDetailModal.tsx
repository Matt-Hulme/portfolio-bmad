import type { ProjectResponse } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink, Github } from 'lucide-react';
import { ImageCarousel } from './ImageCarousel';
import './markdown.css';

interface ProjectDetailModalProps {
  project: ProjectResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) return null;

  // Format title: preserve dash for Matt-Hulme.com, replace hyphens with spaces for others
  const displayTitle =
    project.slug === 'Matt-Hulme.com'
      ? 'Matt-Hulme.com'
      : project.slug.replace(/-/g, ' ');

  // Remove Tech Stack section from description since we display it as badges
  const descriptionWithoutTechStack = project.description
    .replace(/### Tech Stack[\s\S]*?(?=\n###|$)/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Split description: Overview paragraph vs rest (Features, Notes, etc.)
  const overviewMatch = descriptionWithoutTechStack.match(
    /### Overview\s*\n(.*?)(?=\n###|$)/s,
  );
  const overviewText = overviewMatch ? overviewMatch[0] : '';
  const restOfDescription = overviewMatch
    ? descriptionWithoutTechStack.replace(overviewMatch[0], '').trim()
    : descriptionWithoutTechStack;

  // Convert API response to link objects for display
  const links = [];
  if (project.liveUrl) {
    links.push({
      label: 'Live Site',
      url: project.liveUrl,
      type: 'live' as const,
    });
  }
  if (project.githubUrl) {
    links.push({
      label: 'GitHub',
      url: project.githubUrl,
      type: 'github' as const,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto sm:max-w-[90vw] md:max-w-3xl">
        <DialogHeader className="space-y-2">
          <DialogTitle
            className={`text-primary text-2xl ${
              project.slug === 'Matt-Hulme.com' ? '' : 'capitalize'
            }`}
          >
            {displayTitle}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {project.summary}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview - context first */}
          {overviewText && (
            <div className="project-markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {overviewText}
              </ReactMarkdown>
            </div>
          )}

          {/* Gallery - after overview context */}
          {project.images && project.images.length > 0 && (
            <div className="space-y-3">
              <ImageCarousel images={project.images} />
            </div>
          )}

          {/* Rest of description (Features, Notes, etc.) */}
          {restOfDescription && (
            <div className="project-markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {restOfDescription}
              </ReactMarkdown>
            </div>
          )}

          {/* Project Links - prominent call-to-action */}
          {links.length > 0 && (
            <div className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                {links.map((link, index) => (
                  <ProjectLinkItem key={index} link={link} />
                ))}
              </div>
            </div>
          )}

          {/* Metadata Section - tags last */}
          <div className="border-border bg-muted/30 space-y-4 rounded-lg border p-4">
            {/* Roles */}
            {project.roles && project.roles.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-foreground text-sm font-semibold">Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {project.roles.map((role) => (
                    <Badge
                      key={role.id}
                      variant="default"
                      className="bg-primary text-sm text-black"
                    >
                      {role.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-foreground text-sm font-semibold">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech.id}
                      variant="outline"
                      className="border-primary/20 bg-primary/5 text-primary font-mono text-sm"
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for rendering project links as prominent CTAs
function ProjectLinkItem({
  link,
}: {
  link: { label: string; url: string; type: 'live' | 'github' };
}) {
  const getIcon = () => {
    return link.type === 'github' ? (
      <Github className="h-5 w-5" />
    ) : (
      <ExternalLink className="h-5 w-5" />
    );
  };

  const isLive = link.type === 'live';

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
        isLive
          ? 'bg-primary hover:bg-primary/90 text-black'
          : 'border-primary/30 bg-primary/10 text-primary hover:border-primary/50 hover:bg-primary/20 border'
      }`}
    >
      <span className="flex-shrink-0">{getIcon()}</span>
      <span>{link.label}</span>
    </a>
  );
}
