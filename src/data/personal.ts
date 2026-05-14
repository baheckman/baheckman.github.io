// Personal information and content data
// This data is used across all themes and components

export const PERSONAL_INFO = {
  name: "Brian Heckman",
  title: "Software Engineer, Storage Platform",
  company: "Abnormal Security",
  location: "New York, NY",
  timezone: "EST/EDT",
  email: "brian at baheckman dot com",
  bio: [
    "I'm Brian — a software engineer based in NYC.",
    "I focus on building both robust technical systems and collaborative teams where great people can do their best work on meaningful challenges.",
    "Currently: Software Engineer bulding the Storage Platform at Abnormal Security.",
    "Previously: worked at Density, Vanguard, GE Digital.",
    "Always learning something new."
  ],
  languages: "English, forgettable German",
  skills: [
    "Languages: Python, Go, TypeScript, SQL",
    "Backend: Django, FastAPI, Pydantic, REST, gRPC, Authentication, Authorization",
    "Databases: PostgreSQL, Redis, DynamoDB, OpenSearch",
    "Infrastructure: AWS, Kubernetes, Docker, Terraform, Prometheus",
    "Soft Skills: Teamwork, Leadership, Project Management, Effective Communication, Critical Thinking, Mentoring",
  ],
  social: {
    github: "https://github.com/baheckman",
    linkedin: "https://www.linkedin.com/in/brian-heckman-20604182",
    goodreads: "https://www.goodreads.com/user/show/160682533-brian-heckman"
  }
};

export const EXPERIENCE = [
  {
    company: "Abnormal Security",
    role: "Software Engineer, Data Platform",
    timeframe: "November 2024 — Present",
    achievements: [
      "Added observability to key value storage systems, with automated canary analysis decreasing related sev0/1 events by 95%",
      "Refactored customer data deletion pipeline to support higher volume by optimizing SQL and parallelizing Airflow DAGs; improved throughput 25x (100→2,500 records/sec) across databases, reducing backlog and deletion delays and mitigating business risk"
    ]
  },
  {
    company: "Density",
    role: "Senior Software Engineer",
    timeframe: "March 2021 — November 2024",
    achievements: [
      "Scaled backend systems to support 5× customer growth, increasing throughput and stability while reducing Sev0 incidents by 60%",
      "Improved query performance by up to 90× by redesigning database schema and optimizing inefficient Django ORM queries",
      "Built data pipelines using Kafka to ingest and transform over 1 billion sensor events per day",
      "Cut RDS costs by 40% by rightsizing EC2 instances and reducing unnecessary I/O and memory overhead",
      "Mentored junior engineers resulting in 2 mentee promotions"
    ]
  },
  {
    company: "Vanguard",
    role: "Machine Learning Engineer",
    timeframe: "July 2019 — March 2021",
    achievements: [
      "Built multiple inference APIs enabling marketing and trading teams to leverage machine learning models",
      "Created system performance dashboards for real time monitoring and troubleshooting"
    ]
  },
  {
    company: "General Electric",
    role: "Digital Technology Leadership Program",
    timeframe: "July 2017 — July 2019",
    achievements: [
      "Completed 2 year leadership training rotational program",
      "Joined new team every 6 months for special projects related to cloud computing, marketing and predictive analytics"
    ]
  }
];

export const EDUCATION = [
  {
    institution: "Georgia Institute of Technology",
    degree: "M.S. Computer Science",
    timeframe: "2020 — 2023",
    details: []
  },
  {
    institution: "Syracuse University",
    degree: "B.S. Computer Science",
    timeframe: "2013 — 2017",
    details: ["Summa Cum Laude"]
  }
];

export const PROJECTS = [
  {
    id: "p1",
    title: "Chorus",
    subtitle: "The Household OS",
    link: "https://example.com",
    repo: "https://github.com/baheckman/chorus"
  },
  {
    id: "p2",
    title: "Leaseworthy",
    subtitle: "Rate NYC Apartment Buildings",
    link: "https://leaseworthy.com",
    repo: "https://github.com/baheckman/leaseworthy"
  },
  {
    id: "p3",
    title: "SpotiTUI",
    subtitle: "Spotify TUI",
    link: "https://example.com",
    repo: "https://github.com/baheckman/spoti-tui"
  }
];

export const NOW_ACTIVITIES = [
  {
    emoji: "🔒",
    activity: "Building tools for engineers to work with databases and improving database systems at Abnormal",
    category: "WORK"
  },
  {
    emoji: "📚",
    activity: "Reading: Database Reliability Engineering",
    category: "LEARNING"
  },
  {
    emoji: "📚",
    activity: "Reading: Outer Dark - Cormac McCarthy",
    category: "READING"
  },
  {
    emoji: "🛠",
    activity: "Building a couple of Mobile app side projects using React Native",
    category: "SIDE PROJECT"
  },
  {
    emoji: "🎧",
    activity: "Listening to Darknet Diaries",
    category: "PODCAST"
  }
];

export const OPEN_SOURCE_AND_VOLUNTEERING = [
  {
    organization: "Pursuit",
    role: "Volunteer",
    description: "Volunteer teaching Software Development, AI, and Cybersecurity concepts to adults from underrepresented backgrounds looking to gain in demand skillsets to change career paths"
  },
  {
    organization: "NetworkX",
    role: "Open Source contributor",
    description: "Open Source contributor"
  }
];

