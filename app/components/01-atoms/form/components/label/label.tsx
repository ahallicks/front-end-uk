export type TLabel = React.LabelHTMLAttributes<HTMLLabelElement> &
	React.PropsWithChildren & {
		htmlFor: string;
	};

export const Label: React.FC<TLabel> = ({
	htmlFor,
	className,
	children,
	...rest
}) => {
	return (
		<label htmlFor={htmlFor} className={className} {...rest}>
			{children}
		</label>
	);
};
