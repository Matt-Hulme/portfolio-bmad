import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import './terminal.css';

export function Home() {
  const [nameText, setNameText] = useState('');
  const [showTagline, setShowTagline] = useState(false);
  const [taglineText, setTaglineText] = useState('');
  const [projectsBtnText, setProjectsBtnText] = useState('');
  const [showProjectsBtn, setShowProjectsBtn] = useState(false);
  const [resumeBtnText, setResumeBtnText] = useState('');
  const [showResumeBtn, setShowResumeBtn] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  const name = 'Matt Hulme';
  const tagline =
    'AI Engineer, Full Stack Developer, Data Engineer, and Marketer';
  const projectsBtn = 'View Projects';
  const resumeBtn = 'View Resume';

  const skipAnimation = () => {
    setIsSkipped(true);
    setNameText(name);
    setShowTagline(true);
    setTaglineText(tagline);
    setProjectsBtnText(projectsBtn);
    setShowProjectsBtn(true);
    setResumeBtnText(resumeBtn);
    setShowResumeBtn(true);
  };

  useEffect(() => {
    if (isSkipped) return;

    // Type out the name
    let nameIndex = 0;
    const nameInterval = setInterval(() => {
      if (nameIndex <= name.length) {
        setNameText(name.substring(0, nameIndex));
        nameIndex++;
      } else {
        clearInterval(nameInterval);
        // Brief pause before showing tagline
        setTimeout(() => setShowTagline(true), 300);
      }
    }, 80);

    return () => clearInterval(nameInterval);
  }, [isSkipped]);

  useEffect(() => {
    if (!showTagline || isSkipped) return;

    // Type out the tagline
    let taglineIndex = 0;
    const taglineInterval = setInterval(() => {
      if (taglineIndex <= tagline.length) {
        setTaglineText(tagline.substring(0, taglineIndex));
        taglineIndex++;
      } else {
        clearInterval(taglineInterval);
        // Type Projects button after tagline is complete
        setTimeout(() => {
          let projectsIndex = 0;
          const projectsInterval = setInterval(() => {
            if (projectsIndex <= projectsBtn.length) {
              setProjectsBtnText(projectsBtn.substring(0, projectsIndex));
              projectsIndex++;
            } else {
              clearInterval(projectsInterval);
              setShowProjectsBtn(true);
              // Type Resume button after Projects button is complete
              setTimeout(() => {
                let resumeIndex = 0;
                const resumeInterval = setInterval(() => {
                  if (resumeIndex <= resumeBtn.length) {
                    setResumeBtnText(resumeBtn.substring(0, resumeIndex));
                    resumeIndex++;
                  } else {
                    clearInterval(resumeInterval);
                    setShowResumeBtn(true);
                  }
                }, 40);
              }, 100);
            }
          }, 40);
        }, 300);
      }
    }, 40);

    return () => clearInterval(taglineInterval);
  }, [showTagline, isSkipped]);

  return (
    <main
      className="flex min-h-[calc(100vh-64px-80px)] flex-col py-12 md:py-20"
      onClick={!showResumeBtn ? skipAnimation : undefined}
      style={{ cursor: !showResumeBtn ? 'pointer' : 'default' }}
    >
      <Container>
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Name with typing effect */}
          <h1 className="text-primary font-mono text-5xl font-bold md:text-6xl">
            {nameText}
            {!showTagline && <span className="terminal-cursor"></span>}
          </h1>

          {/* Tagline with typing effect */}
          {showTagline && (
            <p className="max-w-2xl text-xl text-gray-300 md:text-2xl">
              {taglineText}
              {!showProjectsBtn && projectsBtnText === '' && (
                <span className="terminal-cursor"></span>
              )}
            </p>
          )}

          {/* Quick Navigation - buttons type in sequentially */}
          {projectsBtnText && (
            <div className="flex gap-4 pt-4">
              <Link
                to="/projects"
                onClick={(e) => {
                  if (!showResumeBtn) e.preventDefault();
                }}
                style={{ pointerEvents: showResumeBtn ? 'auto' : 'none' }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-black"
                >
                  {projectsBtnText}
                  {!showProjectsBtn && (
                    <span className="terminal-cursor"></span>
                  )}
                </Button>
              </Link>
              {showProjectsBtn && (
                <Link
                  to="/resume"
                  onClick={(e) => {
                    if (!showResumeBtn) e.preventDefault();
                  }}
                  style={{ pointerEvents: showResumeBtn ? 'auto' : 'none' }}
                >
                  <Button size="lg" variant="outline">
                    {resumeBtnText}
                    {!showResumeBtn && (
                      <span className="terminal-cursor"></span>
                    )}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
