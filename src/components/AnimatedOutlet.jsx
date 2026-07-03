import { cloneElement, useRef } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/**
 * AnimatedOutlet
 *
 * Wraps React Router's <Outlet> so that page transitions are animated
 * with Framer Motion. Each route is keyed by its pathname, so
 * AnimatePresence can unmount the old page and mount the new one.
 *
 * Transition: subtle upward fade-in (opacity + 12px y-slide).
 */

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -6 },
};

const pageTransition = {
  duration: 0.22,
  ease: "easeOut",
};

// useOutlet returns a stable element even when location changes, but we
// need to snapshot it so AnimatePresence can keep the old page alive
// during the exit animation while the new one enters.
function useStableOutlet() {
  const outlet = useOutlet();
  const ref = useRef(outlet);
  // Update only when we actually have a new outlet
  if (outlet !== null) ref.current = outlet;
  return ref.current;
}

export default function AnimatedOutlet() {
  const location = useLocation();
  const element  = useStableOutlet();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {element && (
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          {cloneElement(element)}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
