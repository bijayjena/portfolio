import { skillsData } from "@/data/skillsData";
import { cn } from "@/lib/utils";

const ScrollingTechIcons = () => {
    // Split skills into two rows for visual interest
    const midPoint = Math.ceil(skillsData.length / 2);
    const row1 = skillsData.slice(0, midPoint);
    const row2 = skillsData.slice(midPoint);

    // Helper to create a seamless loop array (duplicated enough times to fill screen, then doubled)
    const createSeamlessRow = (arr: typeof skillsData) => {
        // Duplicate 4 times to ensure it covers wide screens
        const filledScreen = [...arr, ...arr, ...arr, ...arr];
        // Double it for the 50% scroll to work seamlessly
        return [...filledScreen, ...filledScreen];
    };

    const seamlessRow1 = createSeamlessRow(row1);
    const seamlessRow2 = createSeamlessRow(row2);

    return (
        <div className="w-full py-12 overflow-hidden relative">
            {/* Gradient Masks for fading effect at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            {/* Row 1 - Scroll Left */}
            <div className="flex mb-8 w-max animate-scroll hover:[animation-play-state:paused]">
                {seamlessRow1.map((skill, index) => (
                    <div
                        key={`${skill.name}-row1-${index}`}
                        className="flex flex-col items-center justify-center mx-8 group transition-all duration-300"
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-card rounded-2xl shadow-sm border border-border/50 p-4 flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                            />
                        </div>
                        <span className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Row 2 - Scroll Right */}
            <div
                className="flex w-max animate-scroll hover:[animation-play-state:paused]"
                style={{ animationDirection: 'reverse' }}
            >
                {seamlessRow2.map((skill, index) => (
                    <div
                        key={`${skill.name}-row2-${index}`}
                        className="flex flex-col items-center justify-center mx-8 group transition-all duration-300"
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-card rounded-2xl shadow-sm border border-border/50 p-4 flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                            />
                        </div>
                        <span className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScrollingTechIcons;
