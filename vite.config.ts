/// <reference types="vitest/config" />
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { reactRouter } from '@react-router/dev/vite';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import { DevTools } from '@vitejs/devtools';
import { playwright } from '@vitest/browser-playwright';
import { reactRouterDevTools } from 'react-router-devtools';
import { defineConfig } from 'vite';
const dirname =
	typeof __dirname !== 'undefined'
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

const makePluginArray = () => {
	if (process.env.NODE_ENV === 'test') {
		return [];
	}
	return [reactRouterDevTools(), DevTools(), tailwindcss(), reactRouter()];
};
// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	plugins: makePluginArray(),
	resolve: {
		tsconfigPaths: true,
	},
	test: {
		projects: [
			{
				extends: true,
				test: {
					name: 'unit',
					environment: 'jsdom',
					setupFiles: [
						'./tests/setup-env.ts',
						'./tests/test-setup.ts',
					],
					include: ['**/*.test.{ts,tsx}'],
				},
			},
			// The second project will run the Storybook tests in a browser environment using Playwright
			// You can turn this off by removing this object
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, '.storybook'),
					}),
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [
							{
								browser: 'chromium',
							},
						],
					},
				},
			},
		],
	},
});
