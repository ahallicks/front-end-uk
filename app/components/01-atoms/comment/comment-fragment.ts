export const CommentFragment = `
...on Comment {
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
	parent {
		id
	}
}
`;
