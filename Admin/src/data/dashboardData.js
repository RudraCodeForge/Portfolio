export const dashboardStats = [
  {
    label: "Projects shipped",
    value: "24+",
    trend: "+12%",
    icon: "briefcase",
    tone: "success",
  },
  {
    label: "Technologies",
    value: "18",
    trend: "+2 this month",
    icon: "code",
    tone: "success",
  },
  {
    label: "Years of craft",
    value: "4+",
    trend: "Growing",
    icon: "pulse",
    tone: "success",
  },
  {
    label: "Unread messages",
    value: "12",
    trend: "Needs attention",
    icon: "mail",
    tone: "warning",
  },
];

export const recentActivity = [
  {
    title: "New contact message received",
    description: "Alex Morgan sent you a message",
    time: "12 min ago",
    icon: "mail",
    tone: "mint",
  },
  {
    title: 'Project "DromStays" updated',
    description: "Added new case study details",
    time: "2 hours ago",
    icon: "code",
    tone: "blue",
  },
  {
    title: "Experience information updated",
    description: "Senior Product Engineer at Vercel",
    time: "Yesterday",
    icon: "briefcase",
    tone: "yellow",
  },
  {
    title: "New skill added to profile",
    description: "React and Node.js added to skills",
    time: "Yesterday",
    icon: "code",
    tone: "blue",
  },
  {
    title: "Education details refreshed",
    description: "Updated degree and graduation year",
    time: "2 days ago",
    icon: "education",
    tone: "mint",
  },
  {
    title: "Portfolio settings updated",
    description: "Public profile visibility was changed",
    time: "3 days ago",
    icon: "settings",
    tone: "yellow",
  },
];

export const quickActions = [
  { label: "Add Project", icon: "briefcase", featured: true },
  { label: "Add Experience", icon: "pulse" },
  { label: "Add Education", icon: "education" },
  { label: "Add Skill", icon: "code" },
];

export const navItems = [
  { label: "Dashboard", icon: "grid", path: "/dashboard" },
  { label: "Projects", icon: "briefcase", path: "/projects" },
  { label: "Experience", icon: "pulse", path: "/experience" },
  { label: "Education", icon: "education", path: "/education" },
  { label: "Skills", icon: "code", path: "/skills" },
  { label: "Messages", icon: "mail", path: "/messages", badge: 12 },
  { label: "Settings", icon: "settings", path: "/settings" },
];

export const sectionViews = {
  Dashboard: {
    subtitle: "Here's what's happening with your portfolio.",
    action: "Add new project",
    stats: dashboardStats,
    activities: recentActivity,
    actions: quickActions,
  },
  Projects: {
    subtitle: "Review and manage every project in your portfolio.",
    action: "Add new project",
    stats: [
      {
        label: "Published projects",
        value: "24",
        trend: "+12%",
        icon: "briefcase",
        tone: "success",
      },
      {
        label: "In progress",
        value: "03",
        trend: "Active",
        icon: "pulse",
        tone: "success",
      },
      {
        label: "Technologies used",
        value: "18",
        trend: "+2 this month",
        icon: "code",
        tone: "success",
      },
      {
        label: "Draft projects",
        value: "05",
        trend: "Review",
        icon: "mail",
        tone: "warning",
      },
    ],
    activities: recentActivity,
    actions: quickActions,
  },
  Experience: {
    subtitle: "Keep your professional journey current and clear.",
    action: "Add experience",
    stats: [
      {
        label: "Total roles",
        value: "06",
        trend: "Growing",
        icon: "briefcase",
        tone: "success",
      },
      {
        label: "Years of craft",
        value: "4+",
        trend: "+1 this year",
        icon: "pulse",
        tone: "success",
      },
      {
        label: "Companies",
        value: "04",
        trend: "Verified",
        icon: "shield",
        tone: "success",
      },
      {
        label: "Latest update",
        value: "12d",
        trend: "On track",
        icon: "mail",
        tone: "warning",
      },
    ],
    activities: recentActivity,
    actions: [
      { label: "Add experience", icon: "briefcase", featured: true },
      ...quickActions.slice(2),
    ],
  },
  Education: {
    subtitle: "Manage your education and learning milestones.",
    action: "Add education",
    stats: [
      {
        label: "Qualifications",
        value: "03",
        trend: "Complete",
        icon: "education",
        tone: "success",
      },
      {
        label: "Certifications",
        value: "08",
        trend: "+2 this year",
        icon: "shield",
        tone: "success",
      },
      {
        label: "Learning hours",
        value: "240+",
        trend: "Growing",
        icon: "pulse",
        tone: "success",
      },
      {
        label: "Draft entries",
        value: "01",
        trend: "Needs attention",
        icon: "mail",
        tone: "warning",
      },
    ],
    activities: recentActivity,
    actions: [
      { label: "Add education", icon: "education", featured: true },
      ...quickActions.slice(2),
    ],
  },
  Skills: {
    subtitle: "Shape the toolkit behind your best work.",
    action: "Add skill",
    stats: [
      {
        label: "Total skills",
        value: "18",
        trend: "+2 this month",
        icon: "code",
        tone: "success",
      },
      {
        label: "Frontend",
        value: "08",
        trend: "Strong",
        icon: "grid",
        tone: "success",
      },
      {
        label: "Backend",
        value: "06",
        trend: "Growing",
        icon: "pulse",
        tone: "success",
      },
      {
        label: "Tools",
        value: "04",
        trend: "Up to date",
        icon: "settings",
        tone: "warning",
      },
    ],
    activities: recentActivity,
    actions: [
      { label: "Add skill", icon: "code", featured: true },
      ...quickActions.slice(0, 2),
    ],
  },
  Messages: {
    subtitle: "Stay close to the people reaching out about your work.",
    action: "View messages",
    stats: [
      {
        label: "Unread messages",
        value: "12",
        trend: "Needs attention",
        icon: "mail",
        tone: "warning",
      },
      {
        label: "This week",
        value: "18",
        trend: "+4 this week",
        icon: "pulse",
        tone: "success",
      },
      {
        label: "Replied",
        value: "86%",
        trend: "Healthy",
        icon: "shield",
        tone: "success",
      },
      {
        label: "Avg. response",
        value: "4h",
        trend: "Improving",
        icon: "briefcase",
        tone: "success",
      },
    ],
    activities: recentActivity,
    actions: [
      { label: "View messages", icon: "mail", featured: true },
      ...quickActions.slice(0, 1),
    ],
  },
  Settings: {
    subtitle: "Tune your workspace and public portfolio settings.",
    action: "Save settings",
    stats: [
      {
        label: "Profile completion",
        value: "92%",
        trend: "+8% this month",
        icon: "shield",
        tone: "success",
      },
      {
        label: "Public sections",
        value: "07",
        trend: "Visible",
        icon: "grid",
        tone: "success",
      },
      {
        label: "Last backup",
        value: "2d",
        trend: "Up to date",
        icon: "settings",
        tone: "success",
      },
      {
        label: "Pending changes",
        value: "02",
        trend: "Review",
        icon: "mail",
        tone: "warning",
      },
    ],
    activities: recentActivity,
    actions: [
      { label: "Save settings", icon: "settings", featured: true },
      ...quickActions.slice(0, 1),
    ],
  },
};
