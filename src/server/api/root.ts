import { carRoute } from "~/server/api/routers/cars";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cars: carRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;
