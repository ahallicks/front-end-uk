import { ButtonLinkFragment } from '~/components/01-atoms/button/button-fragment.ts';

export const CardFragment = `
... on Card {
	__typename
	id
	cardTitle
	cardContent {
		raw
	}
	cardImage {
		url
		width
		height
	}
	cardLinks {
		${ButtonLinkFragment}
	}
}`;
