import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";
import Lesson from "./pages/Lesson";

const queryClient = new QueryClient();

// Detect hostname once at app level
const hostname = typeof window !== "undefined" ? window.location.hostname : "";
const isBlogHost = hostname.startsWith("blog.");
const isCoursesHost = hostname.startsWith("courses.");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Blog subdomain: blog.devdavid.me */}
            {isBlogHost && (
              <>
                <Route path="/" element={<BlogList />} />
                <Route path="/:id" element={<BlogPost />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}

            {/* Courses subdomain: courses.devdavid.me */}
            {isCoursesHost && (
              <>
                <Route path="/" element={<CourseList />} />
                <Route path="/:id" element={<CourseDetail />} />
                <Route
                  path="/:courseId/lessons/:lessonId"
                  element={<Lesson />}
                />
                <Route path="*" element={<NotFound />} />
              </>
            )}

            {/* Main domain: devdavid.me or www.devdavid.me */}
            {!isBlogHost && !isCoursesHost && (
              <>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route
                  path="/courses/:courseId/lessons/:lessonId"
                  element={<Lesson />}
                />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
