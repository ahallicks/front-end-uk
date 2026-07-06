import type { IComment } from './comment-types.ts';

export const mockCommentData: IComment = {
	id: '1',
	title: 'Great article!',
	email: 'test@test.com',
	createdAt: '2024-01-01T12:00:00Z',
	comment: {
		raw: {
			children: [
				{
					type: 'paragraph',
					children: [
						{
							text: 'I really enjoyed reading this. Thanks for sharing!',
						},
					],
				},
			],
		},
	},
	page: {
		id: 'page-1',
	},
};
