export interface Experience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  name: string;
  email: string;
  linkedin: string;
  github: {
    personal: string;
    work: string;
  };
  experience: Experience[];
  technicalSkills: SkillCategory[];
  education: Education[];
}

export const resumeData: ResumeData = {
  name: 'Matt Hulme',
  email: 'matt.h.programmer@gmail.com',
  linkedin: 'linkedin.com/in/matt-hulme-1ba9a288',
  github: {
    personal: 'github.com/matt-hulme',
    work: 'github.com/mhulme-travelpassgroup',
  },
  experience: [
    {
      title: 'Applied AI Engineer',
      company: 'Travelpass Group',
      period: 'Apr 2025-Present',
      responsibilities: [
        'Designed and built Asset Frequency Report analyzing millions of Google Ads assets to derive efficiency metrics, driving data-driven copy optimization across all campaigns',
        'Developed AI-powered ad copy generation and fully automated address/name shortening tools',
        'Led product development and team management for AI automation initiatives',
        'Tech: Python, LangChain, LangSmith, OpenAI API, Google Ads API, AWS Lambda/S3, Snowflake, Tableau',
      ],
    },
    {
      title: 'Associate → Junior → FE Software Engineer',
      company: 'Travelpass Group',
      period: 'Feb 2024-Mar 2025',
      responsibilities: [
        'Built and shipped Lists feature, a collaborative travel recommendation tool',
        'Developed personalized Dashboard Feed showing follower activity and List updates',
        'Implemented redesigned Profiles page, improving load times and overall UX',
        'Contributed to and maintained reusable UI component design system',
        'Tech: TypeScript, React, GraphQL, HTML/CSS, TailwindCSS, shadcn/ui, AWS, Git/GitHub',
      ],
    },
    {
      title: 'Junior SEM Specialist → Paid Search Specialist',
      company: 'Travelpass Group',
      period: 'Jul 2022-Feb 2024',
      responsibilities: [
        'Built custom Python scripts for Google Ads API automation (ngrams analysis, RSA reporting)',
        'Created GPT-enabled Google Sheets automating daily SEM tasks',
        'Improved profitability of key international account by 195% YoY',
        'Managed search engine marketing campaigns and keyword optimization',
      ],
    },
    {
      title: 'Daily Fantasy Sports Analyst',
      company: 'Self-employed',
      period: '2017-2022',
      responsibilities: [
        'Achieved 800% ROI through systematic data analysis, statistical modeling, and risk management',
      ],
    },
    {
      title: 'The Foot Hammock - Founder/CEO',
      company: 'Self-employed',
      period: '2014-2017',
      responsibilities: [
        'Invented and patented heated desk accessory; launched via Kickstarter campaign raising $113K in 33 days',
        'Built end-to-end product business managing supply chain, manufacturing, and global distribution to 3,000+ customers',
        'Generated additional $80K revenue through digital marketing campaigns',
      ],
    },
  ],
  technicalSkills: [
    {
      category: 'Languages & Frameworks',
      skills: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
    },
    {
      category: 'Frontend Development',
      skills: ['React', 'HTML/CSS', 'TailwindCSS', 'shadcn/ui', 'Vite'],
    },
    {
      category: 'Backend & APIs',
      skills: ['FastAPI', 'GraphQL', 'REST APIs', 'Pydantic', 'Uvicorn'],
    },
    {
      category: 'AI & Automation',
      skills: ['LangChain', 'LangSmith', 'OpenAI API', 'n8n'],
    },
    {
      category: 'Cloud & Infrastructure',
      skills: ['AWS (Lambda, S3)', 'Snowflake', 'Firebase', 'Vercel'],
    },
    {
      category: 'Marketing & Analytics',
      skills: ['Google Ads API', 'Bing Ads', 'Google Analytics', 'Tableau'],
    },
  ],
  education: [
    {
      degree:
        'Bachelor of Science, Business Management - Entrepreneurship Emphasis',
      institution: 'Brigham Young University',
      year: '2016',
    },
  ],
};
