import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";
import Lesson from "./pages/Lesson";

const queryClient = new QueryClient();

const SubdomainRouter = () => {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    // Extract subdomain (e.g., "blog" from "blog.devdavid.me")
    const parts = hostname.split(".");

    // Check if we have a subdomain (more than 2 parts for .me TLD)
    if (parts.length > 2) {
      const sub = parts[0];
      if (sub === "blog" || sub === "courses") {
        setSubdomain(sub);
      }
    }
  }, []);

  // If subdomain detected, redirect to appropriate route
  if (subdomain === "blog") {
    return <Navigate to="/blog" replace />;
  }

  if (subdomain === "courses") {
    return <Navigate to="/courses" replace />;
  }

  return (
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
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SubdomainRouter />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
