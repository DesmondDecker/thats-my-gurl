export type Post = {
  id: string;
  author: string;
  role: string;
  time: string;
  text: string;
  tag: string;
  likes: number;
  comments: number;
};

export type Opportunity = {
  id: string;
  org: string;
  role: string;
  kind: "Job" | "Internship" | "Fellowship" | "Grant";
  location: string;
  stipend: string;
  deadline: string;
  desc: string;
  skills: string[];
  applyUrl: string;
  featured?: boolean;
};

export type SupportSpace = {
  id: string;
  name: string;
  kind: "Platform" | "Scholarship" | "Bootcamp" | "Community";
  highlight: string;
  desc: string;
  perk: string;
  url: string;
  icon: string;
};

export type RealTalkReel = {
  id: string;
  title: string;
  creator: string;
  handle: string;
  category: "Code Hacks" | "Career Bag" | "Mindset" | "Design & AI";
  duration: string;
  color: string;
  accent: string;
  icon: string;
  lesson: string;
  funFact: string;
  actionTip: string;
  likesCount: number;
};

export const groups = [
  { id: "g1", name: "Tech Sisters", kind: "Coding & career", members: "1.2k", desc: "Ask questions, share projects, and grow your confidence in tech.", icon: "code" },
  { id: "g2", name: "Wellness Circle", kind: "Wellbeing", members: "846", desc: "Gentle check-ins, healthy boundaries, and support through busy weeks.", icon: "heart" },
  { id: "g3", name: "Study & Grow", kind: "Learning", members: "628", desc: "Study buddies, shared resources, and friendly accountability.", icon: "book-open" },
  { id: "g4", name: "Design Circle", kind: "Design", members: "410", desc: "A creative corner for UX, product design, and visual storytelling.", icon: "pen-tool" },
] as const;

export const events = [
  { id: "e1", day: "08", month: "NOV", title: "Wellness Circle: Managing Anxiety in Tech", when: "Sunday · 3:00 PM · Online", type: "Wellbeing", desc: "A gentle space to check in, share what is on your mind, and leave with one small intention." },
  { id: "e2", day: "12", month: "NOV", title: "Portfolio Power Hour", when: "Thursday · 5:30 PM · Online", type: "Workshop", desc: "Bring a project or idea and get friendly feedback from women in tech." },
  { id: "e3", day: "18", month: "NOV", title: "Starting Your First Tech Project", when: "Wednesday · 4:00 PM · Online", type: "Learning", desc: "Break a big idea into small steps and make a plan you can follow." },
];

export const opportunities: Opportunity[] = [
  {
    id: "op1",
    org: "Orange Digital Center",
    role: "Junior Web & Mobile Developer Intern",
    kind: "Internship",
    location: "Freetown / Hybrid",
    stipend: "Paid · Le 4,500/mo",
    deadline: "Nov 30, 2026",
    desc: "Hands-on 6-month digital skills internship working on real client apps with senior engineering mentorship.",
    skills: ["JavaScript", "React", "Mobile Basics"],
    applyUrl: "https://orangedigitalcenters.com",
    featured: true,
  },
  {
    id: "op2",
    org: "African Women in Tech (AWIT)",
    role: "Pan-African Tech Leadership Fellowship",
    kind: "Fellowship",
    location: "Remote (All Africa)",
    stipend: "$1,200 Equipment Grant",
    deadline: "Dec 15, 2026",
    desc: "12-week fellowship for aspiring female developers and designers. Includes laptop grant, AWS credits, and 1-on-1 global tech mentors.",
    skills: ["Python", "Product Management", "UI/UX"],
    applyUrl: "https://africanwomenintech.org",
    featured: true,
  },
  {
    id: "op3",
    org: "DSTI Sierra Leone",
    role: "Innovation Research & Data Fellow",
    kind: "Fellowship",
    location: "State House / Freetown",
    stipend: "Competitive Fellowship",
    deadline: "Nov 25, 2026",
    desc: "Work with the Directorate of Science, Technology & Innovation on public health & education data modeling.",
    skills: ["Data Analysis", "SQL", "Python"],
    applyUrl: "https://dsti.gov.sl",
  },
  {
    id: "op4",
    org: "Ventures Platform & SheLeads",
    role: "Female Founder Seed Pitch Grant",
    kind: "Grant",
    location: "West Africa / Online",
    stipend: "$10,000 Non-Dilutive Grant",
    deadline: "Jan 10, 2027",
    desc: "Early-stage grant support for African women building tech-enabled solutions in education, logistics, or fintech.",
    skills: ["Pitch Deck", "MVP", "Business Model"],
    applyUrl: "https://venturesplatform.com",
    featured: true,
  },
  {
    id: "op5",
    org: "AfriNova Solutions",
    role: "Frontend Engineer (React / TypeScript)",
    kind: "Job",
    location: "Remote (Sierra Leone & Nigeria)",
    stipend: "$800 - $1,400 / month",
    deadline: "Dec 05, 2026",
    desc: "Join a fast-growing African logistics platform building responsive web apps with modern React and clean APIs.",
    skills: ["React", "TypeScript", "REST APIs"],
    applyUrl: "https://afrinova.tech/careers",
  },
  {
    id: "op6",
    org: "SheCodes Foundation",
    role: "Women Coding Scholarship Batch 14",
    kind: "Internship",
    location: "100% Online",
    stipend: "Free Full Tuition ($1,500 value)",
    deadline: "Ongoing",
    desc: "100% funded coding scholarship teaching HTML, CSS, JavaScript, React, and responsive design for women in developing nations.",
    skills: ["HTML/CSS", "JavaScript", "React"],
    applyUrl: "https://shecodesfoundation.org",
  },
];

