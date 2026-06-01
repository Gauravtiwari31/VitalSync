import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
});

let handler: any;

if (process.env.EDGE_STORE_ACCESS_KEY && process.env.EDGE_STORE_SECRET_KEY) {
  handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
  });
} else {
  handler = () => new Response("Edge Store not configured", { status: 500 });
}

export { handler as GET, handler as POST };
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
