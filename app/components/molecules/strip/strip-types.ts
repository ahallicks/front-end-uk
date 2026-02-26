import type { TPage } from '~/components/atoms/button/button.tsx';

export interface IStrip {
	__typename: 'Strip';
	title: string;
	text: string;
	linkText: string;
	externalUrl?: string;
	page?: TPage;
};
