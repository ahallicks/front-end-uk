import type { ActionFunctionArgs } from 'react-router';

import { createCacheKey, NotRedis } from '~/services/notredis.ts';
import { tc } from '~/services/terminal-colours.ts';

export async function action({
	request,
}: ActionFunctionArgs) {
	console.log(tc.box(tc.bold('Cache Invalidation Endpoint Called via POST')));
	const cache = NotRedis.getInstance();
	const formData = await request.json();

	if (formData.data.pageName === 'Homepage') {
		const homepageCacheKey = createCacheKey('id', 'homepage', {});
		const cachedResult = cache.get(homepageCacheKey);
		if (cachedResult) {
			cache.delete(homepageCacheKey);
			return new Response(`Cache cleared for homepage: ${homepageCacheKey}`, { status: 200 });
		}
		return new Response('No cache found for homepage', { status: 200 });
	}
	if (formData.data.__typename === 'Page') {
		const pageCacheKey = createCacheKey('id', formData.data.id, {});
		const pagedCachedResult = cache.get(pageCacheKey);
		if (pagedCachedResult) {
			cache.delete(pageCacheKey);
			return new Response(`Cache cleared for page: ${pageCacheKey}`, { status: 200 });
		}
		return new Response(`No cache found for page: ${pageCacheKey}`, { status: 200 });
	}
	console.log('No matching typename for cache invalidation. Invalidating entire cache as fallback.');
	cache.clear();
	return new Response('Cache cleared', { status: 200 });
}
