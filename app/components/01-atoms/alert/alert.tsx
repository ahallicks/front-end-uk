export type TAlert = {
	id?: string;
	title?: string;
	type?: 'info' | 'warning' | 'error' | 'success';
	className?: string;
} & React.PropsWithChildren;

export const Alert: React.FC<TAlert> = ({
	id,
	title,
	type = 'info',
	className,
	children,
	...rest
}) => {
	const typeStyles = {
		info: 'text-blue-800 bg-blue-200 dark:bg-blue-800 dark:text-blue-300',
		warning:
			'text-yellow-800 bg-yellow-200 dark:bg-yellow-800 dark:text-yellow-300',
		error: 'text-red-800 bg-red-200 dark:bg-red-800 dark:text-red-300',
		success:
			'text-green-800 bg-green-200 dark:bg-green-800 dark:text-green-300',
	};
	return (
		<div
			className={`flex items-start rounded-lg px-4 py-2 text-sm sm:items-center ${typeStyles[type]} ${className}`}
			role="alert"
			id={id}
			{...rest}
		>
			<svg
				className="me-2 mt-0.5 h-4 w-4 shrink-0 sm:mt-0"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>
			<p>
				{title ? (
					<span className="me-1 font-medium">{title}</span>
				) : null}
				{children}
			</p>
		</div>
	);
};
