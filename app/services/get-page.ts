import type { IBanner } from '~/components/molecules/banner/banner-types.ts';
import type { IContent } from '~/components/molecules/content/content-types.ts';
import type { IFeatureBlock } from '~/components/molecules/feature/feature-types.ts';
import type { IHero } from '~/components/molecules/hero/hero-types.ts';
import type { ILogoCloud } from '~/components/molecules/logo-cloud/logo-cloud-types.ts';
import type { IStatistics } from '~/components/molecules/statistics/statistics-types.ts';

import { GraphQLClient, gql } from 'graphql-request';

import { createCacheKey, NotRedis } from '~/services/notredis.ts';
import { tc } from '~/services/terminal-colours.ts';

import { BannerFragment } from '~/components/molecules/banner/banner-fragment.tsx';
import { ContentFragment } from '~/components/molecules/content/content-fragment.ts';
import { FeatureFragment } from '~/components/molecules/feature/feature-fragment.tsx';
import { HeroFragment } from '~/components/molecules/hero/hero-fragment.tsx';
import { LogoCloudFragment } from '~/components/molecules/logo-cloud/logo-cloud-fragment.ts';
import { StatisticsFragment } from '~/components/molecules/statistics/statistics-fragment.ts';

interface IPage {
	pageName: string;
	sections: IHero[] | IFeatureBlock[] | IStatistics[] | IBanner[] | ILogoCloud[] | IContent[];
}

type TPage = {
	hero: IHero;
	feature: IFeatureBlock;
	statistics: IStatistics;
	banner: IBanner;
	logoCloud: ILogoCloud;
	content: IContent;
}[];

type TSinglePage = {
	id: string;
	slug: string;
	parentPage: {
		slug: string;
	} | null;
	childPages: {
		slug: string;
	}[];
} | undefined;

type TAllPages = {
	pages: TSinglePage[];
};

const getPagesQuery = gql`
	{
		pages {
			id
			slug
			parentPage {
				... on Page {
					slug
				}
			}
			childPages {
				slug
			}
		}
	}
`;

export const getPage = async ({ filePath }: { filePath?: string; }) => {
	let allPages: TAllPages;
	const fileParts = filePath ? filePath.split('/') : [];
	const slug = fileParts.at(-1);

	try {
		const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT as string, {
			headers: {},
		});

		const cache = NotRedis.getInstance();
		const cacheKey = createCacheKey('id', 'pages', {});

		const cachedResult = cache.get(cacheKey);
		if (cachedResult) {
			allPages = cachedResult as TAllPages;
		} else {
			const startTime = performance.now();
			if (filePath === undefined) {
				throw new Error('Page not found');
			}
			allPages = await hygraph.request(getPagesQuery);
			if (!allPages) {
				throw new Error('Page not found');
			}
			const endTime = performance.now();
			const responseTime = (endTime - startTime).toFixed(2);
			console.log(
				`${tc.blue('Hygraph')} ${tc.dim('getPages')} ${tc.dim(allPages.pages.length.toString())} (${responseTime}ms)`,
			);

			cache.set(cacheKey, allPages);
		}

		const thisPage = allPages.pages.find((page) =>
			fileParts.length > 1
				? page?.slug === slug &&
				page?.parentPage?.slug === fileParts.at(-2)
				: page?.slug === slug,
		);

		if (!thisPage) {
			throw new Error('Page not found');
		}

		const pageCache = NotRedis.getInstance();
		const pageCacheKey = createCacheKey('id', thisPage.id, {});

		const pagedCachedResult = pageCache.get(pageCacheKey);
		if (pagedCachedResult) {
			return pagedCachedResult as IPage;
		}

		const pageStartTime = performance.now();
		const pageQuery = gql`
			{
				page(where: { id: "${thisPage.id}" }) {
					pageName
					sections {
						__typename
						${HeroFragment}
						${FeatureFragment}
						${StatisticsFragment}
						${BannerFragment}
						${LogoCloudFragment}
						${ContentFragment}
					}
				}
			}
		`;

		const { page }: { page: IPage } = await hygraph.request(pageQuery);
		if (!page) {
			throw new Response('Page not found', { status: 404 });
		}
		const pageEndTime = performance.now();
		const responseTime = (pageEndTime - pageStartTime).toFixed(2);
		console.log(
			`${tc.blue('Hygraph')} ${tc.dim('getPage')} ${tc.dim(thisPage.id)} (${responseTime}ms)`,
		);
		pageCache.set(pageCacheKey, page);
		return page;
	} catch (error) {
		console.error('Error fetching page data:', error);
		throw new Response('Page not found', { status: 404 });
	}
};

export const getPreviewPage = async (id: string) => {
	const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT as string, {
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_DEV_AUTH_TOKEN}`,
		},
	});

	try {
		const pageQuery = gql`
				{
					page(where: { id: "${id}" }, stage: DRAFT) {
						pageName
						sections {
							__typename
							${HeroFragment}
							${FeatureFragment}
							${StatisticsFragment}
							${BannerFragment}
						}
					}
				}
			`;

		const { page }: { page: IPage } = await hygraph.request(pageQuery);
		if (!page) {
			throw new Response('Page not found', { status: 404 });
		}
		return page;
	} catch (error) {
		console.error('Error fetching page data:', error);
		throw new Response('Page not found', { status: 404 });
	}

};
