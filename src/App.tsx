import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";
import Lesson from "./pages/Lesson";
import Desktop from "./pages/Desktop";
import SubdomainRedirect from "./components/SubdomainRedirect";
import CustomCursor from "./components/CustomCursor";
import CommandMenu from "./components/CommandMenu";
import LiveCodeBackground from "./components/LiveCodeBackground";
import BrutalistTerminal from "./components/BrutalistTerminal";
import { playSound } from "@/lib/audio";
import SystemTransition from "./components/SystemTransition";

const queryClient = new QueryClient();

// Detect hostname once at app level
const hostname = typeof window !== "undefined" ? window.location.hostname : "";
const isBlogHost = hostname.startsWith("blog.");
const isCoursesHost = hostname.startsWith("courses.");
const isDesktopHost = hostname.startsWith("desktop.");
const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

const AppContent = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    // Initial theme check
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const toggleMatrixMode = () => {
    setMatrixMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("matrix-mode");
        document.documentElement.classList.add("dark"); // Force dark
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("matrix-mode");
      }
      return next;
    });
  };

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K for Command Menu
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setMenuOpen((prev) => !prev);
        playSound('hover');
      }
      // Cmd+T for Theme (optional, but fun)
      if ((e.metaKey || e.ctrlKey) && e.key === "b" && e.shiftKey) { 
         e.preventDefault();
         toggleTheme();
         playSound('click');
      }
      // Cmd+D for Desktop Mode
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        navigate("/desktop");
        playSound('boot');
      }
      
      // Backtick for Terminal
      if (e.key === "`" || e.key === "~") {
        e.preventDefault(); // Prevent typing ` in inputs if not desired, though we might want to be careful here if user is typing in a form
        // Only toggle if we are NOT in an input/textarea, unless it's modifier+key
        const activeElement = document.activeElement as HTMLElement;
        const isInput = activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA");
        
        if (!isInput || e.metaKey || e.ctrlKey) {
           setTerminalOpen(prev => !prev);
           playSound('click');
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDark, navigate]); 

  return (
    <>
      <LiveCodeBackground isMatrix={matrixMode} />
      <CustomCursor />
      <SystemTransition />
      <BrutalistTerminal 
        isOpen={terminalOpen}
        onToggle={setTerminalOpen}
        onOpenCommandMenu={() => setMenuOpen(true)} 
        onNavigateToDesktop={() => navigate("/desktop")} 
      />
      <CommandMenu 
        open={menuOpen} 
        setOpen={setMenuOpen}  
        isDark={isDark} 
        toggleTheme={toggleTheme}
        toggleMatrix={toggleMatrixMode} 
      />
      <Toaster />
      <Sonner />
      
      <Routes>
        {/* Desktop subdomain: desktop.devdavid.me */}
        {isDesktopHost && (
          <>
            <Route path="/" element={<Desktop />} />
            <Route path="*" element={<Desktop />} />
          </>
        )}

        {/* Blog subdomain: blog.devdavid.me */}
        {isBlogHost && (
          <>
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}

        {/* Courses subdomain: courses.devdavid.me */}
        {isCoursesHost && (
          <>
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route
              path="/courses/:courseId/lessons/:lessonId"
              element={<Lesson />}
            />
            <Route path="*" element={<NotFound />} />
          </>
        )}

        {/* Main domain: devdavid.me or www.devdavid.me */}
        {!isBlogHost && !isCoursesHost && !isDesktopHost && (
          <>
            <Route path="/" element={<Index />} />
            
            {/* Desktop: Localhost direct access or Redirect */}
            <Route path="/desktop" element={isLocalhost ? <Desktop /> : <SubdomainRedirect subdomain="desktop" />} />

            {/* Blog: Localhost routes or Redirect */}
            {isLocalhost ? (
                <>
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                </>
            ) : (
                <Route path="/blog/*" element={<SubdomainRedirect subdomain="blog" />} />
            )}

            {/* Courses: Localhost routes or Redirect */}
            {isLocalhost ? (
                <>
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/courses/:id" element={<CourseDetail />} />
                    <Route path="/courses/:courseId/lessons/:lessonId" element={<Lesson />} />
                </>
            ) : (
                <Route path="/courses/*" element={<SubdomainRedirect subdomain="courses" />} />
            )}

            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
