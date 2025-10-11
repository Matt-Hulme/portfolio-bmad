import { Download, Mail, Linkedin, Github } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { resumeData } from '@/data/resume';

export default function Resume() {
  return (
    <main className="py-8 md:py-12">
      <Container>
        {/* Header with Download Button */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-primary mb-2 font-mono text-4xl font-bold">
              {resumeData.name}
            </h1>
            <div className="flex flex-wrap gap-3 text-sm text-gray-400">
              <a
                href={`mailto:${resumeData.email}`}
                className="hover:text-primary flex items-center gap-1 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
                {resumeData.email}
              </a>
              <a
                href={`https://${resumeData.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary flex items-center gap-1 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={`https://${resumeData.github.personal}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary flex items-center gap-1 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
          <a
            href="/resume.pdf"
            download="Matt-Hulme-Resume.pdf"
            className="inline-flex"
          >
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </a>
        </div>

        {/* Experience Section */}
        <section aria-labelledby="experience-heading" className="mb-10">
          <h2
            id="experience-heading"
            className="text-primary mb-6 border-b border-gray-800 pb-2 font-mono text-2xl font-bold"
          >
            Experience
          </h2>
          <div className="space-y-8">
            {resumeData.experience.map((job, index) => (
              <div key={index} className="space-y-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-semibold text-gray-100">
                    {job.title}
                  </h3>
                  <span className="font-mono text-sm text-gray-500">
                    {job.period}
                  </span>
                </div>
                <p className="text-gray-400">{job.company}</p>
                <ul className="ml-5 space-y-2 text-gray-300">
                  {job.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="list-disc leading-relaxed">
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills Section */}
        <section aria-labelledby="skills-heading" className="mb-10">
          <h2
            id="skills-heading"
            className="text-primary mb-6 border-b border-gray-800 pb-2 font-mono text-2xl font-bold"
          >
            Technical Skills
          </h2>
          <div className="space-y-4">
            {resumeData.technicalSkills.map((category, index) => (
              <div key={index}>
                <h3 className="mb-3 text-lg font-semibold text-gray-200">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="border-gray-700 bg-gray-800/50 text-gray-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section aria-labelledby="education-heading">
          <h2
            id="education-heading"
            className="text-primary mb-6 border-b border-gray-800 pb-2 font-mono text-2xl font-bold"
          >
            Education
          </h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-100">
                  {edu.degree}
                </h3>
                <p className="text-gray-300">{edu.institution}</p>
                <p className="font-mono text-sm text-gray-500">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
