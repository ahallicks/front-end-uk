import { clsx } from 'clsx';
import { Link } from 'react-router';

export type TPage = {
	slug: string;
	pageName: string;
	parentPage: TPage | null;
};

export type TButtonLink = {
	linkText: string;
	linkUrl: string;
	variation?: 'primary' | 'secondary' | 'tertiary';
	className?: string;
	children?: React.ReactNode;
	page?: TPage | null;
};

const classes = {
	primary:
		'rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
	secondary:
		'rounded-full bg-gray-900 dark:bg-white/10 px-3.5 py-1 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900',
	tertiary:
		'rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
};

export const ButtonLink: React.FC<TButtonLink> = ({
	linkText,
	linkUrl,
	variation = 'primary',
	className = '',
	children,
}) => {
	return (
		<Link
			key={linkUrl}
			to={linkUrl}
			className={clsx(classes[variation], className)}
		>
			{linkText}
			{children ? children : null}
		</Link>
	);
};
