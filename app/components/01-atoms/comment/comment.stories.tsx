import type { Meta, StoryObj } from '@storybook/react-vite';

import { mockCommentData } from './comment.mock.ts';
import { Comment as CommentComponent } from './comment.tsx';

const meta: Meta<typeof CommentComponent> = {
	title: 'atoms/Comment',
	component: CommentComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CommentComponent>;

export const Comment: Story = {
	args: mockCommentData,
};
