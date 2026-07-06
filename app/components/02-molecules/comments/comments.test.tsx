import type { TComments } from './comments.tsx';
import type { UserEvent } from '@testing-library/user-event';

import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { checkA11y } from 'tests/test-utils.ts';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { mockCommentsData } from './comments.mock.ts';
import { Comments } from './comments.tsx';

describe('~/components/molecules/comments', () => {
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

		const element = screen.getByText(mockCommentsData.comments[0].title);

		expect(element).toBeTruthy();
	});
});

type TestOverrides = {
	props?: Partial<TComments>;
};

type TReturn = {
	props: TComments;
	user: UserEvent;
	container: HTMLElement;
	baseElement: HTMLElement;
};

const getDefaultProps = (overrides: Partial<TComments> = {}): TComments => ({
	...mockCommentsData,
	...overrides,
});

const setupTest = (overrides: TestOverrides = {}): TReturn => {
	const props = getDefaultProps(overrides.props);
	const Stub = createRoutesStub([
		{
			path: '/',
			Component: () => <Comments formKey="test-123" {...props} />,
		},
	]);
	const utils = render(<Stub />);
	return {
		...utils,
		props,
		user: userEvent.setup(),
	};
};
