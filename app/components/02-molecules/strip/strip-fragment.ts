export const StripFragment = `
... on Strip {
	title
	text
	linkText
	externalUrl
	page {
		... on Page {
			pageName
			slug
			parentPage {
				... on Page {
					pageName
					slug
					parentPage {
						... on Page {
							pageName
							slug
						}
					}
				}
			}
		}
	}
}`;
