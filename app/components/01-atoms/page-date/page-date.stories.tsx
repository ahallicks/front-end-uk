import type { Meta, StoryObj } from '@storybook/react-vite';

import { mockPageDateData } from './page-date.mock.ts';
import { PageDate as PageDateComponent } from './page-date.tsx';

const meta: Meta<typeof PageDateComponent> = {
	title: '01-atoms/Page date',
	component: PageDateComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PageDateComponent>;

export const PageDate: Story = {
	args: mockPageDateData,
};
