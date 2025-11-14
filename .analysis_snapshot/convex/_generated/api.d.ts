/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as comments from "../comments.js";
import type * as crons from "../crons.js";
import type * as recommendations from "../recommendations.js";
import type * as recommendationsGenerate from "../recommendationsGenerate.js";
import type * as seed from "../seed.js";
import type * as stocks from "../stocks.js";
import type * as stocksUpdate from "../stocksUpdate.js";
import type * as watchlists from "../watchlists.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  comments: typeof comments;
  crons: typeof crons;
  recommendations: typeof recommendations;
  recommendationsGenerate: typeof recommendationsGenerate;
  seed: typeof seed;
  stocks: typeof stocks;
  stocksUpdate: typeof stocksUpdate;
  watchlists: typeof watchlists;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
