import type { IComment } from '~/components/01-atoms/comment/comment-types.ts';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useFetcher } from 'react-router';

import { Alert } from '~/components/01-atoms/alert/alert.tsx';
import { Button } from '~/components/01-atoms/button/button.tsx';
import { Comment } from '~/components/01-atoms/comment/comment.tsx';
import { Form } from '~/components/01-atoms/form/form.tsx';
import { LoadIcon } from '~/components/01-atoms/icon/icon.tsx';

import styles from './comments.module.css';

export type TComments = {
	comments: IComment[] & {
		replies?: IComment[];
	};
	pageId: string;
};

const CommentReply = ({ comment }: { comment: IComment }) => {
	return (
		<footer className="flex items-center justify-between">
			<div className="flex w-full items-center">
				<p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
					{comment.image ? (
						<img
							className="mr-2 h-6 w-6 rounded-full"
							src={comment.image.url}
							alt=""
							width={comment.image.width}
							height={comment.image.height}
						/>
					) : null}
					{comment.title}
				</p>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					<time
						dateTime={comment.createdAt}
						title={comment.createdAt}
					>
						{new Date(comment.createdAt).toLocaleDateString(
							undefined,
							{
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							},
						)}
					</time>
				</p>
			</div>
		</footer>
	);
};

const CommentAlert = ({ comment }: { comment: IComment }) => (
	<>
		<Alert title="Success" type="success" className="mb-4">
			Your comment has been submitted and is pending approval.
		</Alert>
		<Comment {...comment} isPending />
	</>
);

