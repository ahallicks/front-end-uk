import type { IHomepage } from '~/services/get-homepage.ts';

import { Fragment } from 'react/jsx-runtime';
import { useLoaderData } from 'react-router';

import { getHomepage } from '~/services/get-homepage.ts';

import {
	Divider,
	DividerWithText,
} from '~/components/01-atoms/divider/divider.tsx';
import {
	Banner,
	BannerSmall,
} from '~/components/02-molecules/banner/banner.tsx';
import { Content } from '~/components/02-molecules/content/content.tsx';
import { Features } from '~/components/02-molecules/feature/feature.tsx';
import { Hero } from '~/components/02-molecules/hero/hero.tsx';
import { LogoCloud } from '~/components/02-molecules/logo-cloud/logo-cloud.tsx';
import { ArticleCards } from '~/components/03-organisms/article-cards/article-cards.tsx';

export const loader = async (): Promise<{ homepage: IHomepage }> => {
	try {
		const homepage = await getHomepage();
		return { homepage };
	} catch (error) {
		console.error('Error fetching page data:', error);
		throw new Response('Page not found', { status: 404 });
	}
};

export default function Home(): React.ReactNode {
	const { homepage } = useLoaderData<typeof loader>();
	return (
		<>
			<title>{homepage.pageName}</title>
			<meta name="description" content={homepage.seoDescription ?? ''} />
			{homepage.sections.map((section, index) => (
				<Fragment key={`${section.__typename}-${index}`}>
					{/* Render hero section */}
					{section.__typename === 'Hero' ? (
						<Hero {...section} contentId={homepage.id} />
					) : null}
					{/* Render feature section */}
					{section.__typename === 'FeatureBlock' ? (
						<Features {...section} contentId={homepage.id} />
					) : null}
					{/* Render banner section */}
					{section.__typename === 'Banner' ? (
						section.bannerImage ? (
							<BannerSmall {...section} contentId={homepage.id} />
						) : (
							<Banner {...section} contentId={homepage.id} />
						)
					) : null}
					{section.__typename === 'LogoCloud' ? (
						<LogoCloud {...section} contentId={homepage.id} />
					) : null}
					{section.__typename === 'Content' ? (
						<Content
							{...section}
							contentId={homepage.id}
							page={homepage}
						/>
					) : null}
					{section.__typename === 'ArticleCards' ? (
						<ArticleCards {...section} contentId={homepage.id} />
					) : null}
					{section.__typename === 'Divider' ? (
						section.text ? (
							<DividerWithText
								{...section}
								contentId={homepage.id}
							/>
						) : (
							<Divider />
						)
					) : null}
				</Fragment>
			))}
		</>
	);
}
