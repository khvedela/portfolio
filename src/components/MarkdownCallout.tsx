import { AlertCircle, Info, Lightbulb, AlertTriangle } from "lucide-react";

interface MarkdownCalloutProps {
  type: "note" | "tip" | "warning" | "info";
  children: React.ReactNode;
}

const MarkdownCallout = ({ type, children }: MarkdownCalloutProps) => {
  const config = {
    note: {
      icon: Info,
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-500",
      iconColor: "text-blue-500",
      title: "NOTE",
    },
    tip: {
      icon: Lightbulb,
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-500",
      iconColor: "text-green-500",
      title: "TIP",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-orange-50 dark:bg-orange-950/30",
      border: "border-orange-500",
      iconColor: "text-orange-500",
      title: "WARNING",
    },
    info: {
      icon: AlertCircle,
      bg: "bg-purple-50 dark:bg-purple-950/30",
      border: "border-purple-500",
      iconColor: "text-purple-500",
      title: "KEY TAKEAWAYS",
    },
  };

  const { icon: Icon, bg, border, iconColor, title } = config[type];

  return (
    <div
      className={`${bg} border-l-6 ${border} p-6 my-6 font-mono text-sm leading-relaxed`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`${iconColor} flex-shrink-0 mt-1`} size={20} />
        <div className="flex-1">
          <div className={`font-bold ${iconColor} mb-2`}>{title}</div>
          <div className="text-foreground/90">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownCallout;
