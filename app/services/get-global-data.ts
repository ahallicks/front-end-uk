import type { IBanner } from '~/components/molecules/banner/banner-types.ts';
import type { ILogoCloud } from '~/components/molecules/logo-cloud/logo-cloud-types.ts';
import type { IStrip } from '~/components/molecules/strip/strip-types.ts';
import type { TImage, TNavLink } from '~/types/global-types.ts';

import { GraphQLClient, gql } from 'graphql-request';
import { LogoCloudFragment } from '~/components/molecules/logo-cloud/logo-cloud-fragment.ts';
import { StripFragment } from '~/components/molecules/strip/strip-fragment.ts';
import { BannerFragment } from '~/components/molecules/banner/banner-fragment.tsx';
import { createCacheKey, NotRedis } from './notredis.ts';
import { tc } from './terminal-colours.ts';

export interface IGlobalData {
	siteName: string;
	logoAltText: string;
	logo: TImage;
	navigationLinks: TNavLink[];
	headerComponents: ILogoCloud[] | IStrip[];
	footerComponents: ILogoCloud[] | IBanner[];
}

const globalQuery = gql`
{
  header(where: {siteName: hygraphConnells}) {
    siteName
	logoAltText
    logo {
      url
      width
      height
    }
    navigationLinks {
      ... on ButtonLink {
        linkText
        linkUrl
        variation
        page {
          ... on Page {
            pageName
            slug
            parentPage {
              ... on Page {
                pageName
                slug
                parentPage {
                  ... on Page {
                    pageName
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
	headerComponents {
      __typename
      ${LogoCloudFragment}
	  ${StripFragment}
    }
	footerComponents {
	  __typename
      ${LogoCloudFragment}
	  ${BannerFragment}
    }
  }
}`;

export const getGlobalData = async (): Promise<IGlobalData> => {

	const cache = NotRedis.getInstance();
	const cacheKey = createCacheKey('id', 'globalData', {});

	const cachedResult = cache.get(cacheKey);
	if (cachedResult) {
		return cachedResult as IGlobalData;
	}
	const startTime = performance.now();
	const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT as string, {
		headers: {},
	});
	const { header } = await hygraph.request(globalQuery);
	if (!header) {
		throw new Response('Global data not found', { status: 500 });
	}
	const endTime = performance.now();
	const responseTime = (endTime - startTime).toFixed(2);
	console.log(
		`${tc.blue('Hygraph')} ${tc.dim('getPages')} ${tc.dim(header.siteName)} (${responseTime}ms)`,
	);

	cache.set(cacheKey, header);
	return header;
};
