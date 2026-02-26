export const ContentFragment = `
... on Content {
	title
	pretitle
	introduction
	contentImage: image {
		url
		width
		height
	}
	article: content {
		__typename
		... on Article {
			content {
				raw
			}
		}
		... on FeatureBlock {
			features {
				... on Feature {
					title
					headline
					description
					icon
				}
			}
		}
	}
}`;
