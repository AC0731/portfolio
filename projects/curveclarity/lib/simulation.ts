export type LaunchStyle = "steady" | "community" | "fast";

export const styles: Record<LaunchStyle, { label: string; description: string; exponent: number; color: string }> = {
  steady: { label: "Steady discovery", description: "A gradual illustrative price path for launches that prioritize time to discover.", exponent: 1.45, color: "#83e2c3" },
  community: { label: "Community first", description: "An illustrative curve that stays flatter early, then steepens as participation grows.", exponent: 1.9, color: "#c1a6ff" },
  fast: { label: "Fast graduation", description: "An illustrative curve that reaches its target sooner, with more early price movement.", exponent: 0.78, color: "#ffbd8c" },
};

// These paths are presentation-only. They are not Meteora quote calculations.
export function curvePoints(style: LaunchStyle, steps = 48) {
  const p = styles[style].exponent;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = i / steps;
    const y = Math.pow(x, p);
    return { x, y };
  });
}
