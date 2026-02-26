export interface IStatistics {
	__typename: 'Statistics';
	statTitle: string;
	statContent: string;
	statistics: IStatistic[];
}

export interface IStatistic {
	__typename: 'Statistic';
	title: string;
	description: string;
}
