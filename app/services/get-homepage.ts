import type { IComment } from '~/components/01-atoms/comment/comment-types.ts';
import type { IDivider } from '~/components/01-atoms/divider/divider-types.ts';
import type { IBanner } from '~/components/02-molecules/banner/banner-types.ts';
import type { IContent } from '~/components/02-molecules/content/content-types.ts';
import type { IFeatureBlock } from '~/components/02-molecules/feature/feature-types.ts';
import type { IHero } from '~/components/02-molecules/hero/hero-types.ts';
import type { ILogoCloud } from '~/components/02-molecules/logo-cloud/logo-cloud-types.ts';
import type { IArticleCards } from '~/components/03-organisms/article-cards/article-cards-types.ts';

import { GraphQLClient, gql } from 'graphql-request';

import { NotRedis, createCacheKey } from '~/services/notredis.ts';
import { tc } from '~/services/terminal-colours.ts';
import { fixThePage } from '~/utils/page-fixer.ts';

import { DividerFragment } from '~/components/01-atoms/divider/divider-fragment.ts';
import { BannerFragment } from '~/components/02-molecules/banner/banner-fragment.ts';
import { ContentFragment } from '~/components/02-molecules/content/content-fragment.ts';
import { FeatureFragment } from '~/components/02-molecules/feature/feature-fragment.ts';
import { HeroFragment } from '~/components/02-molecules/hero/hero-fragment.ts';
import { LogoCloudFragment } from '~/components/02-molecules/logo-cloud/logo-cloud-fragment.ts';
import { ArticleCardsFragment } from '~/components/03-organisms/article-cards/article-cards-fragment.ts';

export interface IHomepage {
	id: string;
	pageName: string;
	seoDescription?: string;
	enableComments?: boolean;
	comments: IComment[];
	created: string;
	updated?: string;
	published?: string;
	sections:
		| IHero[]
		| IFeatureBlock[]
		| IBanner[]
		| ILogoCloud[]
		| IContent[]
		| IArticleCards[]
		| IDivider[];
}

const getHomepageQuery = gql`
	{
		homepage(where: { siteName: ${process.env.SITE_NAME} }) {
			id
			pageName
			seoDescription
			
			sections {
				__typename
				${HeroFragment}
				${FeatureFragment}
				${BannerFragment}
				${LogoCloudFragment}
				${ContentFragment}
				${ArticleCardsFragment}
				${DividerFragment}
			}
		}
	}
`;

export const getHomepage = async (): Promise<IHomepage> => {
	try {
		const cache = NotRedis.getInstance();
		const cacheKey = createCacheKey('id', 'homepage', {});

		const cachedResult = cache.get(cacheKey);
		if (cachedResult) {
			return cachedResult as IHomepage;
		}

		const startTime = performance.now();
		const hygraph = new GraphQLClient(
			process.env.HYGRAPH_ENDPOINT as string,
			{
				headers: {},
			},
		);

		const { homepage }: { homepage: IHomepage } =
			await hygraph.request(getHomepageQuery);
		const endTime = performance.now();
		const responseTime = (endTime - startTime).toFixed(2);
		console.log(
			`${tc.blue('Hygraph')} ${tc.dim('getHomepage')} ${tc.dim(homepage.id)} (${responseTime}ms)`,
		);

		cache.set(cacheKey, homepage);
		return fixThePage<IHomepage>(homepage);
	} catch (error) {
		console.error('Error fetching page data:', error);
		throw new Response('Page not found', { status: 404 });
	}
};
