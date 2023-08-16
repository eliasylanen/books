import { initTRPC } from '@trpc/server';

const { router, procedure: publicProcedure } = initTRPC.create();

export { publicProcedure, router };
