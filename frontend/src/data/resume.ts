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
        'Conceptualized, designed, and built Asset Frequency Report, which analyzes millions of Google Ads assets and derives their relative efficiency, driving data-driven copy optimization decisions across all campaigns',
        'Developed AI-powered ad copy generation and fully automated address/name shortening tools',
        'Lead product development and team management for AI automation initiatives',
        'Stack: Python, LangChain, LangSmith, OpenAI API, Google Ads API, AWS Lambda/S3, Snowflake, Tableau',
      ],
    },
    {
      title: 'Associate → Junior → FE Software Engineer',
      company: 'Travelpass Group',
      period: 'Feb 2024-Mar 2025',
      responsibilities: [
        'Shipped Lists, a collaborative travel recommendation tool',
        'Developed personalized Dashboard Feed, showing follower activity and List updates',
        'Implemented redesigned Profiles page, improving load times and overall UX',
        'Maintained reusable UI component design system',
        'Stack: TypeScript, React, GraphQL, HTML/CSS, Tailwind, AWS, Git/GitHub',
      ],
    },
    {
      title: 'Paid Search Specialist',
      company: 'Travelpass Group',
      period: 'Jul 2023-Feb 2024',
      responsibilities: [
        'Built custom Python scripts for Google Ads API automation (ngrams analysis, RSA reporting)',
        'Created GPT-enabled Google Sheets automating daily SEM tasks',
        'Improved profitability of key international account by 195% YoY',
      ],
    },
    {
      title: 'Junior SEM Specialist',
      company: 'Travelpass Group',
      period: 'Jul 2022-Jul 2023',
      responsibilities: [
        'Entry role managing search engine marketing campaigns and keyword optimization',
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
        'Raised $113,000 in 33 days on Kickstarter',
        'Shipped product to 3,000+ customers worldwide',
        'Generated additional $80,000+ revenue through digital marketing',
      ],
    },
  ],
  technicalSkills: [
    {
      category: 'AI & Data',
      skills: [
        'Python',
        'LangChain',
        'LangSmith',
        'OpenAI API',
        'N8N',
        'SQL',
        'AWS Lambda/S3',
        'Snowflake',
      ],
    },
    {
      category: 'Frontend & Full-Stack',
      skills: ['React', 'TypeScript', 'GraphQL', 'HTML/CSS', 'Tailwind'],
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
