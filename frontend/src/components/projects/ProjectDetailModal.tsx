import { Project, ProjectLink } from '@/types/project';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>

        {/* Description with markdown */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.description}
          </ReactMarkdown>
        </div>

        {/* Roles */}
        {project.roles && project.roles.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Roles</h3>
            <div className="flex flex-wrap gap-2">
              {project.roles.map((role) => (
                <Badge key={role} variant="default">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Links Section */}
        {project.links && project.links.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Links</h3>
            <div className="flex flex-col gap-2">
              {project.links.map((link, index) => (
                <ProjectLinkItem key={index} link={link} />
              ))}
            </div>
          </div>
        )}

        {/* Media Section */}
        {project.images && project.images.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Gallery</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {project.images.map((image, index) => (
                <div key={index} className="space-y-1">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="h-auto w-full rounded-lg border"
                  />
                  {image.caption && (
                    <p className="text-muted-foreground text-xs">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Helper component for rendering project links with icons
function ProjectLinkItem({ link }: { link: ProjectLink }) {
  const getIcon = () => {
    switch (link.type) {
      case 'github':
        return <Github className="h-4 w-4" />;
      case 'live':
      case 'demo':
      case 'case-study':
      case 'other':
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary flex items-center gap-2 text-sm hover:underline"
    >
      {getIcon()}
      <span>{link.label}</span>
    </a>
  );
}
