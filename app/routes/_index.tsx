import type { MetaArgs, LoaderFunctionArgs } from 'react-router';

import { useLoaderData } from 'react-router';
import { Fragment } from 'react/jsx-runtime';

import { getHomepage } from '~/services/get-homepage.ts';

import { Content } from '~/components/molecules/content/content.tsx';
import { Hero } from '~/components/molecules/hero/hero.tsx';
import { Features } from '~/components/molecules/feature/feature.tsx';
import { LogoCloud } from '~/components/molecules/logo-cloud/logo-cloud.tsx';

export function meta({}: MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const homepage = await getHomepage();
	return { homepage };
};

export default function Home() {
	const { homepage } = useLoaderData<typeof loader>();
	return homepage.sections.map((section, index) => (
		<Fragment key={`${section.__typename}-${index}`}>
			{/* Render hero section */}
			{section.__typename === 'Hero' ? <Hero {...section} /> : null}
			{/* Render feature section */}
			{section.__typename === 'FeatureBlock' ? (
				<Features {...section} />
			) : null}
			{section.__typename === 'LogoCloud' ? (
				<LogoCloud {...section} />
			) : null}
			{section.__typename === 'Content' ? <Content {...section} /> : null}
		</Fragment>
	));
}
