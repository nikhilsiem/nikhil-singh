// Small easing helpers shared by the scrollytelling stages.
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const ease = x => 1 - Math.pow(1 - clamp(x), 3);
export const span = (t, a, b) => ease((t - a) / (b - a));
export const lerp = (a, b, k) => a + (b - a) * k;

