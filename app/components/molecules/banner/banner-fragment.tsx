export const BannerFragment = `
... on Banner {
	title
	content {
		html
		raw
	}
	links {
		... on ButtonLink {
			linkUrl
			linkText
		}
	}
	bannerStats: statistics {
		... on Statistics {
			statTitle
			statContent
			statistics {
				... on Statistic {
					title
					description
				}
			}
		}
	}
}`;
