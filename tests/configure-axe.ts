// Global helper file (axe-helper.js)
import { configureAxe } from 'vitest-axe';

const axe = configureAxe({
	globalOptions: {
		checks: [
			{
				id: 'color-contrast',
				enabled: false,
			},
		],
	},
});

export default axe;