export const supportSpaces: SupportSpace[] = [
  {
    id: "sp1",
    name: "ALX Africa Tech Academy",
    kind: "Scholarship",
    highlight: "100% Sponsored Masterclasses",
    desc: "World-class programs in Software Engineering, Cloud Computing (AWS), and Data Analytics with career support.",
    perk: "Free tuition waiver for qualified African applicants",
    url: "https://alxafrica.com",
    icon: "award",
  },
  {
    id: "sp2",
    name: "Ingressive for Good (I4G)",
    kind: "Community",
    highlight: "Tech Scholarships & Laptops",
    desc: "Empowering African youth and women with tech micro-scholarships, Coursera/DataCamp licenses, and peer study groups.",
    perk: "Access to 10,000+ member peer Slack community",
    url: "https://ingressive.org",
    icon: "users",
  },
  {
    id: "sp3",
    name: "SheCodes Africa (SCA)",
    kind: "Bootcamp",
    highlight: "Women Mentorship Circles",
    desc: "Active community connecting female engineers, designers, and founders across 30+ African countries.",
    perk: "1-on-1 monthly mentorship pairing",
    url: "https://shecodesafrica.org",
    icon: "heart",
  },
  {
    id: "sp4",
    name: "freeCodeCamp & Open Learning",
    kind: "Platform",
    highlight: "Zero-Cost Certified Tracks",
    desc: "Completely free, interactive certifications in Responsive Web Design, Front End Development, and Python.",
    perk: "Verified certificates to put on your CV and LinkedIn",
    url: "https://freecodecamp.org",
    icon: "code",
  },
  {
    id: "sp5",
    name: "Google for Startups Africa",
    kind: "Community",
    highlight: "Founder Office Hours & Credits",
    desc: "Resources, equity-free funding, Google Cloud credits, and mentorship for early-stage African tech startups.",
    perk: "Direct access to Google tech leads & pitch clinics",
    url: "https://startup.google.com/programs/accelerator/africa",
    icon: "globe",
  },
];

