import { LayoutGroup, motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,     // smoother domino
      delayChildren: 0.04,
    },
  },
};

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.86,
    rotateX: -18,
    filter: "blur(14px)",
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1], // 🎬 cinematic easeOutExpo-like
    },
  },
};

export function AnimationContainer({ children }: { children: React.ReactNode }) {
    const ref = useRef(null);

    const isInView = useInView(ref, {
        margin: "-20px",
        amount: 0.1,
    });
    return (
        <LayoutGroup>
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                style={{ perspective: 1200 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
            >
                {children}
            </motion.div>
        </LayoutGroup>
    );
}

            // <motion.div
            //   key={related.post_id}
            //   variants={cardVariants}
            //   style={{ transformStyle: "preserve-3d" }}
            // ></motion.div>