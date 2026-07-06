import { ButtonLink } from '~/components/01-atoms/button/button.tsx';

export const NotFound = ({
	status,
	message,
	details,
	stack,
}: {
	status: string;
	message: string;
	details: string;
	stack?: string;
}): React.ReactNode => (
	<section className="segment grid min-h-full bg-white px-6 lg:px-8 dark:bg-gray-900">
		<div className="text-center">
			<p className="text-base font-semibold text-indigo-600">{status}</p>
			<h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-gray-300">
				{message}
			</h1>
			<p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
				{details}
			</p>
			{stack ? (
				<pre className="w-full overflow-x-auto p-4">
					<code>{stack}</code>
				</pre>
			) : null}
			<div className="mt-10 flex items-center justify-center gap-x-6">
				<ButtonLink
					linkUrl="/"
					linkText="Go back home"
					variation="primary"
				/>
				<ButtonLink
					linkUrl="/contact"
					linkText="Contact support"
					variation="tertiary"
				/>
			</div>
		</div>
	</section>
);
