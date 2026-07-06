import type { ActionFunctionArgs } from 'react-router';

import { htmlToSlateAST } from '@graphcms/html-to-slate-ast';
import { GraphQLClient, gql } from 'graphql-request';

// import { getSession } from '~/session.server.ts';
import { getGravatarUrl } from '~/utils/gravatar.ts';
import { sanitizeString } from '~/utils/string-utils.ts';

type TCommentText = {
	type: 'paragraph';
	children: {
		text: string;
	}[];
}[];
export type TComment = {
	email: string;
	title: string;
	comment: {
		raw: {
			children: TCommentText;
		};
	};
	image?: {
		url: string;
		width: number;
		height: number;
	};
	createdAt: string;
};

type TCommentErrors = {
	email?: string | null;
	title?: string | null;
	comment?: string | null;
};

type TCreateResponse =
	| { status: 'OK'; message: TComment }
	| { status: 'Error'; message: string; errors?: TCommentErrors };

const createCommentQuery = gql`
	mutation newComment(
		$title: String!
		$email: String!
		$comment: RichTextAST!
		$approved: Boolean
		$pageId: PageCreateOneInlineInput!
		$parent: CommentCreateOneInlineInput
	) {
		createComment(
			data: {
				title: $title
				comment: $comment
				email: $email
				approved: $approved
				page: $pageId
				parent: $parent
			}
		) {
			id
			title
			email
			comment {
				raw
			}
			createdAt
			page {
				id
			}
		}
	}
`;

export const loader = async (): Promise<Response> => {
	return new Response('Method Not Allowed', { status: 405 });
};

export const action = async ({
	request,
}: ActionFunctionArgs): Promise<Response> => {
	// const session = await getSession(request.headers.get('Cookie'));
	// console.log('Session data:', session.data);
	// const formKey = session.get('formKey');

	const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
	const errors: TCommentErrors = {
		email: null,
		title: null,
		comment: null,
	};
	try {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const confirmEmail = formData.get('confirmEmail') as string;
		const title = formData.get('title') as string;
		const comment = sanitizeString(formData.get('comment') as string);
		const pageId = formData.get('pageId') as string;
		const isPreview = formData.get('preview') === 'true';
		const replyTo = formData.get('replyTo') as string | null;
		// const checkKey = formData.get('formKey') as string;

		// TODO - Implement form key validation to prevent CSRF attacks
		// console.log('formKey from session:', formKey);
		// console.log('formKey from formData:', checkKey);

		/* if (checkKey !== formKey) {
			return createResponse(400, {
				status: 'Error',
				message: 'Invalid form data provided. Please refresh the page and try again.',
			});
		} */

		// A little bit of validation - check required fields are present and email is valid format
		if (
			email.trim() === '' ||
			title.trim() === '' ||
			comment.trim() === ''
		) {
			if (email.trim() === '') errors.email = 'Email is required';
			if (title.trim() === '') errors.title = 'Title is required';
			if (comment.trim() === '') errors.comment = 'Comment is required';
			return createResponse(400, {
				status: 'Error',
				message: 'Missing required fields',
				errors,
			});
		}

		if (confirmEmail.trim() !== '') {
			return createResponse(400, {
				status: 'Error',
				message: 'There was an error with the form.',
			});
		}

		if (!emailRegex.test(email)) {
			// return createResponse(400, { status: 'Error', message: 'Invalid email format' });
			errors.email = 'Invalid email format';
		}

		if (errors.email || errors.title || errors.comment) {
			return createResponse(400, {
				status: 'Error',
				message: 'Invalid input',
				errors,
			});
		}

		const commentHtml = comment
			.split('\n\n')
			.map((line) => (line.trim() !== '' ? `<p>${line}</p>` : ''))
			.join('')
			.split('\n')
			.map((line) => (line.trim() !== '' ? `<br/>${line}` : ''))
			.join('');
		const nodeArray = (await htmlToSlateAST(commentHtml)) as TCommentText;

		if (isPreview) {
			const createdAt = new Date().toISOString();
			return createResponse(200, {
				status: 'OK',
				message: {
					email,
					title,
					comment: { raw: { children: nodeArray } },
					image: {
						url: getGravatarUrl(email),
						width: 80,
						height: 80,
					},
					createdAt,
				},
			});
		}

		const hygraph = new GraphQLClient(
			process.env.HYGRAPH_ENDPOINT as string,
			{
				headers: {
					Authorization: `Bearer ${process.env.HYGRAPH_COMMENT_TOKEN}`,
				},
			},
		);
		// console.log(JSON.stringify(createCommentQuery({ email, title, comment: nodeArray }), null, 2));
		const commentAdded = await hygraph.request(createCommentQuery, {
			email,
			title,
			comment: { children: nodeArray },
			image: {
				url: getGravatarUrl(email),
				width: 80,
				height: 80,
			},
			approved: false,
			pageId: { connect: { id: pageId } },
			parent: replyTo ? { connect: { id: replyTo } } : undefined,
		});
		if (!commentAdded) {
			return createResponse(500, {
				status: 'Error',
				message: 'Failed to add comment',
			});
		}

		return createResponse(200, {
			status: 'OK',
			message: {
				...commentAdded.createComment,
				image: { url: getGravatarUrl(email), width: 80, height: 80 },
			},
		});
	} catch (error) {
		console.error('Error adding comment:', error);
		return createResponse(500, {
			status: 'Error',
			message:
				'Failed to add comment. Missing required fields or invalid data.',
		});
	}
};

const createResponse = (
	statusCode: number,
	result: TCreateResponse,
): Response => {
	return Response.json(result, { status: statusCode });
};
