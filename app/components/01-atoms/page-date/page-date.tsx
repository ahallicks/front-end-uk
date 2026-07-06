import { formatDate } from '~/utils/date-utils.ts';

export type TPageDate = React.PropsWithChildren & {
	className?: string;
	published?: string;
	created: string;
	updated?: string;
};

export const PageDate: React.FC<TPageDate> = ({
	className,
	published,
	created,
	updated,
}) => {
	return (
		<div
			className={`flex flex-wrap gap-x-4 text-xs md:flex-row md:items-center ${className}`}
		>
			<time
				dateTime={published ? published : created}
				className="text-gray-500"
			>
				<strong>Posted:</strong>{' '}
				{formatDate(created, {
					weekday: undefined,
					hour: 'numeric',
					minute: 'numeric',
				})}
			</time>
			{published && updated ? (
				<span>
					<strong>Last updated:</strong>{' '}
					{formatDate(updated, {
						weekday: undefined,
						hour: 'numeric',
						minute: 'numeric',
					})}
				</span>
			) : null}
		</div>
	);
};