export const Comments: React.FC<TComments & { formKey: string }> = ({
	comments,
	pageId,
	formKey,
}) => {
	const fetcher = useFetcher();

	const [title, setTitle] = useState('');
	const [email, setEmail] = useState('');
	const [confirmEmail, setConfirmEmail] = useState('');
	const [comment, setComment] = useState('');
	const [previewing, setPreviewing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [pageLoading, setPageLoading] = useState(true);
	const [userComment, setUserComment] = useState<IComment | null>(null);
	const [reply, setReply] = useState<string | null>(null);

	const titleRef = useRef<HTMLInputElement>(null);

	const primaryComments = comments.filter((comment) => !comment.parent);
	const commentsWithReplies = primaryComments.map((comment) => {
		const replies = comments.filter(
			(c) => c.parent && c.parent.id === comment.id,
		);
		return { ...comment, replies };
	});

	const getPreview = async ({
		title,
		email,
		comment,
	}: {
		title: string;
		email: string;
		confirmEmail: string;
		comment: string;
	}): Promise<void> => {
		setPreviewing(true);
		sessionStorage.setItem('commentTitle', title);
		sessionStorage.setItem('commentEmail', email);
		sessionStorage.setItem('commentComment', comment);
		fetcher.submit(
			{
				title,
				email,
				confirmEmail,
				comment,
				pageId,
				formKey,
				preview: 'true',
			},
			{
				method: 'post',
				action: '/api/add-comment',
				preventScrollReset: true,
			},
		);
	};

	useEffect(() => {
		if (fetcher.state === 'idle' && loading) {
			setLoading(false);
		}

		if (fetcher.state !== 'idle' && !loading) {
			setLoading(true);
		}

		if (fetcher.data && fetcher.data.status === 'OK' && !previewing) {
			sessionStorage.setItem('commentTitle', title);
			sessionStorage.setItem('commentEmail', email);
			sessionStorage.setItem('commentComment', comment);
			sessionStorage.setItem(
				'comment',
				JSON.stringify(fetcher.data.message),
			);
		}
	}, [fetcher, previewing, title, email, comment, loading]);

	useEffect(() => {
		// Check to see if there's a pending comment in session that
		// has now been approved
		const sessionComment = sessionStorage.getItem('comment');
		const userComment: IComment | null = sessionComment
			? JSON.parse(sessionComment)
			: null;
		if (userComment && userComment.page.id === pageId) {
			const hasUserComment = comments.find(
				(comment) => comment.id === userComment?.id,
			);
			if (hasUserComment) {
				sessionStorage.removeItem('comment');
				sessionStorage.removeItem('commentTitle');
				sessionStorage.removeItem('commentEmail');
				sessionStorage.removeItem('commentComment');
			} else {
				setUserComment(hasUserComment || userComment);
			}
		}

		// If we have something in session storage, it's because the user
		// has just submitted a comment and is waiting for approval. We can pre-fill
		// the form with their previous input to save them some time in case they
		// want to submit another comment while waiting for approval.
		if (sessionStorage.getItem('commentTitle')) {
			setTitle(sessionStorage.getItem('commentTitle')!);
		}
		if (sessionStorage.getItem('commentEmail')) {
			setEmail(sessionStorage.getItem('commentEmail')!);
		}
		if (sessionStorage.getItem('commentComment')) {
			setComment(sessionStorage.getItem('commentComment')!);
		}

		if (pageLoading) {
			setPageLoading(false);
		}
	}, []);

	return (
		<section
			className="segment mx-auto max-w-7xl px-6 lg:px-8"
			data-testid="comments"
		>
			<div className="mx-auto flex max-w-2xl flex-col gap-6 lg:gap-8">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">
						Discussion ({comments.length})
					</h2>
				</div>
				{pageLoading ? (
					<div className="flex items-center justify-center gap-8 rounded-lg rounded-t-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
						Loading comments... <LoadIcon width={60} height={30} />
					</div>
				) : fetcher.data &&
				  fetcher.data.status === 'OK' &&
				  !previewing ? (
					<CommentAlert comment={fetcher.data.message} />
				) : userComment ? (
					<CommentAlert comment={userComment} />
				) : (
					<fetcher.Form
						method="post"
						action="/api/add-comment"
						preventScrollReset
						onSubmit={() => {
							setPreviewing(false);
						}}
						className="flex flex-col gap-4"
					>
						<Form.FormField
							error={fetcher.data?.errors?.title}
							errorId="title-error"
						>
							<Form.Label htmlFor="title" className="sr-only">
								Title
							</Form.Label>
							<Form.Input
								id="title"
								type="text"
								name="title"
								placeholder="Comment title"
								className="scroll-mt-28"
								onChange={(e) => setTitle(e.target.value)}
								invalidId={
									fetcher.data?.errors?.title
										? 'title-error'
										: undefined
								}
								value={title}
								ref={titleRef}
							/>
						</Form.FormField>
						<Form.FormField
							error={fetcher.data?.errors?.email}
							errorId="email-error"
						>
							<Form.Label htmlFor="email" className="sr-only">
								Email
							</Form.Label>
							<Form.Input
								id="email"
								type="email"
								name="email"
								placeholder="Your email"
								onChange={(e) => setEmail(e.target.value)}
								invalidId={
									fetcher.data?.errors?.email
										? 'email-error'
										: undefined
								}
								value={email}
							/>
						</Form.FormField>
						<div className={styles.confirm}>
							<label htmlFor="confirmEmail" className="sr-only">
								Confirm email
							</label>
							<input
								id="confirmEmail"
								type="email"
								name="confirmEmail"
								aria-required="false"
								onChange={(e) =>
									setConfirmEmail(e.target.value)
								}
							/>
						</div>
						<Form.FormField
							error={fetcher.data?.errors?.comment}
							errorId="comment-error"
						>
							<Form.Label htmlFor="comment" className="sr-only">
								Comment
							</Form.Label>
							<Form.Textarea
								id="comment"
								name="comment"
								rows={6}
								placeholder="Write a comment..."
								onChange={(e) => setComment(e.target.value)}
								invalidId={
									fetcher.data?.errors?.comment
										? 'comment-error'
										: undefined
								}
								value={comment}
							/>
						</Form.FormField>
						{reply ? (
							<>
								<div className="relative rounded border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400">
									<Button
										type="button"
										onClick={() => setReply(null)}
										className="absolute top-1 right-1"
										size="small"
									>
										Cancel
									</Button>
									Replying to comment:
									<div className="mt-4 rounded border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
										<CommentReply
											comment={comments.find(
												(c) => c.id === reply,
											)!}
										/>
									</div>
								</div>
								<input
									type="hidden"
									name="replyTo"
									value={reply}
								/>
							</>
						) : null}
						<input type="hidden" name="pageId" value={pageId} />
						<input type="hidden" name="formKey" value={formKey} />

						{fetcher.data && fetcher.data.status === 'Error' ? (
							<Alert
								type="error"
								className="flex-1"
								aria-live="assertive"
							>
								{fetcher.data.message}
							</Alert>
						) : null}

						{loading ? (
							<Button
								type="button"
								disabled
								className="self-start"
							>
								Loading <LoadIcon width={32} height={16} />
							</Button>
						) : (
							<div className="flex gap-4">
								<Button type="submit">Post comment</Button>
								{title.trim() !== '' &&
								email.trim() !== '' &&
								comment.trim() !== '' ? (
									<Button
										type="button"
										variation="secondary"
										onClick={() =>
											getPreview({
												title,
												email,
												confirmEmail,
												comment,
											})
										}
									>
										Preview
									</Button>
								) : null}
							</div>
						)}
					</fetcher.Form>
				)}
				{previewing &&
				fetcher.data &&
				fetcher.data.status === 'OK' &&
				!loading ? (
					<Comment {...fetcher.data.message} isPreview />
				) : null}
				{commentsWithReplies.map((comment) => (
					<Fragment key={comment.id}>
						<Comment
							{...comment}
							onReply={() => {
								setReply(comment.id);
								titleRef.current?.scrollIntoView({
									behavior: 'smooth',
									block: 'start',
								});
							}}
						/>
						{comment.replies
							? comment.replies.map((reply) => (
									<Comment
										key={reply.id}
										{...reply}
										isReply
									/>
								))
							: null}
					</Fragment>
				))}
			</div>
		</section>
	);
};
