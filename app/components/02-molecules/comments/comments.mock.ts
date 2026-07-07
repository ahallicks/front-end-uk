import type { TComments } from './comments.tsx';

export const mockCommentsData: TComments = {
	pageId: 'test-page-id',
	comments: [
		{
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
				id: 'test-page-id',
			},
		},
		{
			id: '2',
			title: 'I have a question',
			email: 'test1@test.com',
			createdAt: '2024-01-02T15:30:00Z',
			comment: {
				raw: {
					children: [
						{
							type: 'paragraph',
							children: [
								{
									text: 'Can you provide more details on the implementation?',
								},
							],
						},
					],
				},
			},
			page: {
				id: 'test-page-id-2',
			},
		},
	],
};
