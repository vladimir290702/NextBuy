import { useState, useEffect } from "react";

export default function Counter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const frameDuration = 16; // Each frame is about 16ms (~60fps)
    const totalFrames = Math.round(duration / frameDuration);
    const increment = end / totalFrames;
    let frame = 0;
    let animationFrameId;

    const updateCounter = () => {
      frame++;
      let newValue = Math.round(frame * increment);

      if (newValue >= end) {
        setCount(end); // Ensure it stops exactly at `end`
        cancelAnimationFrame(animationFrameId);
      } else {
        setCount(newValue);
        animationFrameId = requestAnimationFrame(updateCounter);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    // Cleanup function to prevent memory leaks
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration]);

  return (
    <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
      {count ? count : 0}
    </div>
  );
}
