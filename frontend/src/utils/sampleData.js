export const initialResumeState = {
  id: "sample-alex-morgan",
  title: "Alex Morgan - Senior Full Stack Engineer",
  personal: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Full Stack Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "https://alexmorgan.dev",
    linkedin: "https://linkedin.com/in/alexmorgan",
    github: "https://github.com/alexmorgan",
    photoUrl: "",
    summary:
      "Versatile Full Stack Engineer with 6+ years of experience architecting resilient cloud-native microservices and intuitive, high-performance web applications. Spearheaded transition to modern distributed APIs boosting transaction throughput by 42% and slashing cloud compute costs by 28%."
  },
  experiences: [
    {
      id: "exp-1",
      role: "Senior Full Stack Engineer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "",
      current: true,
      description:
        "• Architected and deployed event-driven data pipelines processing 10M+ daily events using Python FastAPI and Kafka.\n• Redesigned core customer dashboard using React, Tailwind CSS, and Vite, reducing initial page load time by 48%.\n• Spearheaded CI/CD automation pipeline using GitHub Actions, cutting release deployment cycles from 3 hours to 12 minutes.\n• Mentored a team of 6 engineers across frontend and backend best practices, conducting bi-weekly architectural reviews."
    },
    {
      id: "exp-2",
      role: "Software Engineer",
      company: "CloudWave Inc.",
      location: "Seattle, WA",
      startDate: "2020-06",
      endDate: "2022-02",
      current: false,
      description:
        "• Built and maintained RESTful and GraphQL APIs in Python for an enterprise inventory tracking platform.\n• Implemented real-time status notifications using WebSockets and Redis Pub/Sub, boosting user engagement by 30%.\n• Engineered automated test suites achieving 92% code coverage, resulting in a 40% decline in production bugs."
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2016-09",
      endDate: "2020-05",
      current: false,
      gpa: "3.85 / 4.0",
      description: "Graduated with High Honors. Dean's Honor List (4 semesters). Capstone Project: Real-time distributed sensor aggregation."
    }
  ],
  skills: [
    { id: "sk-1", name: "React & Next.js", level: "Expert", category: "Frontend" },
    { id: "sk-2", name: "TypeScript & JavaScript", level: "Expert", category: "Frontend" },
    { id: "sk-3", name: "Tailwind CSS", level: "Expert", category: "Frontend" },
    { id: "sk-4", name: "Python & FastAPI", level: "Expert", category: "Backend" },
    { id: "sk-5", name: "Node.js & Express", level: "Advanced", category: "Backend" },
    { id: "sk-6", name: "PostgreSQL & Redis", level: "Advanced", category: "Database" },
    { id: "sk-7", name: "Docker & Kubernetes", level: "Advanced", category: "DevOps" },
    { id: "sk-8", name: "AWS (ECS, S3, RDS)", level: "Intermediate", category: "Cloud" }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Real-Time Collaborative Whiteboard",
      description: "Multiplayer canvas app enabling simultaneous live sketching, sticky notes, and video sharing for remote teams.",
      technologies: "React, WebSockets, FastAPI, Canvas API, Redis",
      link: "https://canvas.alexmorgan.dev",
      github: "https://github.com/alexmorgan/canvas"
    },
    {
      id: "proj-2",
      title: "AI Query Assistant & Smart Docs",
      description: "Intelligent search engine indexing large technical docs with vector embeddings and sub-second semantic retrieval.",
      technologies: "Python, FastAPI, OpenAI API, Qdrant, React",
      link: "https://askdocs.alexmorgan.dev",
      github: "https://github.com/alexmorgan/smart-docs"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      issueDate: "2023-08",
      credentialUrl: "https://aws.amazon.com/verify"
    },
    {
      id: "cert-2",
      name: "Certified Kubernetes Application Developer (CKAD)",
      issuer: "Cloud Native Computing Foundation",
      issueDate: "2022-11",
      credentialUrl: "https://www.cncf.io/certification/ckad"
    }
  ],
  customSections: [
    {
      id: "cust-1",
      title: "Awards & Speaking",
      items: [
        {
          id: "citem-1",
          title: "PyCon Speaker - Async Scalability",
          subtitle: "Keynote Presentation",
          date: "2023",
          description: "Delivered presentation on building high-performance asynchronous microservices with FastAPI to 800+ attendees."
        }
      ]
    }
  ],
  metadata: {
    template: "modern",
    primaryColor: "#2563eb",
    fontFamily: "inter",
    fontSize: "md",
    spacing: "normal",
    sectionOrder: [
      "summary",
      "experience",
      "projects",
      "education",
      "skills",
      "certifications",
      "custom"
    ]
  }
};
