import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Post } from "./data";
import { AuthUser, apiSignup, apiLogin } from "./api";

const KEY = "tmg-v4";
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const today = () => new Date().toLocaleDateString();

export type Msg = { id: string; text: string; mine: boolean; time?: string };
export type Mood = { id: string; mood: string; note: string; date: string };
export type Entry = { id: string; title: string; body: string; date: string; tag: string; shared: boolean };
export type Profile = { name: string; role: string; bio: string };

export type Milestone = {
  id: string;
  title: string;
  category: string;
  done: boolean;
};

export type IndividualGrowth = {
  streak: number;
  hoursLearned: number;
  skills: string[];
  milestones: Milestone[];
  lastCheckInDate?: string;
};

export type CompanyGrowth = {
  companyName: string;
  stage: string;
  pitchReady: boolean;
  teamSize: number;
  targetMetric: string;
  milestones: Milestone[];
};

export type State = {
  posts: Post[];
  likes: string[];
  joined: string[];
  saved: string[];
  savedOpportunities: string[];
  likedReels: string[];
  moods: Mood[];
  journal: Entry[];
  messages: Record<string, Msg[]>;
  botMessages: Msg[];
  profile: Profile;
  user: AuthUser | null;
  individualGrowth: IndividualGrowth;
  companyGrowth: CompanyGrowth;
};

const initialBotMessages: Msg[] = [
  {
    id: "b1",
    mine: false,
    text: "Hey sister! 💗 I'm That's My Girl Bot — your 24/7 cheerleader, career navigator, and tech mentor.\n\nWhether you need resume tips, tech roadmap ideas, interview hype, or founder pitch guidance, ask me anything!",
    time: "Just now",
  },
];

const initialIndividualMilestones: Milestone[] = [
  { id: "im1", title: "Complete HTML & CSS portfolio project", category: "Technical", done: true },
  { id: "im2", title: "Apply to first tech internship or fellowship", category: "Career", done: false },
  { id: "im3", title: "Contribute to an open-source project", category: "Technical", done: false },
  { id: "im4", title: "Master Git and push 10 GitHub commits", category: "Technical", done: true },
  { id: "im5", title: "Conduct 1 mock tech salary negotiation", category: "Career", done: false },
  { id: "im6", title: "Share a learning breakthrough in the Journal", category: "Community", done: false },
];

const initialCompanyMilestones: Milestone[] = [
  { id: "cm1", title: "Validate customer problem with 10 user interviews", category: "Validation", done: true },
  { id: "cm2", title: "Build clickable MVP or prototype", category: "Product", done: false },
  { id: "cm3", title: "Prepare 10-slide investor & grant pitch deck", category: "Fundraising", done: false },
  { id: "cm4", title: "Apply to Female Founder Seed Grant", category: "Fundraising", done: false },
  { id: "cm5", title: "Onboard first 50 beta test users", category: "Growth", done: false },
];

const initial: State = {
  posts: [],
  likes: [],
  joined: ["g1"],
  saved: [],
  savedOpportunities: ["op1", "op4"],
  likedReels: ["r1", "r5"],
  moods: [],
  journal: [
    {
      id: "j1",
      title: "Built my first responsive navigation bar!",
      body: "I spent 3 days fighting CSS Flexbox and media queries, but today it finally clicked! Mobile and desktop layouts look so clean. Celebrating this small win! 🚀",
      date: today(),
      tag: "Code Breakthrough",
      shared: true,
    },
  ],
  messages: {
    aminata: [{ id: "m1", mine: false, text: "Hey sis! Welcome to the community 💗 What are you working on this week?" }],
    mariam: [{ id: "m2", mine: false, text: "Let's catch up later 💗" }],
    zainab: [{ id: "m3", mine: false, text: "Great ideas everyone!" }],
  },
  botMessages: initialBotMessages,
  user: null,
  profile: { name: "Your Name", role: "Women in tech", bio: "Learning, growing, and finding my people." },
  individualGrowth: {
    streak: 5,
    hoursLearned: 18,
    skills: ["HTML/CSS", "JavaScript", "Git & GitHub", "UI/UX Basics"],
    milestones: initialIndividualMilestones,
    lastCheckInDate: today(),
  },
  companyGrowth: {
    companyName: "EmpowerTech Salone",
    stage: "Prototype / MVP",
    pitchReady: false,
    teamSize: 2,
    targetMetric: "50 Beta Users",
    milestones: initialCompanyMilestones,
  },
};

const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

