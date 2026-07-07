import sanitizeHtml from 'sanitize-html';

export const sanitizeString = (input: string): string => {
	// Allow only a super restricted set of tags and attributes
	const clean = sanitizeHtml(input, {
		allowedTags: [],
		allowedAttributes: false,
	});
	return clean;
};
