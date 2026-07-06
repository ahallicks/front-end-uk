import type { IComment } from './comment-types.ts';
import type { RichTextProps } from '@graphcms/rich-text-react-renderer';

import { RichText } from '@graphcms/rich-text-react-renderer';

const rte: RichTextProps['renderers'] = {
	p: ({ children }) => (
		<p className="text-gray-500 dark:text-gray-400">{children}</p>
	),
};

export const Comment: React.FC<
	IComment & {
		isReply?: boolean;
		isPending?: boolean;
		isPreview?: boolean;
		onReply?: () => void;
	}
> = ({
	title,
	comment,
	image,
	createdAt,
	isReply = false,
	isPending = false,
	isPreview = false,
	onReply,
}) => {
	return (
		<div className="flex gap-4">
			{isReply ? (
				<span className="ml-2 shrink-0 text-gray-500 dark:text-gray-400">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 74.5 74.5"
						width="24"
						height="24"
					>
						<path
							d="M10 52.25h40.5v15l24-22-24-22v15H14v-31H0v35c0 5.523 4.477 10 10 10"
							fill="currentColor"
						/>
					</svg>
				</span>
			) : null}
			<article className="relative flex-1 rounded-lg border border-gray-200 bg-white p-6 text-base dark:border-gray-700 dark:bg-gray-800">
				<footer className="mb-2 flex items-center justify-between">
					<div className="flex w-full items-center">
						<p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
							{image ? (
								<img
									className="mr-2 h-6 w-6 rounded-full"
									src={image.url}
									alt=""
									width={image.width}
									height={image.height}
								/>
							) : null}
							{title}
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							<time dateTime={createdAt} title={createdAt}>
								{new Date(createdAt).toLocaleDateString(
									undefined,
									{
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									},
								)}
							</time>
						</p>
						{isPending ? (
							<span className="absolute top-1 right-1 rounded bg-amber-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-amber-900/30 dark:text-gray-400">
								Pending approval
							</span>
						) : null}
						{isPreview ? (
							<span className="absolute top-1 right-1 rounded bg-amber-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-amber-900/30 dark:text-gray-400">
								Preview
							</span>
						) : null}
					</div>
				</footer>
				<div className="prose-sm lg:prose dark:prose-invert">
					<RichText renderers={rte} content={comment.raw} />
				</div>
				{!isPreview && !isPending && !isReply ? (
					<div className="mt-4 flex items-center space-x-4">
						<button
							type="button"
							className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
							onClick={onReply}
						>
							<svg
								className="mr-1.5 h-3.5 w-3.5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 18"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
								/>
							</svg>
							Reply
						</button>
					</div>
				) : null}
			</article>
		</div>
	);
};
