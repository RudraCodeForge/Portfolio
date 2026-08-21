export const ProjectsData = [
  {
    ProjectImage: "",
    LiveLink: "https://rudracodeforge.github.io/PRINCEDAKSH/",
    Catagory: "OTHER",
    Note: "2.4k active users",
    Title: "My first portfolio",
    Description:
      "A clean personal portfolio built to share work, skills, and ideas.",
    TechStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    ProjectImage: "",
    LiveLink: "#",
    Catagory: "MERN",
    Note: "$180k processed",
    Title: "Atlas commerce",
    Description:
      "A flexible commerce platform with real-time inventory and checkout flows.",
    TechStack: ["React", "Express", "Stripe"],
  },
  {
    ProjectImage: "",
    LiveLink: "#",
    Catagory: "OTHER",
    Note: "36% faster insights",
    Title: "Pulse analytics",
    Description:
      "A high-signal analytics dashboard for teams that need answers quickly.",
    TechStack: ["React", "D3.js", "REST API"],
  },
  {
    ProjectImage: "",
    LiveLink: "#",
    Catagory: "REACT",
    Note: "12k tasks organized",
    Title: "Orbit workspace",
    Description:
      "A focused project workspace for planning launches without the clutter.",
    TechStack: ["React", "TypeScript", "Firebase"],
  },
  {
    ProjectImage: "",
    LiveLink: "#",
    Catagory: "FULL STACK",
    Note: "4.8/5 user rating",
    Title: "Cove bookings",
    Description:
      "A fast reservation experience for independent stays and local hosts.",
    TechStack: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    ProjectImage: "",
    LiveLink: "#",
    Catagory: "MERN",
    Note: "8k monthly orders",
    Title: "Market lane",
    Description:
      "A marketplace toolkit that helps small sellers launch and grow online.",
    TechStack: ["MongoDB", "Express", "React"],
  },
  {
    ProjectImage: "",
    LiveLink: "#",
    Catagory: "OTHER",
    Note: "62% less admin time",
    Title: "Ledger light",
    Description:
      "A simple finance console for tracking invoices, expenses, and cash flow.",
    TechStack: ["Vue", "Supabase", "Chart.js"],
  },
  {
    ProjectImage: "",
    LiveLink: "#",
    Catagory: "FULL STACK",
    Note: "18k messages delivered",
    Title: "Relay support",
    Description:
      "A shared inbox that keeps customer conversations clear and actionable.",
    TechStack: ["Node.js", "WebSockets", "Redis"],
  },
  {
    ProjectImage: "",
    LiveLink: "#",
    Catagory: "REACT",
    Note: "94 Lighthouse score",
    Title: "Field notes",
    Description:
      "An offline-friendly notes app for collecting ideas wherever work happens.",
    TechStack: ["React", "PWA", "IndexedDB"],
  },
  {
    ProjectImage: "",
    LiveLink: "#",
    Catagory: "MERN",
    Note: "3.1k active teams",
    Title: "Signal CRM",
    Description:
      "A compact relationship manager built around the work sales teams actually do.",
    TechStack: ["MongoDB", "React", "JWT Auth"],
  },
  ...Array.from({ length: 18 }, (_, index) => {
    const projects = [
      [
        "MERN",
        "Canvas board",
        "A collaborative board for turning rough ideas into clear plans.",
        ["React", "Node.js", "MongoDB"],
      ],
      [
        "FULL STACK",
        "Northstar docs",
        "A searchable documentation hub for growing product teams.",
        ["Next.js", "MDX", "PostgreSQL"],
      ],
      [
        "REACT",
        "Tempo player",
        "A crisp music workspace for playlists, practice, and discovery.",
        ["React", "Web Audio", "Vite"],
      ],
      [
        "OTHER",
        "Greenroom",
        "A lightweight content calendar that makes publishing feel calm.",
        ["Svelte", "Supabase", "CSS"],
      ],
      [
        "MERN",
        "Parcel track",
        "A live delivery view that gives customers useful updates at a glance.",
        ["Express", "React", "Mapbox"],
      ],
    ];
    const [category, title, description, techStack] =
      projects[index % projects.length];

    return {
      ProjectImage: "",
      LiveLink: "#",
      Catagory: category,
      Note: `${(index + 2) * 7}% smoother workflow`,
      Title: `${title} ${index + 1}`,
      Description: description,
      TechStack: techStack,
    };
  }),
  {
    ProjectImage: "",
    LiveLink: "#",
    Catagory: "FULL STACK",
    Note: "27k records synced",
    Title: "Harbor inventory",
    Description:
      "A dependable inventory system for distributed teams and growing catalogs.",
    TechStack: ["Node.js", "PostgreSQL", "AWS"],
  },
  {
    ProjectImage: "",
    LiveLink: "#",
    Catagory: "OTHER",
    Note: "41% higher completion",
    Title: "Mosaic forms",
    Description:
      "A thoughtful form builder designed to make complex workflows feel simple.",
    TechStack: ["JavaScript", "CSS", "REST API"],
  },
];
