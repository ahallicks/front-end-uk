import type { MetaArgs, LoaderFunctionArgs } from 'react-router';

import { useLoaderData } from 'react-router';
import { Fragment } from 'react/jsx-runtime';

import { getPreviewPage } from '~/services/get-page.ts';

import { Hero } from '~/components/molecules/hero/hero.tsx';
import { Feature } from '~/components/molecules/feature/feature.tsx';
import { Statistics } from '~/components/molecules/statistics/statistics.tsx';
import { Banner } from '~/components/molecules/banner/banner.tsx';
import { LogoCloud } from '~/components/molecules/logo-cloud/logo-cloud.tsx';

export function meta({}: MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	try {
		const id = params.id;
		if (!id) {
			throw new Error('No ID provided');
		}
		const page = await getPreviewPage(id);
		return { page };
	} catch (error) {
		console.error('Error fetching page data:', error);
		throw new Response('Page not found', { status: 404 });
	}
};

export default function Preview() {
	const { page } = useLoaderData<typeof loader>();
	return page.sections.map((section, index) => (
		<Fragment key={`${section.__typename}-${index}`}>
			{/* Render hero section */}
			{section.__typename === 'Hero' ? <Hero {...section} /> : null}
			{/* Render feature section */}
			{section.__typename === 'FeatureBlock' ? (
				<Feature {...section} />
			) : null}
			{/* Render statistics section */}
			{section.__typename === 'Statistics' ? (
				<Statistics {...section} />
			) : null}
			{/* Render statistics section */}
			{section.__typename === 'Banner' ? <Banner {...section} /> : null}
			{section.__typename === 'LogoCloud' ? (
				<LogoCloud {...section} />
			) : null}
		</Fragment>
	));
}
