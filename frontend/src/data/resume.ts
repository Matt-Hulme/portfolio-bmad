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
      title: 'AI Engineer',
      company: 'Travelpass Group',
      period: 'Apr 2025-Sept 2025',
      responsibilities: [
        'Conceptualized and built Asset Frequency Report analyzing tens of millions of Google Ads assets to derive efficiency metrics, driving data-driven copy optimization across all campaigns',
        'Developed AI-powered ad copy generation and fully automated address/name shortening tools',
        'Lead product development and team management for AI automation initiatives',
        'Tech: Python, LangGraph, OpenAI API, Google Ads API, Microsoft Ads API, AWS Lambda/S3, Snowflake, Tableau',
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
        'Tech: TypeScript, React, GraphQL, HTML/CSS, TailwindCSS, AWS',
      ],
    },
    {
      title: 'Junior SEM Specialist → Paid Search Specialist',
      company: 'Travelpass Group',
      period: 'Jul 2022-Feb 2024',
      responsibilities: [
        'Built custom Python scripts for Google Ads API automation',
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
        'Developed systematic data analysis and research processes',
        'Achieved 800% ROI through statistical modeling and risk management',
        'Managed large-scale data filtering and optimization strategies',
      ],
    },
    {
      title: 'The Foot Hammock - Founder/CEO',
      company: 'Self-employed',
      period: '2014-2017',
      responsibilities: [
        'Invented and patented The Foot Hammock, a heated hammock for your desk',
        'Raised $113,000 in 33 days on Kickstarter and an additional $80,000 through digital marketing',
        'Built end-to-end product supply chain, manufacturing, and global distribution to 3,000+ customers',
      ],
    },
  ],
  technicalSkills: [
    {
      category: 'Languages',
      skills: ['Python', 'TypeScript/JavaScript', 'HTML', 'CSS'],
    },
    {
      category: 'Frontend',
      skills: ['React', 'TailwindCSS', 'shadcn/ui', 'Vite'],
    },
    {
      category: 'Backend',
      skills: [
        'FastAPI',
        'Express.js',
        'GraphQL',
        'Rest APIs',
        'Firebase',
        'Supabase',
      ],
    },
    {
      category: 'AI & Automation',
      skills: ['LangGraph', 'LangSmith', 'OpenAI API', 'n8n/make.com'],
    },
    {
      category: 'Data & Analytics',
      skills: [
        'SQL',
        'Snowflake',
        'Google Analytics',
        'Tableau',
        'Google Ads API',
        'Microsoft Ads API',
      ],
    },
    {
      category: 'Cloud & Infrastructure',
      skills: ['AWS (Lambda, S3)'],
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
