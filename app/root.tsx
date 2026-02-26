import type { Route } from './+types/root';

import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from 'react-router';
import { Fragment } from 'react/jsx-runtime';

import { getGlobalData } from './services/get-global-data.ts';

import { Banner } from './components/molecules/banner/banner.tsx';
import { Footer } from '~/components/molecules/footer/footer.tsx';
import { HeaderComponent } from '~/components/molecules/header/header.tsx';
import { LogoCloud } from './components/molecules/logo-cloud/logo-cloud.tsx';
import { Strip } from './components/molecules/strip/strip.tsx';

import './app.css';

export const links: Route.LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
	},
];

export const loader = async () => {
	try {
		const globalData = await getGlobalData();
		return { globalData };
	} catch (error) {
		console.error('Error fetching global data:', error);
		throw new Response('Global data not found', { status: 500 });
	}
};

export function Layout({ children }: { children: React.ReactNode }) {
	const { globalData } = useLoaderData<typeof loader>();
	return (
		<html
			lang="en"
			className="h-full bg-white dark:bg-gray-950 scheme-light dark:scheme-dark"
		>
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body className="h-full flex flex-col">
				<HeaderComponent {...globalData} />
				{globalData.headerComponents &&
				globalData.headerComponents.length > 0
					? globalData.headerComponents.map((component, index) => (
							<Fragment key={`${component.__typename}-${index}`}>
								{component.__typename === 'LogoCloud' ? (
									<LogoCloud {...component} />
								) : null}
								{component.__typename === 'Strip' ? (
									<Strip {...component} />
								) : null}
							</Fragment>
						))
					: null}
				<main id="main" className="flex-1">
					{children}
				</main>
				{globalData.footerComponents &&
				globalData.footerComponents.length > 0
					? globalData.footerComponents.map((component, index) => (
							<Fragment key={`${component.__typename}-${index}`}>
								{component.__typename === 'LogoCloud' ? (
									<LogoCloud {...component} />
								) : null}
								{component.__typename === 'Banner' ? (
									<Banner {...component} />
								) : null}
							</Fragment>
						))
					: null}
				<Footer />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = 'Oops!';
	let details = 'An unexpected error occurred.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error';
		details =
			error.status === 404
				? 'The requested page could not be found.'
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-indigo-600">404</p>
				<h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
					{message}
				</h1>
				<p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
					{details}
				</p>
				{stack ? (
					<pre className="w-full p-4 overflow-x-auto">
						<code>{stack}</code>
					</pre>
				) : null}
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/"
						rel="home"
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Go back home
					</a>
					<a href="#" className="text-sm font-semibold text-gray-900">
						Contact support <span aria-hidden="true">&rarr;</span>
					</a>
				</div>
			</div>
		</div>
	);
}
{
	/* <main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main> */
}
