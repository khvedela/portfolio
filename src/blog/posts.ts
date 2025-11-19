// Import markdown files as raw text
import angularPerformanceContent from "./angular-performance-optimization.md?raw";
import whyAngularContent from "./why-angular-for-enterprise.md?raw";
import bankingUIsContent from "./building-banking-uis.md?raw";
import angularSignalFormsContent from "./angular-signal-forms.md?raw";
import angularAriaContent from "./angular-aria-deep-dive.md?raw";

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
  mediumUrl?: string;
  readTime: number; // minutes
}

export const blogPosts: BlogPost[] = [
  {
    id: "angular-aria-deep-dive",
    title: "Angular ARIA: Building Accessible Components Without Losing Your Mind",
    date: "2025-11-19",
    tags: ["angular", "accessibility", "aria", "a11y"],
    excerpt:
      "A deep dive into Angular ARIA—the headless, accessible directives that handle keyboard navigation, focus management, and screen reader support. Build WCAG-compliant components with full styling control.",
    readTime: 10,
    mediumUrl: "",
    content: angularAriaContent,
  },
  {
    id: "angular-signal-forms",
    title: "First Look: Angular Signal Forms",
    date: "2025-11-19",
    tags: ["angular", "signals", "forms"],
    excerpt:
      "Say goodbye to boilerplate. A deep dive into Angular's new Signal Forms with comparison tables, real-world patterns, and live examples. Learn when to use them—and when not to.",
    readTime: 12,
    mediumUrl: "",
    content: angularSignalFormsContent,
  },
  {
    id: "angular-performance-optimization",
    title: "40% Faster: How I Optimized Our Angular Banking App",
    date: "2024-11-15",
    tags: ["angular", "performance", "optimization"],
    excerpt:
      "Load times matter in banking. Here's how I reduced our Angular app's initial load time from 4.2s to 2.5s - and why it mattered for 100k+ daily users.",
    readTime: 8,
    mediumUrl: "", // Add your Medium URL here
    content: angularPerformanceContent,
  },
  {
    id: "why-angular-for-enterprise",
    title: "Why I Still Choose Angular for Enterprise Apps (And When I Wouldn't)",
    date: "2024-10-22",
    tags: ["angular", "enterprise", "architecture"],
    excerpt:
      "React is trendy. Vue is lightweight. But for large teams building complex apps, Angular still wins. Here's why - and when it doesn't.",
    readTime: 6,
    mediumUrl: "", // Add your Medium URL here
    content: whyAngularContent,
  },
  {
    id: "building-banking-uis",
    title: "Building Banking UIs: What 4 Years Taught Me",
    date: "2024-09-10",
    tags: ["banking", "ux", "lessons"],
    excerpt:
      "Banking apps are different. Users trust you with their money. Here's what I learned building interfaces for 100k+ daily users.",
    readTime: 7,
    mediumUrl: "", // Add your Medium URL here
    content: bankingUIsContent,
  },
];

export const getBlogPost = (id: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};

export const getLatestPosts = (count: number = 3): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
};
