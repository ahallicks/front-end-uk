import type { IContent } from '~/components/molecules/content/content-types.ts';
import type { IFeatureBlock } from '~/components/molecules/feature/feature-types.ts';
import type { IHero } from '~/components/molecules/hero/hero-types.ts';
import type { ILogoCloud } from '~/components/molecules/logo-cloud/logo-cloud-types.ts';

import { GraphQLClient, gql } from 'graphql-request';

import { createCacheKey, NotRedis } from '~/services/notredis.ts';
import { tc } from '~/services/terminal-colours.ts';

import { ContentFragment } from '~/components/molecules/content/content-fragment.ts';
import { FeatureFragment } from '~/components/molecules/feature/feature-fragment.tsx';
import { HeroFragment } from '~/components/molecules/hero/hero-fragment.tsx';
import { LogoCloudFragment } from '~/components/molecules/logo-cloud/logo-cloud-fragment.ts';

interface Homepage {
	id: string;
	pageName: string;
	sections: IHero[] | IFeatureBlock[] | ILogoCloud[] | IContent[];
}

type THomepage = {
	hero: IHero;
	feature: IFeatureBlock;
	logoCloud: ILogoCloud;
}[];

const getPageQuery = gql`
	{
		homepage(where: { siteName: hygraphConnells }) {
			id
			pageName
			sections {
				__typename
				${HeroFragment}
				${FeatureFragment}
				${LogoCloudFragment}
				${ContentFragment}
			}
		}
	}
`;

export const getHomepage = async (): Promise<Homepage> => {
	const cache = NotRedis.getInstance();
	const cacheKey = createCacheKey('id', 'homepage', {});

	const cachedResult = cache.get(cacheKey);
	if (cachedResult) {
		return cachedResult as Homepage;
	}

	const startTime = performance.now();
	const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT as string, {
		headers: {},
	});

	const { homepage }: { homepage: Homepage } =
		await hygraph.request(getPageQuery);
	const endTime = performance.now();
	const responseTime = (endTime - startTime).toFixed(2);
	console.log(
		`${tc.blue('Hygraph')} ${tc.dim('getHomepage')} ${tc.dim(homepage.id)} (${responseTime}ms)`,
	);

	cache.set(cacheKey, homepage);
	return homepage;
}
