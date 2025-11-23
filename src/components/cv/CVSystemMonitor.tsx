import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, GitMerge, Star, Activity } from "lucide-react";

interface GithubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: any;
}

const CVSystemMonitor = () => {
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [simulatedStats, setStats] = useState({ cpu: 12, mem: 45 });

  useEffect(() => {
    // Simulate system stats
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 30) + 10,
        mem: Math.floor(Math.random() * 10) + 40,
      });
    }, 2000);

    // Fetch GitHub events
    const fetchGithub = async () => {
      try {
        const res = await fetch('https://api.github.com/users/khvedelidzedavid/events?per_page=5');
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        } else {
          // Fallback fake data if API limit hit
          setEvents([
            { id: '1', type: 'PushEvent', repo: { name: 'david/paris-angular-drive' }, created_at: new Date().toISOString() },
            { id: '2', type: 'CreateEvent', repo: { name: 'david/ng-brutalist' }, created_at: new Date(Date.now() - 3600000).toISOString() },
            { id: '3', type: 'WatchEvent', repo: { name: 'angular/angular' }, created_at: new Date(Date.now() - 7200000).toISOString() },
          ]);
        }
      } catch (e) {
        console.error("Github fetch failed", e);
      } finally {
        setLoading(false);
      }
    };

    fetchGithub();
    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent': return <GitCommit size={14} className="text-success" />;
      case 'PullRequestEvent': return <GitPullRequest size={14} className="text-primary" />;
      case 'CreateEvent': return <GitMerge size={14} className="text-accent" />;
      case 'WatchEvent': return <Star size={14} className="text-yellow-400" />;
      default: return <Activity size={14} className="text-muted-foreground" />;
    }
  };

  const formatTime = (iso: string) => {
    const date = new Date(iso);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="border-2 border-foreground bg-card/80 backdrop-blur-md p-4 font-mono text-xs relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-foreground/20 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="font-bold">NEURAL_LINK_V.1</span>
        </div>
        <div className="text-muted-foreground">GH_API::CONNECTED</div>
      </div>

      {/* Stats Bar */}
      <div className="flex gap-4 mb-4 opacity-70">
        <div>CPU: {simulatedStats.cpu}%</div>
        <div>MEM: {simulatedStats.mem}%</div>
        <div>UPTIME: 42h 12m</div>
      </div>

      {/* Event Log */}
      <div className="space-y-2">
        {loading ? (
          <div className="animate-pulse">ESTABLISHING UPLINK...</div>
        ) : (
          events.slice(0, 4).map((event) => (
            <div key={event.id} className="flex gap-3 items-start group/item hover:bg-foreground/5 p-1 transition-colors">
              <div className="mt-0.5 shrink-0">{getEventIcon(event.type)}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-bold text-primary">
                  {event.type.replace('Event', '').toUpperCase()}
                </div>
                <div className="truncate text-muted-foreground text-[10px]">
                  {event.repo.name}
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground shrink-0">
                {formatTime(event.created_at)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Decoration */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent" />
    </motion.div>
  );
};

export default CVSystemMonitor;
