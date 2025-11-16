import { motion } from "framer-motion";
import { Award, Download, X } from "lucide-react";
import { Course } from "@/courses/courses";

interface CourseCertificateProps {
  course: Course;
  studentName: string;
  onClose: () => void;
}

const CourseCertificate = ({
  course,
  studentName,
  onClose,
}: CourseCertificateProps) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownload = () => {
    const certificateElement = document.getElementById("certificate");
    if (!certificateElement) return;

    // Use html2canvas for better quality
    import("html2canvas").then((html2canvas) => {
      html2canvas
        .default(certificateElement, {
          scale: 2,
          backgroundColor: "#ffffff",
        })
        .then((canvas) => {
          const link = document.createElement("a");
          link.download = `certificate-${course.id}.png`;
          link.href = canvas.toDataURL();
          link.click();
        });
    });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-background max-w-4xl w-full relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-12 h-12 bg-foreground text-background border-3 border-foreground hover:bg-background hover:text-foreground transition-colors flex items-center justify-center"
        >
          <X size={24} />
        </button>

        {/* Certificate */}
        <div
          id="certificate"
          className="bg-background border-8 border-foreground p-12 md:p-16 relative"
        >
          {/* Header ornament */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-primary border-4 border-foreground flex items-center justify-center">
              <Award size={48} className="text-background" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 uppercase">
            Certificate of Completion
          </h1>

          <div className="w-32 h-1 bg-accent mx-auto mb-12"></div>

          {/* Body */}
          <div className="text-center mb-12 space-y-6 font-mono">
            <p className="text-lg">This certifies that</p>

            <div className="my-8">
              <p className="text-3xl font-bold mb-2">
                {studentName || "Student"}
              </p>
              <div className="w-64 h-0.5 bg-foreground/30 mx-auto"></div>
            </div>

            <p className="text-lg">has successfully completed</p>

            <p className="text-2xl font-bold text-primary my-6">
              {course.title}
            </p>

            <p className="text-sm text-muted-foreground">
              A comprehensive {course.difficulty} level course consisting of{" "}
              {course.lessons.length} lessons covering {course.tags.join(", ")}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between border-t-3 border-foreground/20 pt-8 font-mono">
            <div className="text-left">
              <p className="text-sm text-muted-foreground mb-2">
                Date Completed
              </p>
              <p className="font-bold">{currentDate}</p>
            </div>

            <div className="text-center">
              <div className="w-48 h-0.5 bg-foreground/30 mb-2"></div>
              <p className="text-sm font-bold">David Khvedelidze</p>
              <p className="text-xs text-muted-foreground">Instructor</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-2">Course ID</p>
              <p className="font-bold font-mono text-xs">
                {course.id.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Decorative corners - inside certificate for proper positioning */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-accent"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-accent"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-accent"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-accent"></div>
        </div>

        {/* Download button */}
        <div className="p-6 border-t-4 border-foreground bg-muted">
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm text-muted-foreground">
              Congratulations on completing the course! 🎉
            </p>
            <motion.button
              onClick={handleDownload}
              className="border-3 border-foreground bg-primary text-background px-6 py-3 font-mono font-bold hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Download Certificate
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseCertificate;
