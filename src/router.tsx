import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Route as rootRoute } from "./routes/__root";

export const getRouter = () => {
  const queryClient = new QueryClient();
  const errorComponent = rootRoute.options.errorComponent;

  const router = createRouter({
    routeTree,
    ...(errorComponent ? { defaultErrorComponent: errorComponent } : {}),
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
