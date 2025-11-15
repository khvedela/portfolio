import { useState, useCallback } from "react";

export const useBrutalistToast = () => {
  const [toast, setToast] = useState<{ message: string; isVisible: boolean }>({
    message: "",
    isVisible: false,
  });

  const showToast = useCallback((message: string) => {
    setToast({ message, isVisible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      // Modern Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast(label);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            showToast(label);
          } else {
            showToast("Failed to copy");
          }
        } catch (err) {
          console.error("Fallback copy failed:", err);
          showToast("Failed to copy");
        }
        
        document.body.removeChild(textArea);
      }
      
      // Haptic feedback on mobile
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      
      // Try fallback method
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(label);
      } catch (fallbackErr) {
        console.error("All copy methods failed:", fallbackErr);
        showToast("Copy failed - please copy manually");
      }
    }
  }, [showToast]);

  return { toast, showToast, hideToast, copyToClipboard };
};
