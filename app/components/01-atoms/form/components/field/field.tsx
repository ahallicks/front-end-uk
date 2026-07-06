import { Alert } from '~/components/01-atoms/alert/alert.tsx';

export interface IFormField extends React.PropsWithChildren {
	id?: string;
	errorId?: string;
	error?: string;
}
export const FormField: React.FC<IFormField> = ({
	id,
	errorId,
	error,
	children,
}) => {
	return (
		<>
			<div
				id={id}
				className="rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
			>
				{children}
			</div>
			{error && errorId ? (
				<Alert type="error" aria-live="assertive" id={errorId}>
					{error}
				</Alert>
			) : null}
		</>
	);
};
