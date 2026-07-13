"use client";

import { useEffect, useRef, type DependencyList } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Runs a GSAP setup callback inside a scoped gsap.context so that all
 * tweens/ScrollTriggers created within are automatically reverted on
 * unmount or dependency change. This prevents memory leaks and stale
 * ScrollTriggers when navigating between routes in the App Router.
 *
 * The callback may return its own cleanup function which runs before
 * the context is reverted.
 */
export function useGSAP(
  callback: () => void | (() => void),
  deps: DependencyList = []
) {
  const cleanupRef = useRef<void | (() => void)>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      cleanupRef.current = callback();
    });

    return () => {
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