function build(state: State, setState: React.Dispatch<React.SetStateAction<State>>) {
  const set = (fn: (s: State) => Partial<State>) => setState((s) => ({ ...s, ...fn(s) }));
  return {
    ...state,
    addPost: (text: string, tag: string) =>
      set((s) => ({
        posts: [{ id: uid(), author: s.profile.name, role: s.profile.role, time: "Just now", text, tag, likes: 0, comments: 0 }, ...s.posts],
      })),
    toggleLike: (id: string) => set((s) => ({ likes: toggle(s.likes, id) })),
    toggleJoin: (id: string) => set((s) => ({ joined: toggle(s.joined, id) })),
    toggleSave: (id: string) => set((s) => ({ saved: toggle(s.saved, id) })),
    toggleSaveOpportunity: (id: string) => set((s) => ({ savedOpportunities: toggle(s.savedOpportunities, id) })),
    toggleLikeReel: (id: string) => set((s) => ({ likedReels: toggle(s.likedReels, id) })),
    addMood: (mood: string, note: string) => set((s) => ({ moods: [{ id: uid(), mood, note, date: today() }, ...s.moods] })),
    addJournal: (title: string, body: string, tag = "Growth Win", shared = false) =>
      set((s) => {
        const newEntry: Entry = { id: uid(), title, body, date: today(), tag, shared };
        const newPosts = shared
          ? [
              {
                id: uid(),
                author: s.profile.name,
                role: s.profile.role,
                time: "Just now",
                tag: "Growth Story",
                text: `✨ Growth Journal Entry: "${title}"\n\n${body}`,
                likes: 1,
                comments: 0,
              },
              ...s.posts,
            ]
          : s.posts;
        return {
          journal: [newEntry, ...s.journal],
          posts: newPosts,
        };
      }),
    deleteJournal: (id: string) => set((s) => ({ journal: s.journal.filter((j) => j.id !== id) })),
    addMessage: (who: string, text: string) =>
      set((s) => ({ messages: { ...s.messages, [who]: [...(s.messages[who] || []), { id: uid(), text, mine: true }] } })),
    addBotMessage: (text: string, mine = true) =>
      set((s) => ({
        botMessages: [...s.botMessages, { id: uid(), text, mine, time: "Just now" }],
      })),
    resetBot: () => set(() => ({ botMessages: initialBotMessages })),
    checkInToday: () =>
      set((s) => {
        const isToday = s.individualGrowth.lastCheckInDate === today();
        const newStreak = isToday ? s.individualGrowth.streak : s.individualGrowth.streak + 1;
        return {
          individualGrowth: {
            ...s.individualGrowth,
            streak: newStreak,
            lastCheckInDate: today(),
          },
        };
      }),
    toggleSkill: (skill: string) =>
      set((s) => {
        const skills = toggle(s.individualGrowth.skills, skill);
        return {
          individualGrowth: { ...s.individualGrowth, skills },
        };
      }),
    toggleMilestone: (type: "individual" | "company", id: string) =>
      set((s) => {
        if (type === "individual") {
          const milestones = s.individualGrowth.milestones.map((m) => (m.id === id ? { ...m, done: !m.done } : m));
          return { individualGrowth: { ...s.individualGrowth, milestones } };
        } else {
          const milestones = s.companyGrowth.milestones.map((m) => (m.id === id ? { ...m, done: !m.done } : m));
          return { companyGrowth: { ...s.companyGrowth, milestones } };
        }
      }),
    addMilestone: (type: "individual" | "company", title: string, category: string) =>
      set((s) => {
        const item: Milestone = { id: uid(), title, category, done: false };
        if (type === "individual") {
          return { individualGrowth: { ...s.individualGrowth, milestones: [...s.individualGrowth.milestones, item] } };
        } else {
          return { companyGrowth: { ...s.companyGrowth, milestones: [...s.companyGrowth.milestones, item] } };
        }
      }),
    updateIndividualGrowth: (p: Partial<IndividualGrowth>) =>
      set((s) => ({ individualGrowth: { ...s.individualGrowth, ...p } })),
    updateCompanyGrowth: (p: Partial<CompanyGrowth>) =>
      set((s) => ({ companyGrowth: { ...s.companyGrowth, ...p } })),
    setProfile: (p: Partial<Profile>) => set((s) => ({ profile: { ...s.profile, ...p } })),
    login: async (email: string, pass: string) => {
      const u = await apiLogin(email, pass);
      set((s) => ({
        user: u,
        profile: { ...s.profile, name: u.name, role: u.role || s.profile.role },
      }));
      return u;
    },
    signup: async (name: string, email: string, pass: string, role: string) => {
      const u = await apiSignup(name, email, pass, role);
      set((s) => ({
        user: u,
        profile: { ...s.profile, name: u.name, role: u.role || s.profile.role },
      }));
      return u;
    },
    logout: () => set(() => ({ user: null })),
    reset: () => setState(initial),
  };
}

type Ctx = ReturnType<typeof build>;
const Context = createContext<Ctx>(null as any);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (raw) {
          const parsed = JSON.parse(raw);
          setState({
            ...initial,
            ...parsed,
            individualGrowth: { ...initial.individualGrowth, ...(parsed.individualGrowth || {}) },
            companyGrowth: { ...initial.companyGrowth, ...(parsed.companyGrowth || {}) },
          });
        }
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => {});
  }, [state, ready]);

  if (!ready) return null;
  return <Context.Provider value={build(state, setState)}>{children}</Context.Provider>;
}

export const useApp = () => useContext(Context);
