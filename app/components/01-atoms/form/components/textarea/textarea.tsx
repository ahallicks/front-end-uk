import { clsx } from 'clsx';

export interface ITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	id: string;
	label?: string;
	invalidId?: string;
}

export const Textarea: React.FC<ITextarea> = ({
	id,
	label,
	className,
	invalidId,
	onChange,
	...rest
}) => {
	return (
		<textarea
			id={id}
			name={id}
			className={clsx(
				'w-full border-0 px-0 text-sm text-gray-900 focus:ring-0 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400',
				className,
			)}
			placeholder={label}
			onChange={onChange}
			aria-required={invalidId ? 'true' : 'false'}
			aria-invalid={Boolean(invalidId) ? 'true' : 'false'}
			aria-describedby={invalidId ? invalidId : undefined}
			{...rest}
		/>
	);
};
