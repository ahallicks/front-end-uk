export const StatisticsFragment = `
... on Statistics {
	statTitle
	statContent
	statistics {
		... on Statistic {
			title
			description
		}
	}
}`;