export const realTalkReels: RealTalkReel[] = [
  {
    id: "r1",
    title: "CSS Explained like Cooking Jollof Rice 🍚",
    creator: "Aminata Codes",
    handle: "aminata_tech",
    category: "Code Hacks",
    duration: "0:45",
    color: "#F9D5E5",
    accent: "#E96E9B",
    icon: "code",
    lesson: "HTML is the raw rice and spices (the skeleton). CSS is the seasoning and presentation (making it look irresistible). JavaScript is the burner turning on (making it interactive!). Don't add style until your structure is ready.",
    funFact: "A missing semicolon in CSS won't crash the universe, but it will make your button wander off screen!",
    actionTip: "Always use CSS Flexbox (`display: flex; justify-content: center`) when you want things neat.",
    likesCount: 384,
  },
  {
    id: "r2",
    title: "Git vs GitHub in 40 Seconds ⏱️",
    creator: "Zainab Dev",
    handle: "zainab_builds",
    category: "Code Hacks",
    duration: "0:40",
    color: "#E2F0D9",
    accent: "#5C996B",
    icon: "git-commit",
    lesson: "Git is your personal time machine on your laptop (saving snapshots so you can undo mistakes). GitHub is Instagram for your code (cloud backup + letting teammates collaborate).",
    funFact: "`git status` is your best friend when you panic. It always tells you where you stand.",
    actionTip: "Commit small, commit often. Don't wait until Friday afternoon to commit 40 files!",
    likesCount: 512,
  },
  {
    id: "r3",
    title: "How to Ask for That Tech Salary Without Shaking 💼",
    creator: "Mariam J.",
    handle: "mariam_lead",
    category: "Career Bag",
    duration: "0:58",
    color: "#FCE4D6",
    accent: "#E07A5F",
    icon: "dollar-sign",
    lesson: "Never give a single flat number first. Give a research-backed range: 'Based on market benchmarks for this stack, roles in this tier range between X and Y. I'd love to align within that bracket.'",
    funFact: "Companies expect candidates to negotiate! Saying 'yes' immediately often leaves 15-20% on the table.",
    actionTip: "Practice your number out loud in front of a mirror 3 times so your voice sounds steady.",
    likesCount: 629,
  },
  {
    id: "r4",
    title: "Demystifying APIs with the Restaurant Analogy 🍽️",
    creator: "Fatima Systems",
    handle: "fatima_cloud",
    category: "Code Hacks",
    duration: "0:50",
    color: "#D9E1F2",
    accent: "#3D5A80",
    icon: "server",
    lesson: "You are the customer (Client/App). The kitchen is the database (where food/data lives). The waiter taking your order to the kitchen and bringing back your meal is the API! Simple as that.",
    funFact: "HTTP 404 just means the waiter told you 'Sorry, that dish isn't on the menu today!'",
    actionTip: "Test any free API with JSONPlaceholder or Postman before writing front-end code.",
    likesCount: 441,
  },
  {
    id: "r5",
    title: "Imposter Syndrome Buster: You DO Belong Here 👑",
    creator: "Kadiatou Inspires",
    handle: "kadiatou_glow",
    category: "Mindset",
    duration: "0:45",
    color: "#FFF2CC",
    accent: "#D4A373",
    icon: "star",
    lesson: "Senior engineers Google things 20 times a day too. Coding isn't about memorizing every syntax; it's about knowing how to solve problems and having the grit to keep debugging.",
    funFact: "Even the creator of Python checks documentation daily!",
    actionTip: "Keep a 'Brag Sheet' or 'Wins Journal' on your phone. Read it whenever doubt creeps in.",
    likesCount: 890,
  },
  {
    id: "r6",
    title: "3 AI Tools Every Female Founder Must Know 🤖",
    creator: "Isatu Founder",
    handle: "isatu_startups",
    category: "Design & AI",
    duration: "0:55",
    color: "#E8D7F1",
    accent: "#8B5FBF",
    icon: "cpu",
    lesson: "1) v0.dev for drafting UI mockups in seconds. 2) Claude/ChatGPT for proofreading pitch decks & contracts. 3) Perplexity for rapid market and competitor research.",
    funFact: "AI won't replace founders, but founders using AI will move 10x faster than those who don't.",
    actionTip: "Use AI to write your first draft, then inject your unique African story and human empathy.",
    likesCount: 715,
  },
];

// Fallback reels for backwards compatibility
export const reels = realTalkReels.map((r) => ({
  id: r.id,
  title: r.title,
  creator: r.handle,
  kind: r.category,
  color: r.color,
  icon: r.icon,
}));

export const learn = supportSpaces.map((s) => ({
  id: s.id,
  title: s.name,
  kind: s.kind,
  time: s.highlight,
  icon: s.icon,
}));

export const people = [
  { id: "aminata", name: "Aminata K." },
  { id: "mariam", name: "Mariam J." },
  { id: "zainab", name: "Zainab T." },
];

export const basePosts: Post[] = [
  {
    id: "p1",
    author: "Aminata K.",
    role: "Frontend developer",
    time: "2h ago",
    tag: "Career",
    text: "A reminder for the girl learning to code after work: slow progress is still progress. You do not have to know everything to belong here.",
    likes: 42,
    comments: 8,
  },
  {
    id: "p2",
    author: "Mariam J.",
    role: "UX designer",
    time: "4h ago",
    tag: "Wellbeing",
    text: "What is one small thing you did for yourself this week? Mine was taking a proper lunch break away from my laptop.",
    likes: 28,
    comments: 11,
  },
  {
    id: "p3",
    author: "Zainab T.",
    role: "Data analyst",
    time: "Yesterday",
    tag: "Learning",
    text: "Just finished my first hackathon! So grateful for this community. #TechSisters",
    likes: 64,
    comments: 15,
  },
];
