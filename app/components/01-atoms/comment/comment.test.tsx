import type { IComment } from './comment-types.ts';
import type { UserEvent } from '@testing-library/user-event';

import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { checkA11y } from 'tests/test-utils.ts';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { mockCommentData } from './comment.mock.ts';
import { Comment } from './comment.tsx';

describe('~/components/atoms/comment', () => {
	afterEach(() => {
		vi.clearAllMocks();
		cleanup();
	});

	test('passes accessibility checks', async () => {
		const { container } = setupTest();
		await checkA11y(container);
	});

	test('should render', async () => {
		setupTest();

		const element = screen.getByText(mockCommentData.title);

		expect(element).toBeTruthy();
	});
});

type TestOverrides = {
	props?: Partial<IComment>;
};

type TReturn = {
	props: IComment;
	user: UserEvent;
	container: HTMLElement;
	baseElement: HTMLElement;
};

const getDefaultProps = (overrides: Partial<IComment> = {}): IComment => ({
	...mockCommentData,
	...overrides,
});

const setupTest = (overrides: TestOverrides = {}): TReturn => {
	const props = getDefaultProps(overrides.props);
	const utils = render(<Comment {...props} />);
	return {
		...utils,
		props,
		user: userEvent.setup(),
	};
};
