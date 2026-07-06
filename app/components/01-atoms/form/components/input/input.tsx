import { clsx } from 'clsx';

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label?: string;
	invalidId?: string;
	ref?: React.Ref<HTMLInputElement>;
}

export const Input: React.FC<IInput> = ({
	id,
	label,
	type = 'text',
	className,
	invalidId,
	onChange,
	ref,
	...rest
}) => {
	return (
		<input
			id={id}
			type={type}
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
			ref={ref}
			{...rest}
		/>
	);
};
