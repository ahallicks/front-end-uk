import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	process.env = { ...process.env, ...env };

	return {
		// no Remix Vite plugin here
		plugins: [],
		resolve: {
			tsconfigPaths: true,
		},
	};
});
