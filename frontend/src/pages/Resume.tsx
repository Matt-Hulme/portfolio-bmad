import { useEffect, useState } from 'react';
import { Download, Mail, Linkedin, Github } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { resumeData } from '@/data/resume';
import '../pages/terminal.css';

export default function Resume() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Build a sequential list of all text lines to type
  const lines = [
    { id: 'name', text: resumeData.name, type: 'h1' },
    { id: 'email', text: resumeData.email, type: 'contact' },
    { id: 'linkedin', text: 'LinkedIn', type: 'contact' },
    { id: 'github', text: 'GitHub', type: 'contact' },
    { id: 'download-btn', text: 'Download PDF', type: 'button' },
    { id: 'exp-title', text: 'Experience', type: 'h2' },
    ...resumeData.experience.flatMap((job, idx) => [
      { id: `exp-${idx}-title`, text: job.title, type: 'job-title' },
      { id: `exp-${idx}-period`, text: job.period, type: 'period' },
      { id: `exp-${idx}-company`, text: job.company, type: 'company' },
      ...job.responsibilities.map((resp, ridx) => ({
        id: `exp-${idx}-resp-${ridx}`,
        text: resp,
        type: 'responsibility',
      })),
    ]),
    { id: 'skills-title', text: 'Technical Skills', type: 'h2' },
    ...resumeData.technicalSkills.flatMap((cat, idx) => [
      {
        id: `skill-cat-${idx}`,
        text: cat.category,
        type: 'skill-category',
      },
      {
        id: `skill-items-${idx}`,
        text: cat.skills.join(', '),
        type: 'skill-items',
      },
    ]),
    { id: 'edu-title', text: 'Education', type: 'h2' },
    ...resumeData.education.map((edu, idx) => ({
      id: `edu-${idx}`,
      text: `${edu.degree} - ${edu.institution} (${edu.year})`,
      type: 'education',
    })),
  ];

  const skipAnimation = () => {
    setIsComplete(true);
    setCurrentLineIndex(lines.length);
  };

  useEffect(() => {
    if (isComplete || currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = lines[currentLineIndex];
    const fullText = currentLine.text;
    let charIndex = 0;

    // Typing speed based on type
    const getTypingSpeed = (type: string) => {
      if (type === 'h1') return 40; // Name
      if (type === 'h2') return 20; // Section headers
      if (type === 'contact') return 15; // Email, LinkedIn, GitHub
      if (type === 'button') return 15; // Download PDF
      if (type === 'job-title') return 15;
      if (type === 'period') return 15; // Job period (Apr 2025-Sept 2025)
      if (type === 'company') return 15;
      if (type === 'responsibility') return 10; // Fastest for long text
      if (type === 'skill-category') return 15;
      if (type === 'skill-items') return 10; // Fast for comma-separated list
      if (type === 'education') return 15;
      return 20;
    };

    const typingInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Brief pause before next line
        setTimeout(() => {
          setDisplayedText('');
          setCurrentLineIndex(currentLineIndex + 1);
        }, 50);
      }
    }, getTypingSpeed(currentLine.type));

    return () => clearInterval(typingInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLineIndex, isComplete]);

  const isAnimating = !isComplete;

  // Helper to check if a line has been completed
  const hasCompleted = (lineId: string) => {
    if (isComplete) return true;
    const lineIdx = lines.findIndex((l) => l.id === lineId);
    return currentLineIndex > lineIdx;
  };

  // Helper to check if currently typing this line
  const isTyping = (lineId: string) => {
    if (isComplete) return false;
    return lines[currentLineIndex]?.id === lineId;
  };

  // Get the text for a line (either completed or currently typing)
  const getLineText = (lineId: string, fallbackText: string) => {
    if (isComplete || hasCompleted(lineId)) return fallbackText;
    if (isTyping(lineId)) return displayedText;
    return '';
  };

  return (
    <main
      className="min-h-[calc(100vh-64px-80px)] py-8 md:py-12"
      onClick={isAnimating ? skipAnimation : undefined}
      style={{ cursor: isAnimating ? 'pointer' : 'default' }}
    >
      <Container>
        {/* Header with Download Button */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-primary mb-2 font-mono text-4xl font-bold">
              {getLineText('name', resumeData.name)}
              {isTyping('name') && <span className="terminal-cursor"></span>}
            </h1>
            {hasCompleted('name') && (
              <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                {(hasCompleted('email') || isTyping('email')) && (
                  <a
                    href={`mailto:${resumeData.email}`}
                    className="hover:text-primary flex items-center gap-1 transition-colors"
                    aria-label="Email"
                    onClick={(e) => {
                      if (isAnimating) e.preventDefault();
                    }}
                    style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
                  >
                    <Mail className="h-4 w-4" />
                    <span>
                      {getLineText('email', resumeData.email)}
                      {isTyping('email') && (
                        <span className="terminal-cursor"></span>
                      )}
                    </span>
                  </a>
                )}
                {(hasCompleted('linkedin') || isTyping('linkedin')) && (
                  <a
                    href={`https://${resumeData.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center gap-1 transition-colors"
                    aria-label="LinkedIn Profile"
                    onClick={(e) => {
                      if (isAnimating) e.preventDefault();
                    }}
                    style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>
                      {getLineText('linkedin', 'LinkedIn')}
                      {isTyping('linkedin') && (
                        <span className="terminal-cursor"></span>
                      )}
                    </span>
                  </a>
                )}
                {(hasCompleted('github') || isTyping('github')) && (
                  <a
                    href={`https://${resumeData.github.personal}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center gap-1 transition-colors"
                    aria-label="GitHub Profile"
                    onClick={(e) => {
                      if (isAnimating) e.preventDefault();
                    }}
                    style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
                  >
                    <Github className="h-4 w-4" />
                    <span>
                      {getLineText('github', 'GitHub')}
                      {isTyping('github') && (
                        <span className="terminal-cursor"></span>
                      )}
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
          {(hasCompleted('download-btn') || isTyping('download-btn')) && (
            <a
              href="/resume.pdf"
              download="Matt-Hulme-Resume.pdf"
              className="inline-flex"
              onClick={(e) => {
                if (isAnimating) e.preventDefault();
              }}
              style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
            >
              <Button className="bg-primary hover:bg-primary/90 gap-2 text-black">
                <Download className="h-4 w-4" />
                <span>
                  {getLineText('download-btn', 'Download PDF')}
                  {isTyping('download-btn') && (
                    <span className="terminal-cursor"></span>
                  )}
                </span>
              </Button>
            </a>
          )}
        </div>

        {/* Experience Section */}
        {hasCompleted('download-btn') && (
          <section aria-labelledby="experience-heading" className="mb-10">
            <h2
              id="experience-heading"
              className="text-primary mb-6 border-b border-gray-800 pb-2 font-mono text-2xl font-bold"
            >
              {getLineText('exp-title', 'Experience')}
              {isTyping('exp-title') && (
                <span className="terminal-cursor"></span>
              )}
            </h2>
            {hasCompleted('exp-title') && (
              <div className="space-y-8">
                {resumeData.experience.map((job, jobIdx) => (
                  <div key={jobIdx} className="space-y-3">
                    {(hasCompleted(`exp-${jobIdx}-title`) ||
                      isTyping(`exp-${jobIdx}-title`)) && (
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-xl font-semibold text-gray-100">
                          {getLineText(`exp-${jobIdx}-title`, job.title)}
                          {isTyping(`exp-${jobIdx}-title`) && (
                            <span className="terminal-cursor"></span>
                          )}
                        </h3>
                        {(hasCompleted(`exp-${jobIdx}-period`) ||
                          isTyping(`exp-${jobIdx}-period`)) && (
                          <span className="font-mono text-sm text-gray-500">
                            {getLineText(`exp-${jobIdx}-period`, job.period)}
                            {isTyping(`exp-${jobIdx}-period`) && (
                              <span className="terminal-cursor"></span>
                            )}
                          </span>
                        )}
                      </div>
                    )}
                    {(hasCompleted(`exp-${jobIdx}-company`) ||
                      isTyping(`exp-${jobIdx}-company`)) && (
                      <p className="text-gray-400">
                        {getLineText(`exp-${jobIdx}-company`, job.company)}
                        {isTyping(`exp-${jobIdx}-company`) && (
                          <span className="terminal-cursor"></span>
                        )}
                      </p>
                    )}
                    <ul className="ml-5 space-y-2 text-gray-300">
                      {job.responsibilities.map((responsibility, respIdx) => {
                        const lineId = `exp-${jobIdx}-resp-${respIdx}`;
                        if (!hasCompleted(lineId) && !isTyping(lineId))
                          return null;
                        return (
                          <li
                            key={respIdx}
                            className="list-disc leading-relaxed"
                          >
                            {getLineText(lineId, responsibility)}
                            {isTyping(lineId) && (
                              <span className="terminal-cursor"></span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Technical Skills Section */}
        {hasCompleted(
          `exp-${resumeData.experience.length - 1}-resp-${resumeData.experience[resumeData.experience.length - 1].responsibilities.length - 1}`,
        ) && (
          <section aria-labelledby="skills-heading" className="mb-10">
            <h2
              id="skills-heading"
              className="text-primary mb-6 border-b border-gray-800 pb-2 font-mono text-2xl font-bold"
            >
              {getLineText('skills-title', 'Technical Skills')}
              {isTyping('skills-title') && (
                <span className="terminal-cursor"></span>
              )}
            </h2>
            {hasCompleted('skills-title') && (
              <div className="space-y-4">
                {resumeData.technicalSkills.map((category, catIdx) => {
                  const catLineId = `skill-cat-${catIdx}`;
                  const itemsLineId = `skill-items-${catIdx}`;
                  if (!hasCompleted(catLineId) && !isTyping(catLineId))
                    return null;
                  return (
                    <div key={catIdx}>
                      <h3 className="mb-3 text-lg font-semibold text-gray-200">
                        {getLineText(catLineId, category.category)}
                        {isTyping(catLineId) && (
                          <span className="terminal-cursor"></span>
                        )}
                      </h3>
                      {(hasCompleted(itemsLineId) || isTyping(itemsLineId)) && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-gray-300">
                            {getLineText(
                              itemsLineId,
                              category.skills.join(', '),
                            )}
                            {isTyping(itemsLineId) && (
                              <span className="terminal-cursor"></span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Education Section */}
        {hasCompleted(
          `skill-items-${resumeData.technicalSkills.length - 1}`,
        ) && (
          <section aria-labelledby="education-heading">
            <h2
              id="education-heading"
              className="text-primary mb-6 border-b border-gray-800 pb-2 font-mono text-2xl font-bold"
            >
              {getLineText('edu-title', 'Education')}
              {isTyping('edu-title') && (
                <span className="terminal-cursor"></span>
              )}
            </h2>
            {hasCompleted('edu-title') && (
              <div className="space-y-4">
                {resumeData.education.map((edu, eduIdx) => {
                  const lineId = `edu-${eduIdx}`;
                  if (!hasCompleted(lineId) && !isTyping(lineId)) return null;
                  return (
                    <div key={eduIdx} className="space-y-1">
                      <p className="text-gray-300">
                        {getLineText(
                          lineId,
                          `${edu.degree} - ${edu.institution} (${edu.year})`,
                        )}
                        {isTyping(lineId) && (
                          <span className="terminal-cursor"></span>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </Container>
    </main>
  );
}
