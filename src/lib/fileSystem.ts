// A simple in-memory file system structure
export type FileType = "file" | "folder";

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  content?: string; // For files
  children?: string[]; // For folders (list of IDs)
  icon?: string; // Optional icon override
  link?: string; // For link shortcuts
}

export interface FileSystem {
  [id: string]: FileNode;
}

export const initialFileSystem: FileSystem = {
  "root": {
    id: "root",
    name: "Root",
    type: "folder",
    children: ["home", "src"]
  },
  "src": {
    id: "src",
    name: "src",
    type: "folder",
    children: ["app-tsx", "main-tsx", "components-dir", "pages-dir", "lib-dir"]
  },
  "app-tsx": {
    id: "app-tsx",
    name: "App.tsx",
    type: "file",
    content: "import { BrowserRouter } from 'react-router-dom';\n\nconst App = () => {\n  return (\n    <BrowserRouter>\n      <Routes />\n    </BrowserRouter>\n  );\n};"
  },
  "main-tsx": {
    id: "main-tsx",
    name: "main.tsx",
    type: "file",
    content: "import ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')!).render(<App />);"
  },
  "components-dir": {
    id: "components-dir",
    name: "components",
    type: "folder",
    children: ["terminal-tsx", "cursor-tsx", "desktop-dir"]
  },
  "pages-dir": {
    id: "pages-dir",
    name: "pages",
    type: "folder",
    children: ["desktop-page-tsx", "index-page-tsx"]
  },
  "lib-dir": {
    id: "lib-dir",
    name: "lib",
    type: "folder",
    children: ["fs-ts"]
  },
  "terminal-tsx": {
    id: "terminal-tsx",
    name: "BrutalistTerminal.tsx",
    type: "file",
    content: "// The core terminal logic..."
  },
  "cursor-tsx": {
    id: "cursor-tsx",
    name: "CustomCursor.tsx",
    type: "file",
    content: "// Hardware reticle implementation..."
  },
  "desktop-dir": {
    id: "desktop-dir",
    name: "desktop",
    type: "folder",
    children: ["taskbar-tsx", "startmenu-tsx"]
  },
  "desktop-page-tsx": {
    id: "desktop-page-tsx",
    name: "Desktop.tsx",
    type: "file",
    content: "// The main desktop environment manager..."
  },
  "index-page-tsx": {
    id: "index-page-tsx",
    name: "Index.tsx",
    type: "file",
    content: "// Landing page..."
  },
  "fs-ts": {
    id: "fs-ts",
    name: "fileSystem.ts",
    type: "file",
    content: "// You are reading this file right now from the virtual FS!"
  },
  "taskbar-tsx": {
    id: "taskbar-tsx",
    name: "Taskbar.tsx",
    type: "file",
    content: "// GNOME-style top bar..."
  },
  "startmenu-tsx": {
    id: "startmenu-tsx",
    name: "StartMenu.tsx",
    type: "file",
    content: "// Applications launcher..."
  },
  "home": {
    id: "home",
    name: "home",
    type: "folder",
    children: ["guest"]
  },
  "guest": {
    id: "guest",
    name: "guest",
    type: "folder",
    children: ["desktop", "documents", "downloads", "pictures", "src-link"]
  },
  "src-link": {
    id: "src-link",
    name: "source-code",
    type: "folder", // Shortcut to src
    children: ["app-tsx", "main-tsx", "components-dir", "pages-dir"]
  },
  "desktop": {
    id: "desktop",
    name: "Desktop",
    type: "folder",
    children: ["project-1", "project-2", "resume-pdf", "welcome-txt", "education-txt", "experience-txt", "skills-txt"]
  },
  "documents": {
    id: "documents",
    name: "Documents",
    type: "folder",
    children: ["notes-txt"]
  },
  "downloads": {
    id: "downloads",
    name: "Downloads",
    type: "folder",
    children: []
  },
  "pictures": {
    id: "pictures",
    name: "Pictures",
    type: "folder",
    children: []
  },
  // Files
  "project-1": {
    id: "project-1",
    name: "Project Alpha",
    type: "folder", // Project as folder
    children: []
  },
  "project-2": {
    id: "project-2",
    name: "Project Beta",
    type: "folder",
    children: []
  },
  "resume-pdf": {
    id: "resume-pdf",
    name: "Resume.pdf",
    type: "file",
    icon: "file-text",
    link: "/resume.pdf"
  },
  "welcome-txt": {
    id: "welcome-txt",
    name: "README.txt",
    type: "file",
    content: "Welcome to DK_OS v4.0!\n\nThis is a fully interactive desktop environment.\nFeel free to explore.\n\n- David"
  },
  "notes-txt": {
    id: "notes-txt",
    name: "ideas.txt",
    type: "file",
    content: "TODO:\n- Take over the world\n- Drink coffee\n- Fix bugs"
  },
  "education-txt": {
    id: "education-txt",
    name: "Education.txt",
    type: "file",
    content: "EDUCATION HISTORY\n\n2018-2022: Computer Science, Tech University\n- Major: Software Engineering\n- GPA: 3.8\n\n2022: Angular Certification\n- Advanced Concepts & Architecture"
  },
  "experience-txt": {
    id: "experience-txt",
    name: "Experience.txt",
    type: "file",
    content: "WORK EXPERIENCE\n\n2023-Present: Senior Frontend Engineer\n- Leading Angular migration\n- Optimizing performance by 40%\n\n2021-2023: Web Developer\n- Built e-commerce platforms\n- React & Node.js stack"
  },
  "skills-txt": {
    id: "skills-txt",
    name: "Skills.txt",
    type: "file",
    content: "TECHNICAL SKILLS\n\n- Frontend: Angular, React, TypeScript, Tailwind\n- Backend: Node.js, Express, Python\n- Tools: Git, Docker, AWS, Figma"
  }
};
