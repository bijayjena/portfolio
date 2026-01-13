import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingControls = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleDownload = () => {
        // Replace with actual resume path
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50 items-end pointer-events-none">
            <AnimatePresence>
                {showScrollTop && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-auto"
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary transition-all duration-300 w-12 h-12"
                            onClick={scrollToTop}
                        >
                            <ArrowUp className="w-6 h-6 text-primary" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pointer-events-auto"
            >
                <Button
                    className="shadow-xl rounded-full px-6 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group"
                    onClick={handleDownload}
                >
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    <span>Download Resume</span>
                </Button>
            </motion.div>
        </div>
    );
};

export default FloatingControls;
