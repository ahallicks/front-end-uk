import type { MetaArgs, LoaderFunctionArgs } from 'react-router';

import { useLoaderData } from 'react-router';
import { Fragment } from 'react/jsx-runtime';

import { getPage } from '~/services/get-page.ts';

import { Banner } from '~/components/molecules/banner/banner.tsx';
import { Content } from '~/components/molecules/content/content.tsx';
import { Features } from '~/components/molecules/feature/feature.tsx';
import { Hero } from '~/components/molecules/hero/hero.tsx';
import { LogoCloud } from '~/components/molecules/logo-cloud/logo-cloud.tsx';
import { Statistics } from '~/components/molecules/statistics/statistics.tsx';

export function meta({}: MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const filePath = params['*'];

	try {
		const page = await getPage({ filePath: filePath });
		return { page };
	} catch (error) {
		console.error('Error fetching page data:', error);
		throw new Response('Page not found', { status: 404 });
	}
};

export default function Page() {
	const { page } = useLoaderData<typeof loader>();
	return page.sections.map((section, index) => (
		<Fragment key={`${section.__typename}-${index}`}>
			{/* Render hero section */}
			{section.__typename === 'Hero' ? <Hero {...section} /> : null}
			{/* Render feature section */}
			{section.__typename === 'FeatureBlock' ? (
				<Features {...section} />
			) : null}
			{/* Render statistics section */}
			{section.__typename === 'Statistics' ? (
				<Statistics {...section} />
			) : null}
			{/* Render banner section */}
			{section.__typename === 'Banner' ? <Banner {...section} /> : null}
			{section.__typename === 'LogoCloud' ? (
				<LogoCloud {...section} />
			) : null}
			{section.__typename === 'Content' ? <Content {...section} /> : null}
		</Fragment>
	));
}
