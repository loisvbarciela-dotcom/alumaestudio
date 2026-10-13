import { createServerFn } from "@tanstack/react-start";

/** Incoming HTTP method of the current request. Client-side navigation has no
 * HTTP request context, so it reports "GET" (navigations are GET-like).
 * Unprefixed-page redirects must never fire for non-GET/HEAD requests. */
export const getRequestMethod = createServerFn({ method: "GET" }).handler(async () => {
  const { getRequest } = await import("@tanstack/react-start/server");
  return getRequest().method.toUpperCase();
});
