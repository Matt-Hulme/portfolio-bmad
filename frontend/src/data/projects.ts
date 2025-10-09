import type { Project } from '@/types/project';

export const projects: Project[] = [
  // Project 1: Frontend - React Portfolio (live link + images)
  {
    id: '1',
    slug: 'modern-portfolio-website',
    title: 'Modern Portfolio Website',
    summary:
      'Responsive React portfolio with project showcase and filtering system',
    description: `
# Modern Portfolio Website

A fully responsive portfolio website built with React 19, TypeScript, and Tailwind CSS, featuring a sophisticated project showcase with filtering capabilities.

## Key Features

- **Project Showcase Grid**: Responsive grid layout displaying projects with role badges and technology tags
- **Advanced Filtering**: Filter projects by technology stack and role with URL parameter support for shareable views
- **Modal Detail Views**: Click any project to view full details in an accessible modal overlay
- **Responsive Navigation**: Mobile hamburger menu and desktop horizontal navigation with active route highlighting
- **Code Splitting**: Lazy-loaded routes with Suspense boundaries for optimal performance
- **Accessibility First**: WCAG compliant with skip-to-content link, keyboard navigation, and screen reader support

## Technical Implementation

Built with modern tooling and best practices:
- React 19.1.1 with TypeScript 5.8+
- Vite for lightning-fast development
- TailwindCSS for utility-first styling
- shadcn/ui component library
- React Router v6 with nested routes
- Vitest for comprehensive unit testing

## Performance

- Production bundle: 296KB (95KB gzipped)
- Lighthouse score: 95+ across all metrics
- Code splitting reduces initial load to <100KB
    `,
    roles: ['Frontend Developer', 'Full-Stack Developer', 'UI/UX Designer'],
    technologies: [
      'React',
      'TypeScript',
      'TailwindCSS',
      'JavaScript',
      'Git',
      'Figma',
    ],
    industry: 'Technology',
    links: [
      { label: 'Live Site', url: 'https://bmad.dev', type: 'live' },
      {
        label: 'GitHub',
        url: 'https://github.com/bmad4ever/portfolio',
        type: 'github',
      },
    ],
    images: [
      {
        url: '/images/portfolio-home.jpg',
        alt: 'Portfolio homepage with project grid',
        caption: 'Responsive project showcase with filtering',
      },
      {
        url: '/images/portfolio-modal.jpg',
        alt: 'Project detail modal view',
        caption: 'Modal overlay with full project details',
      },
      {
        url: '/images/portfolio-mobile.jpg',
        alt: 'Mobile navigation menu',
        caption: 'Mobile-optimized hamburger navigation',
      },
    ],
    featured: true,
    dateCompleted: '2025-01-15',
  },

  // Project 2: Backend - API Platform (github link, no images)
  {
    id: '2',
    slug: 'scalable-api-platform',
    title: 'Scalable REST API Platform',
    summary: 'High-performance Node.js API with PostgreSQL and Redis caching',
    description: `
# Scalable REST API Platform

Enterprise-grade REST API platform built with Node.js and Express, handling 10,000+ requests per minute with sub-100ms response times.

## Architecture Highlights

- **Layered Architecture**: Clean separation of routes, controllers, services, and data access layers
- **Database Optimization**: PostgreSQL with connection pooling and optimized queries
- **Caching Strategy**: Redis implementation reducing database load by 70%
- **Authentication**: JWT-based auth with refresh token rotation
- **Rate Limiting**: Token bucket algorithm preventing abuse
- **API Versioning**: URL-based versioning for backward compatibility

## Tech Stack

- Node.js 20 with Express.js
- PostgreSQL 15 with pg driver
- Redis 7 for caching and sessions
- Docker for containerization
- CI/CD with GitHub Actions

## Performance Metrics

- Average response time: 45ms
- Peak throughput: 12,000 req/min
- 99.9% uptime over 6 months
- Zero data breaches or security incidents
    `,
    roles: ['Backend Developer', 'DevOps Engineer', 'Technical Lead'],
    technologies: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'Redis',
      'Docker',
      'REST API',
      'Git',
      'CI/CD',
    ],
    industry: 'SaaS',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/bmad4ever/api-platform',
        type: 'github',
      },
      {
        label: 'API Documentation',
        url: 'https://api-docs.example.com',
        type: 'other',
      },
    ],
    featured: true,
    dateCompleted: '2024-11-20',
  },

  // Project 3: AI/ML - Sentiment Analysis (images, no live link)
  {
    id: '3',
    slug: 'sentiment-analysis-pipeline',
    title: 'Real-Time Sentiment Analysis Pipeline',
    summary:
      'ML pipeline analyzing customer feedback sentiment with 94% accuracy',
    description: `
# Real-Time Sentiment Analysis Pipeline

Machine learning pipeline processing customer feedback in real-time, providing sentiment classification and emotion detection with industry-leading accuracy.

## ML Approach

- **Model**: Fine-tuned BERT transformer for domain-specific sentiment
- **Training Data**: 500K+ labeled customer reviews across 15 industries
- **Accuracy**: 94.2% on validation set, 92.8% on production data
- **Latency**: <200ms inference time per document

## Pipeline Components

1. **Data Ingestion**: Kafka streams for real-time feedback
2. **Preprocessing**: Text cleaning, tokenization, and normalization
3. **Inference**: TensorFlow Serving with GPU acceleration
4. **Post-Processing**: Confidence scoring and emotion extraction
5. **Storage**: Elasticsearch for fast querying and analytics

## Business Impact

- Automated 85% of manual sentiment tagging
- Reduced feedback processing time from 3 days to real-time
- Enabled proactive customer service interventions
- Identified product issues 2 weeks earlier on average

## Technologies

Built with Python ML stack and production infrastructure:
- TensorFlow 2.15 and Transformers library
- Python 3.11 with FastAPI for serving
- Kafka for stream processing
- Docker + Kubernetes for deployment
    `,
    roles: ['AI Engineer', 'ML Engineer', 'Data Engineer'],
    technologies: [
      'Python',
      'TensorFlow',
      'FastAPI',
      'Docker',
      'Kubernetes',
      'AWS',
    ],
    industry: 'Technology',
    images: [
      {
        url: '/images/sentiment-dashboard.jpg',
        alt: 'Sentiment analysis dashboard',
        caption: 'Real-time sentiment monitoring dashboard',
      },
      {
        url: '/images/sentiment-accuracy.jpg',
        alt: 'Model accuracy metrics',
        caption: '94.2% accuracy on validation dataset',
      },
    ],
    dateCompleted: '2024-09-30',
  },

  // Project 4: Data - Analytics Dashboard (live link + images)
  {
    id: '4',
    slug: 'business-analytics-dashboard',
    title: 'Executive Business Analytics Dashboard',
    summary:
      'Interactive data visualization dashboard for C-suite decision making',
    description: `
# Executive Business Analytics Dashboard

Comprehensive analytics platform providing executives with real-time business insights through interactive visualizations and automated reporting.

## Dashboard Capabilities

- **Revenue Tracking**: Real-time revenue metrics with YoY comparisons
- **Customer Analytics**: Acquisition, retention, and lifetime value metrics
- **Product Performance**: Usage analytics and feature adoption tracking
- **Operational KPIs**: Efficiency metrics and bottleneck identification
- **Predictive Analytics**: ML-powered forecasting for key metrics

## Data Architecture

- **ETL Pipeline**: Automated daily data extraction from 12 source systems
- **Data Warehouse**: PostgreSQL with optimized star schema design
- **Caching Layer**: Redis for sub-second query responses
- **API Layer**: GraphQL API for flexible data fetching
- **Frontend**: React with recharts for visualizations

## Business Value

- Reduced report generation time from 8 hours to instant
- Enabled data-driven decisions with real-time insights
- Identified $2M in cost savings through operational analytics
- 95% executive adoption rate within first quarter

## Technical Stack

Modern data stack with focus on performance and UX:
- React + TypeScript for interactive UI
- GraphQL API with Apollo Client
- PostgreSQL data warehouse
- Python ETL with Airflow orchestration
    `,
    roles: ['Data Analyst', 'Data Engineer', 'Frontend Developer'],
    technologies: [
      'React',
      'TypeScript',
      'Python',
      'PostgreSQL',
      'GraphQL',
      'Analytics',
    ],
    industry: 'Finance',
    links: [
      {
        label: 'Live Dashboard',
        url: 'https://analytics.example.com',
        type: 'live',
      },
      {
        label: 'Case Study',
        url: 'https://blog.example.com/analytics-case-study',
        type: 'case-study',
      },
    ],
    images: [
      {
        url: '/images/dashboard-overview.jpg',
        alt: 'Analytics dashboard overview',
        caption: 'Executive dashboard with key business metrics',
      },
      {
        url: '/images/dashboard-revenue.jpg',
        alt: 'Revenue analytics view',
        caption: 'Interactive revenue tracking with YoY comparison',
      },
      {
        url: '/images/dashboard-customers.jpg',
        alt: 'Customer analytics view',
        caption: 'Customer acquisition and retention metrics',
      },
    ],
    featured: true,
    dateCompleted: '2024-12-10',
  },

  // Project 5: Product/Full-Stack - SaaS App (no links, no images)
  {
    id: '5',
    slug: 'saas-collaboration-platform',
    title: 'Team Collaboration SaaS Platform',
    summary:
      'Full-stack collaboration tool for remote teams with real-time features',
    description: `
# Team Collaboration SaaS Platform

Full-featured collaboration platform designed for remote teams, combining project management, real-time communication, and document collaboration.

## Core Features

- **Project Management**: Kanban boards, sprint planning, and timeline views
- **Real-Time Chat**: WebSocket-based messaging with presence indicators
- **Document Collaboration**: Google Docs-style collaborative editing
- **Video Conferencing**: Integrated WebRTC video calls
- **File Sharing**: S3-backed storage with preview generation
- **Notifications**: Real-time push notifications and email digests

## Technical Architecture

- **Frontend**: Next.js 14 with React Server Components
- **Backend**: Node.js microservices with message queue
- **Database**: PostgreSQL for relational data, MongoDB for chat history
- **Real-Time**: WebSockets for live updates and collaboration
- **Storage**: AWS S3 with CloudFront CDN
- **Authentication**: Auth0 with SSO support

## Scale & Performance

- Supporting 5,000+ active users
- 99.95% uptime over 12 months
- <100ms API response times at p95
- Real-time features with <50ms latency

## Product Management Role

Led product roadmap and feature prioritization:
- Conducted 30+ user interviews to identify pain points
- Defined MVP scope and 6-month product roadmap
- Collaborated with design on UX flows and prototypes
- Analyzed usage data to optimize feature adoption
    `,
    roles: ['Full-Stack Developer', 'Product Manager', 'Technical Lead'],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'AWS',
    ],
    industry: 'SaaS',
    dateCompleted: '2024-08-15',
  },

  // Project 6: Marketing - Growth Campaign (no links, no images)
  {
    id: '6',
    slug: 'data-driven-growth-campaign',
    title: 'Data-Driven Growth Marketing Campaign',
    summary: 'SEO and content strategy increasing organic traffic by 300%',
    description: `
# Data-Driven Growth Marketing Campaign

Comprehensive growth marketing initiative combining SEO optimization, content strategy, and analytics to drive sustainable organic traffic growth.

## Campaign Strategy

- **SEO Foundation**: Technical SEO audit and optimization
- **Content Strategy**: Keyword research and content calendar planning
- **Link Building**: Outreach campaign securing 150+ quality backlinks
- **Conversion Optimization**: A/B testing and funnel optimization
- **Analytics Setup**: Custom tracking and attribution modeling

## Results Achieved

- **Traffic Growth**: 300% increase in organic traffic over 6 months
- **Rankings**: 45 target keywords ranking in top 3 positions
- **Conversion Rate**: Improved from 2.1% to 4.8%
- **Revenue Impact**: $500K additional ARR from organic channel
- **Domain Authority**: Increased from 28 to 52

## Technical Marketing

- **Tools Used**: Google Analytics, Search Console, Ahrefs, SEMrush
- **Automation**: Python scripts for rank tracking and reporting
- **A/B Testing**: Implemented with Optimizely
- **Tag Management**: GTM setup with custom event tracking
- **CRM Integration**: Salesforce integration for lead attribution

## Content Creation

- Produced 50+ blog posts optimized for target keywords
- Created 15 downloadable resources (whitepapers, guides)
- Developed interactive tools (calculators, assessments)
- Video content strategy with 20+ educational videos
    `,
    roles: ['Marketing Lead', 'Data Analyst'],
    technologies: ['Analytics', 'SEO', 'Python', 'JavaScript', 'Figma'],
    industry: 'E-commerce',
    dateCompleted: '2024-10-01',
  },

  // Project 7: Infrastructure/DevOps (github link, no images)
  {
    id: '7',
    slug: 'kubernetes-infrastructure-platform',
    title: 'Kubernetes Infrastructure Platform',
    summary:
      'Production-ready K8s platform with GitOps and automated deployment',
    description: `
# Kubernetes Infrastructure Platform

Enterprise-grade Kubernetes platform enabling rapid, reliable deployments with GitOps workflows and comprehensive observability.

## Infrastructure Overview

- **Cluster Management**: Multi-region EKS clusters with high availability
- **GitOps**: ArgoCD for declarative configuration management
- **CI/CD**: GitHub Actions with automated testing and deployment
- **Service Mesh**: Istio for traffic management and security
- **Observability**: Prometheus, Grafana, and ELK stack
- **Security**: Pod security policies, network policies, secrets management

## Platform Capabilities

- **Auto-Scaling**: HPA and cluster autoscaling for optimal resource usage
- **Disaster Recovery**: Automated backups and cross-region failover
- **Developer Experience**: Self-service deployments via PR-based workflows
- **Cost Optimization**: Spot instances and right-sizing recommendations
- **Compliance**: SOC 2 and ISO 27001 aligned security controls

## Technical Implementation

- **IaC**: Terraform for AWS infrastructure provisioning
- **Configuration**: Helm charts and Kustomize for K8s manifests
- **Monitoring**: Full observability with distributed tracing
- **Logging**: Centralized logging with retention and alerting
- **Secrets**: HashiCorp Vault integration for secrets management

## Business Impact

- Reduced deployment time from 2 hours to 10 minutes
- Improved system reliability to 99.99% uptime
- Cut infrastructure costs by 35% through optimization
- Enabled 50+ deployments per day with confidence
- Zero security incidents in production environment
    `,
    roles: ['DevOps Engineer', 'Backend Developer'],
    technologies: [
      'Kubernetes',
      'Docker',
      'AWS',
      'Python',
      'Node.js',
      'CI/CD',
      'Git',
    ],
    industry: 'Technology',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/bmad4ever/k8s-platform',
        type: 'github',
      },
      {
        label: 'Documentation',
        url: 'https://docs.k8s-platform.example.com',
        type: 'other',
      },
    ],
    dateCompleted: '2024-07-20',
  },
];
