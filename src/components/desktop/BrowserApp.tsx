import { useState, useRef } from "react";
import { Search, ArrowLeft, ArrowRight, RotateCcw, Lock, XCircle, ExternalLink, Globe, Settings } from "lucide-react";
import { blogPosts } from "@/blog/posts";
import { courses } from "@/courses/courses";

export const BrowserApp = () => {
  const [url, setUrl] = useState("https://start.dk_os");
  const [displayUrl, setDisplayUrl] = useState("https://start.dk_os");
  const [history, setHistory] = useState<string[]>(["https://start.dk_os"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const navigate = (newUrl: string) => {
    setIsLoading(true);
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newUrl);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setUrl(newUrl);
    setDisplayUrl(newUrl);
    setTimeout(() => setIsLoading(false), 500); // Fake load
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const prev = history[historyIndex - 1];
      setUrl(prev);
      setDisplayUrl(prev);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const next = history[historyIndex + 1];
      setUrl(next);
      setDisplayUrl(next);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let input = displayUrl.trim();
    
    // Check if it's a URL or Search
    if (!input.includes(".") || input.includes(" ")) {
      // It's a search
      navigate(`search://q=${encodeURIComponent(input)}`);
    } else {
      // It's a URL
      if (!input.startsWith("http")) input = "https://" + input;
      navigate(input);
    }
  };

  const renderContent = () => {
    if (url.startsWith("search://")) {
      const query = decodeURIComponent(url.split("q=")[1] || "").toLowerCase();
      
      // SEARCH LOGIC
      const results = [
        ...blogPosts.map(p => ({ type: "Blog", title: p.title, desc: p.excerpt, link: `/blog/${p.id}`, score: 1 })),
        ...courses.map(c => ({ type: "Course", title: c.title, desc: c.description, link: `/courses/${c.id}`, score: 1 })),
      ].filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query)
      );

      return (
        <div className="flex-1 bg-white overflow-auto p-8 font-sans">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
               <Globe size={32} className="text-blue-600" />
               <h1 className="text-2xl text-gray-800">DK_Search</h1>
            </div>
            <p className="text-gray-500 mb-4">About {results.length} results (0.04 seconds)</p>
            
            {results.length === 0 && (
                <div className="text-gray-600">
                    <p>Your search - <b>{query}</b> - did not match any documents.</p>
                    <p className="mt-2">Suggestions:</p>
                    <ul className="list-disc ml-5 mt-1">
                        <li>Try "angular"</li>
                        <li>Try "performance"</li>
                        <li>Try "css"</li>
                    </ul>
                </div>
            )}

            <div className="space-y-6">
              {results.map((res, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                    {res.type === "Blog" ? "📰" : "🎓"} {res.type}
                  </div>
                  <div className="text-blue-800 text-xl font-medium hover:underline">{res.title}</div>
                  <div className="text-gray-600 text-sm leading-relaxed">{res.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (url === "https://start.dk_os") {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-800 font-sans">
                <Globe size={64} className="text-blue-600 mb-6" />
                <h1 className="text-4xl font-light mb-8">DK_Search</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    navigate(`search://q=${encodeURIComponent(displayUrl)}`);
                }} className="w-full max-w-md">
                    <div className="relative shadow-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 outline-none focus:border-blue-500 focus:shadow-md transition-all"
                            placeholder="Search the portfolio web..."
                            value={displayUrl === "https://start.dk_os" ? "" : displayUrl}
                            onChange={(e) => setDisplayUrl(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button type="submit" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700">Google Search</button>
                        <button type="button" onClick={() => navigate("https://en.wikipedia.org/wiki/Special:Random")} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700">I'm Feeling Lucky</button>
                    </div>
                </form>
            </div>
        );
    }

    // Real URL (iframe)
    return (
      <div className="flex-1 relative bg-white">
        {/* Security Warning Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
            <div className="text-center text-gray-400 opacity-50">
                <Lock size={48} className="mx-auto mb-2" />
                <p>Secure Connection Established</p>
            </div>
        </div>
        
        <iframe 
            ref={iframeRef}
            src={url} 
            className="absolute inset-0 w-full h-full border-none z-10 bg-white"
            title="Browser Content"
            sandbox="allow-scripts allow-same-origin allow-forms"
            onError={() => alert("Failed to load")}
        />
        
        {/* Fallback for blocked sites */}
        {/* We can't easily detect X-Frame-Options failure from JS, but we can show a hint */}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 font-sans text-gray-900">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-gray-200 border-b border-gray-300 shadow-sm">
        <div className="flex gap-1 mr-2">
            <button onClick={handleBack} disabled={historyIndex === 0} className="p-1.5 hover:bg-gray-300 rounded-full disabled:opacity-30 transition-colors">
                <ArrowLeft size={16} />
            </button>
            <button onClick={handleForward} disabled={historyIndex === history.length - 1} className="p-1.5 hover:bg-gray-300 rounded-full disabled:opacity-30 transition-colors">
                <ArrowRight size={16} />
            </button>
            <button onClick={() => setIsLoading(true)} className="p-1.5 hover:bg-gray-300 rounded-full transition-colors">
                <RotateCcw size={16} className={isLoading ? "animate-spin" : ""} />
            </button>
        </div>

        {/* Address Bar */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {url.startsWith("https") ? <Lock size={12} className="text-green-600" /> : <Search size={12} />}
            </div>
            <input 
                type="text" 
                value={displayUrl}
                onChange={(e) => setDisplayUrl(e.target.value)}
                onFocus={(e) => e.target.select()}
                className="w-full bg-white border border-gray-300 rounded-full py-1.5 pl-8 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
            />
        </form>

        <button className="p-2 hover:bg-gray-300 rounded-full text-gray-600">
            <Settings size={18} />
        </button>
      </div>

      {/* Main Content */}
      {renderContent()}
    </div>
  );
};
