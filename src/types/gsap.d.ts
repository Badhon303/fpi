// gsap ships its class types via the global namespace and the root "gsap"
// entry, but the individual plugin entry points (e.g. "gsap/ScrollTrigger")
// do not carry colocated declaration files. These ambient declarations let
// us import the plugins by their conventional paths without type errors.
declare module "gsap/ScrollTrigger" {
  export const ScrollTrigger: globalThis.ScrollTrigger.ScrollTriggerStatic;
}

declare module "gsap/MotionPathPlugin" {
  export const MotionPathPlugin: gsap.plugins.Plugin;
}
