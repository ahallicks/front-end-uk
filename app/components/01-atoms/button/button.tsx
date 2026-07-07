import { clsx } from 'clsx';
import { Link } from 'react-router';

export type TPage = {
	slug: string;
	pageName: string;
	parentPage: TPage | null;
};

export type TButton = {
	id?: string;
	variation?: 'primary' | 'secondary' | 'tertiary';
	size?: 'small' | 'medium' | 'large';
	className?: string;
	page?: TPage | null;
	onClick?: () => void;
};

export type TButtonLink = TButton & {
	linkText: string;
	linkUrl: string;
	openNewWindow?: boolean;
};

export type TButtonWithChildren = TButton & {
	type: 'button' | 'submit' | 'reset';
	disabled?: boolean;
} & React.PropsWithChildren;
export type TButtonLinkWithChildren = TButtonLink & React.PropsWithChildren;

const classes = {
	primary:
		'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600',
	secondary:
		'bg-gray-900 dark:bg-white/10 text-white hover:bg-gray-700 focus-visible:outline-gray-900',
	tertiary:
		'text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-900 dark:ring-gray-400 hover:bg-gray-50 dark:hover:text-gray-900 focus-visible:outline-indigo-600',
};

const sizes = {
	small: 'px-2.5 py-1.5 text-xs',
	medium: 'px-3.5 py-2.5 text-sm',
	large: 'px-4 py-3 text-base',
};

export const Button: React.FC<TButtonWithChildren> = ({
	type = 'button',
	variation = 'primary',
	size = 'medium',
	className = '',
	children,
	onClick,
	...rest
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={clsx(
				classes[variation],
				sizes[size],
				className,
				'inline-flex items-center gap-2 rounded-md font-semibold shadow-xs hover:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60',
			)}
			{...rest}
		>
			{children ? children : null}
		</button>
	);
};

export const ButtonLink: React.FC<TButtonLinkWithChildren> = ({
	linkText,
	linkUrl,
	openNewWindow,
	variation = 'primary',
	className = '',
	children,
	onClick,
	...rest
}) => {
	return (
		<Link
			key={linkUrl}
			to={linkUrl}
			onClick={onClick}
			className={clsx(
				classes[variation],
				className,
				'rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-xs hover:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
			)}
			{...rest}
			target={openNewWindow ? '_blank' : undefined}
		>
			{linkText}
			{children ? children : null}
		</Link>
	);
};
