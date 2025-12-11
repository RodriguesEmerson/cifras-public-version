import { unstable_cache } from "next/cache";
import { AuthorsDBCache } from "../redis/cache/authorDBCache";

const authorsDBCache = new AuthorsDBCache();
export const getCachedAuthors = unstable_cache(
   async () => {
      return await authorsDBCache.get();
   },
   ['authors-db-cache'],
   {revalidate: 86400, tags: ['authors-db-cache']}
)