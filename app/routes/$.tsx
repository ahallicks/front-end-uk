import type { LoaderFunctionArgs } from 'react-router';
import type { IPage } from '~/services/get-page.ts';

import {
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
} from 'react-router';

import { getPage } from '~/services/get-page.ts';
import { getSession } from '~/session.server.ts';

import { NotFound } from '~/components/04-layouts/404/404.tsx';
import { PageSections } from '~/components/04-layouts/page-sections/page-sections.tsx';

export const loader = async ({
	params,
	request,
}: LoaderFunctionArgs): Promise<{ page: IPage; formKey: string }> => {
	const filePath = params['*'];
	const session = await getSession(request.headers.get('Cookie'));
	const formKey = crypto.randomUUID();
	session.set('formKey', formKey);

	try {
		const page = await getPage({ filePath: filePath });
		return { page, formKey };
	} catch (error) {
		console.error('Error fetching page data:', error);
		throw new Response('Page not found', { status: 404 });
	}
};

export default function Page(): React.ReactNode {
	const { page, formKey } = useLoaderData<typeof loader>();
	return (
		<>
			<title>{page.pageName}</title>
			<meta name="description" content={page.seoDescription ?? ''} />
			<PageSections page={page} formKey={formKey} />
		</>
	);
}

export function ErrorBoundary(): React.ReactNode {
	const error = useRouteError();

	let status = '500';
	let message = 'Oops!';
	let details = 'An unexpected error occurred.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		status = error.status.toString();
		message = error.status === 404 ? 'Page not found' : 'Error';
		details =
			error.status === 404
				? 'The requested page could not be found.'
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<>
			<title>
				{status}: {message}
			</title>
			<meta name="description" content={details} />
			<NotFound
				status={status}
				details={details}
				message={message}
				stack={stack}
			/>
		</>
	);
}
