import type { Meta, StoryObj } from '@storybook/react-vite';

import { mockCommentsData } from './comments.mock.ts';
import { Comments as CommentsComponent } from './comments.tsx';

const meta: Meta<typeof CommentsComponent> = {
	title: 'molecules/Comments',
	component: CommentsComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CommentsComponent>;

export const Comments: Story = {
	args: mockCommentsData,
};
