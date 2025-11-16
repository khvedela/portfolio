import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Download,
  X,
  Twitter,
  Linkedin,
  Facebook,
  Share2,
  Copy,
} from "lucide-react";
import { Course } from "@/courses/courses";
import { useState } from "react";

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
  const [showClipboardNotice, setShowClipboardNotice] = useState(false);

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

  const shareText = `I just completed "${course.title}" by David Khvedelidze! 🎉`;
  const shareUrl = window.location.origin;

  const handleTwitterShare = () => {
    const tweetText = `🎓 Just completed "${course.title}" by @khvedelidze!\n\n${course.lessons.length} lessons ✅\nFree learning 🚀\n\nCheck it out: ${shareUrl}\n\n#LearnToCode #WebDevelopment #${course.tags[0]}`;

    // Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tweetText).then(() => {
        setShowClipboardNotice(true);
        setTimeout(() => setShowClipboardNotice(false), 4000);
      });
    }

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const handleLinkedInShare = () => {
    const linkedInText = `🎓 Just completed "${course.title}" by David Khvedelidze!\n\n${course.lessons.length} lessons of ${course.difficulty} level content ✅\nFree learning resources 🚀\n\nCheck it out: ${shareUrl}\n\n#LearnToCode #WebDevelopment #${course.tags[0]}`;

    // Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(linkedInText).then(() => {
        setShowClipboardNotice(true);
        setTimeout(() => setShowClipboardNotice(false), 4000);
      });
    }

    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const handleFacebookShare = () => {
    const facebookText = `🎓 Just completed "${course.title}" by David Khvedelidze!\n\n${course.lessons.length} lessons ✅\nFree learning 🚀\n\nCheck it out: ${shareUrl}\n\n#LearnToCode #WebDevelopment`;

    // Copy to clipboard and show notification
    if (navigator.clipboard) {
      navigator.clipboard.writeText(facebookText).then(() => {
        setShowClipboardNotice(true);
        setTimeout(() => setShowClipboardNotice(false), 4000);
      });
    }

    // Open Facebook share dialog
    const shareUrl2 = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(shareUrl2, "_blank", "width=550,height=420");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Completed: ${course.title}`,
          text: `🎓 I just completed "${course.title}" by David Khvedela! ${course.lessons.length} lessons ✅`,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-background max-w-4xl w-full relative my-auto"
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
          className="bg-background border-4 md:border-8 border-foreground p-6 md:p-12 lg:p-16 relative"
        >
          {/* Header ornament */}
          <div className="flex items-center justify-center mb-4 md:mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary border-3 md:border-4 border-foreground flex items-center justify-center">
              <Award size={36} className="text-background md:w-12 md:h-12" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-center mb-3 md:mb-4 uppercase leading-tight">
            Certificate of Completion
          </h1>

          <div className="w-24 md:w-32 h-1 bg-accent mx-auto mb-6 md:mb-12"></div>

          {/* Body */}
          <div className="text-center mb-6 md:mb-12 space-y-3 md:space-y-6 font-mono">
            <p className="text-sm md:text-lg">This certifies that</p>

            <div className="my-4 md:my-8">
              <p className="text-xl md:text-3xl font-bold mb-2">
                {studentName || "Student"}
              </p>
              <div className="w-48 md:w-64 h-0.5 bg-foreground/30 mx-auto"></div>
            </div>

            <p className="text-sm md:text-lg">has successfully completed</p>

            <p className="text-lg md:text-2xl font-bold text-primary my-4 md:my-6 px-4">
              {course.title}
            </p>

            <p className="text-xs md:text-sm text-muted-foreground px-4">
              A comprehensive {course.difficulty} level course consisting of{" "}
              {course.lessons.length} lessons covering {course.tags.join(", ")}
            </p>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-0 border-t-2 md:border-t-3 border-foreground/20 pt-4 md:pt-8 font-mono text-center md:text-left">
            <div className="md:text-left">
              <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
                Date Completed
              </p>
              <p className="font-bold text-sm md:text-base">{currentDate}</p>
            </div>

            <div className="text-center hidden md:block">
              <div className="w-32 md:w-48 h-0.5 bg-foreground/30 mb-2"></div>
              <p className="text-sm font-bold">David Khvedelidze</p>
              <p className="text-xs text-muted-foreground">Instructor</p>
            </div>

            <div className="md:text-right">
              <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
                Course ID
              </p>
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
        <div className="p-4 md:p-6 border-t-4 border-foreground bg-muted">
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Download */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="font-mono text-xs md:text-sm text-muted-foreground">
                Congratulations on completing the course! 🎉
              </p>
              <motion.button
                onClick={handleDownload}
                className="border-3 border-foreground bg-primary text-background px-4 md:px-6 py-2 md:py-3 font-mono font-bold hover:bg-foreground hover:text-background transition-colors flex items-center gap-2 text-sm md:text-base w-full sm:w-auto justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} className="md:w-5 md:h-5" />
                Download
              </motion.button>
            </div>

            {/* Share buttons */}
            <div className="border-t-2 border-foreground/20 pt-3 md:pt-4">
              <p className="font-mono text-xs font-bold mb-3 text-muted-foreground">
                SHARE YOUR ACHIEVEMENT:
              </p>
              <div className="flex flex-wrap gap-2">
                <motion.button
                  onClick={handleTwitterShare}
                  className="border-2 border-foreground bg-background text-foreground px-4 py-2 font-mono text-sm hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Share on Twitter"
                >
                  <Twitter size={16} />
                  <span className="hidden sm:inline">Twitter</span>
                </motion.button>
                <motion.button
                  onClick={handleLinkedInShare}
                  className="border-2 border-foreground bg-background text-foreground px-4 py-2 font-mono text-sm hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Share on LinkedIn"
                >
                  <Linkedin size={16} />
                  <span className="hidden sm:inline">LinkedIn</span>
                </motion.button>
                <motion.button
                  onClick={handleFacebookShare}
                  className="border-2 border-foreground bg-background text-foreground px-4 py-2 font-mono text-sm hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Share on Facebook"
                >
                  <Facebook size={16} />
                  <span className="hidden sm:inline">Facebook</span>
                </motion.button>
                {navigator.share && (
                  <motion.button
                    onClick={handleNativeShare}
                    className="border-2 border-foreground bg-background text-foreground px-4 py-2 font-mono text-sm hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Share"
                  >
                    <Share2 size={16} />
                    <span className="hidden sm:inline">Share</span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Clipboard notification - outside dialog */}
      <AnimatePresence>
        {showClipboardNotice && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-background px-6 py-4 border-3 border-accent shadow-lg z-[60]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center gap-2 font-mono text-sm">
              <Copy size={16} className="text-accent" />
              <span>
                Post text copied to clipboard! Paste it on the platform (Ctrl+V
                / Cmd+V)
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CourseCertificate;
