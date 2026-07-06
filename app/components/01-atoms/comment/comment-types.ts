import type { RichTextProps } from '@graphcms/rich-text-react-renderer';

export interface IComment {
	id: string;
	email: string;
	title: string;
	image?: {
		url: string;
		width: number;
		height: number;
	};
	createdAt: string;
	comment: {
		raw: RichTextProps['content'];
	};
	page: {
		id: string;
	};
	parent?: {
		id: string;
	};
}
