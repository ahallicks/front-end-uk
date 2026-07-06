import type { Meta, StoryObj } from '@storybook/react-vite';

import { mockAlertData } from './alert.mock.ts';
import { Alert as AlertComponent } from './alert.tsx';

const meta: Meta<typeof AlertComponent> = {
	title: 'atoms/Alert',
	component: AlertComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AlertComponent>;

export const Alert: Story = {
	args: mockAlertData,
};
