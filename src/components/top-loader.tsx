"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as NextTopLoaderPkg from "nextjs-toploader";
import type { NextTopLoaderProps } from "nextjs-toploader";

const TopLoaderComponent =
  (NextTopLoaderPkg as any).default?.default ||
  (NextTopLoaderPkg as any).default ||
  (NextTopLoaderPkg as any);

const useTopLoader =
  (NextTopLoaderPkg as any).useTopLoader ||
  (NextTopLoaderPkg as any).default?.useTopLoader;

function NavigationProgressHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const topLoader = useTopLoader ? useTopLoader() : null;
    topLoader?.done();
  }, [pathname, searchParams]);

  React.useEffect(() => {
    const topLoader = useTopLoader ? useTopLoader() : null;
    if (!topLoader) return;

    const navKey = Symbol.for("vinext.clientNavigationState");
    const navState = (window as any)[navKey];
    if (navState) {
      if (navState.listeners) {
        const onNavigate = () => {
          topLoader.done();
        };
        navState.listeners.add(onNavigate);
      }
      if (navState.originalPushState) {
        const origPush = navState.originalPushState;
        navState.originalPushState = function (...args: any[]) {
          topLoader.done();
          return origPush.apply(this, args);
        };
      }
      if (navState.originalReplaceState) {
        const origReplace = navState.originalReplaceState;
        navState.originalReplaceState = function (...args: any[]) {
          topLoader.done();
          return origReplace.apply(this, args);
        };
      }
    }

    const router = (window as any).next?.router;
    if (router) {
      const origPush = router.push;
      const origReplace = router.replace;
      if (origPush) {
        router.push = function (...args: any[]) {
          topLoader.start();
          return origPush.apply(this, args);
        };
      }
      if (origReplace) {
        router.replace = function (...args: any[]) {
          topLoader.start();
          return origReplace.apply(this, args);
        };
      }
    }

    const onPopState = () => {
      topLoader.done();
    };
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return null;
}

export function NextTopLoader(props: NextTopLoaderProps) {
  return (
    <>
      <TopLoaderComponent {...props} />
      <React.Suspense fallback={null}>
        <NavigationProgressHandler />
      </React.Suspense>
    </>
  );
}

export default NextTopLoader;
