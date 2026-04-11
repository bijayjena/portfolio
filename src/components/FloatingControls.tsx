import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

const FloatingControls = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Bijay_Jena_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 flex flex-col gap-3 sm:gap-4 z-40 items-end pointer-events-none">
            <AnimatePresence>
                {showScrollTop && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        transition={{ duration: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                        className="pointer-events-auto mr-16 sm:mr-20"
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full shadow-lg bg-background/90 backdrop-blur-md border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-12 h-12 sm:w-14 sm:h-14 hover:scale-110 active:scale-95"
                            onClick={scrollToTop}
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                className="pointer-events-auto"
            >
                <Button
                    className={`shadow-xl rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group ${
                        isMobile ? 'px-4 py-6 text-sm' : 'px-6 py-6'
                    }`}
                    onClick={handleDownload}
                    aria-label="Download resume"
                >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                    <span className="hidden sm:inline">Download Resume</span>
                    <span className="sm:hidden">Resume</span>
                </Button>
            </motion.div>
        </div>
    );
};

export default FloatingControls;
