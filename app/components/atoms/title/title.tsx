interface Title {
	title: string;
	content: string;
}

export const Title: React.FC<Title> = ({ title, content }) => {
	return (
		<div className="mx-auto max-w-4xl text-center">
			<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
				{title}
			</h2>
			<p className="mt-4 text-lg leading-6 text-gray-600">{content}</p>
		</div>
	);
};
