import type { Preview } from '@storybook/react-vite';

import { withRouter } from 'storybook-addon-remix-react-router';

// @ts-expect-error This file does, in fact, exist
import '../app/app.css';

const preview: Preview = {
	decorators: [withRouter],
	parameters: {
		parameters: {
			controls: {
				matchers: {
					color: /(background|color)$/i,
					date: /Date$/i,
				},
			},

			docs: {
				toc: true,
			},

			layout: 'centered',

			options: {
				storySort: {
					order: [
						'01-atoms',
						'02-molecules',
						'03-organisms',
						'04-layouts',
						'05-templates',
					],
				},
			},

			viewport: {
				viewports: {
					iPhoneSE: {
						name: 'iPhone SE',
						styles: {
							width: '375px',
							height: '667px',
						},
					},
					iPhone14Plus: {
						name: 'iPhone 14 Plus',
						styles: {
							width: '428px',
							height: '926px',
						},
					},
					nexus7: {
						name: 'Nexus 7',
						styles: {
							width: '600px',
							height: '960px',
						},
					},
					ipadMini: {
						name: 'iPad Mini',
						styles: {
							width: '768px',
							height: '1024px',
						},
					},
					ipadPro: {
						name: 'iPad Pro (11-inch)',
						styles: {
							width: '1024px',
							height: '1366px',
						},
					},
					laptopS: {
						name: 'Laptop-S',
						styles: {
							width: '1280px',
							height: '800px',
						},
					},
					macBookPro: {
						name: 'MacBook Pro (15.4-inch)',
						styles: {
							width: '1440px',
							height: '900px',
						},
					},
					desktopHIDPI: {
						name: 'Desktop HIDPI',
						styles: {
							width: '1920px',
							height: '1080px',
						},
					},
				},
			},

			a11y: {
				// 'todo' - show a11y violations in the test UI only
				// 'error' - fail CI on a11y violations
				// 'off' - skip a11y checks entirely
				test: 'todo',
			},
		},
	},
};

export default preview;
