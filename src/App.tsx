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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route
              path="/courses/:courseId/lessons/:lessonId"
              element={<Lesson />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
