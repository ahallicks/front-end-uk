import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../app/**/*.mdx', '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	staticDirs: ['../public'],
	addons: [
		'@chromatic-com/storybook',
		'@storybook/addon-vitest',
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
		'@storybook/addon-onboarding',
		'storybook-addon-remix-react-router',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {
			builder: {
				viteConfigPath: 'sb-vite.config.ts',
			},
		},
	},
};
export default config;
