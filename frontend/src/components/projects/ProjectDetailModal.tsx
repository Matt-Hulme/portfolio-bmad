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
      ? 'matt-hulme.com'
      : project.slug.replace(/-/g, ' ');

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
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl capitalize">
            {displayTitle}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {project.summary}
          </DialogDescription>
        </DialogHeader>

        {/* Description with markdown */}
        <div className="project-markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.description}
          </ReactMarkdown>
        </div>

        {/* Metadata Section */}
        <div className="border-border bg-muted/30 space-y-4 rounded-lg border p-4">
          {/* Roles */}
          {project.roles && project.roles.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-foreground text-sm font-semibold">Roles</h3>
              <div className="flex flex-wrap gap-2">
                {project.roles.map((role) => (
                  <Badge key={role.id} variant="default">
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
                  <Badge key={tech.id} variant="outline">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Links Section */}
        {links.length > 0 && (
          <div className="border-border bg-muted/30 space-y-3 rounded-lg border p-4">
            <h3 className="text-foreground text-sm font-semibold">
              Project Links
            </h3>
            <div className="flex flex-col gap-3">
              {links.map((link, index) => (
                <ProjectLinkItem key={index} link={link} />
              ))}
            </div>
          </div>
        )}

        {/* Media Section */}
        {project.images && project.images.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-foreground text-sm font-semibold">Gallery</h3>
            <ImageCarousel images={project.images} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Helper component for rendering project links with icons
function ProjectLinkItem({
  link,
}: {
  link: { label: string; url: string; type: 'live' | 'github' };
}) {
  const getIcon = () => {
    return link.type === 'github' ? (
      <Github className="h-4 w-4" />
    ) : (
      <ExternalLink className="h-4 w-4" />
    );
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group hover:border-primary/30 hover:bg-primary/5 flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm transition-all"
    >
      <span className="text-primary flex-shrink-0">{getIcon()}</span>
      <span className="text-foreground group-hover:text-primary flex-1">
        {link.label}
      </span>
      <span className="text-muted-foreground text-xs capitalize">
        {link.type === 'live' ? '🟢 Live' : link.type}
      </span>
    </a>
  );
}
