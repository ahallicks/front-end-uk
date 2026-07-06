import type { Meta, StoryObj } from '@storybook/react-vite';

import { buttonLinkMock } from './button.mock.ts';
import { ButtonLink } from './button.tsx';

const meta = {
	title: '01-atoms/Button Link',
	component: ButtonLink,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variation: {
			control: 'select',
			options: ['primary', 'secondary', 'tertiary'],
		},
		openNewWindow: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		...buttonLinkMock,
	},
};

export const Secondary: Story = {
	args: {
		...buttonLinkMock,
		linkText: 'Secondary Button',
		variation: 'secondary',
	},
};

export const Tertiary: Story = {
	args: {
		...buttonLinkMock,
		linkText: 'Tertiary Button',
		variation: 'tertiary',
	},
};

export const OpenInNewWindow: Story = {
	args: {
		...buttonLinkMock,
		linkText: 'External Link',
		linkUrl: 'https://example.com',
		variation: 'primary',
		openNewWindow: true,
	},
};
