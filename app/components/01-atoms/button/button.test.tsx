import type { TButtonLinkWithChildren } from './button.tsx';
import type { UserEvent } from '@testing-library/user-event';

import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { checkA11y } from 'tests/test-utils.ts';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { buttonLinkMock } from './button.mock.ts';
import { ButtonLink } from './button.tsx';

describe('~/components/01-atoms/cta', () => {
	afterEach(() => {
		vi.clearAllMocks();
		cleanup();
	});

	test('passes accessibility checks', async () => {
		const { container } = setupTest();
		await checkA11y(container);
	});

	test('should render a link', async () => {
		const { user, props } = setupTest({ props: { onClick: vi.fn() } });

		const button = screen.getByRole('link', { name: props.linkText });

		expect(button).toBeTruthy();

		await user.click(button);

		expect(props.onClick).toHaveBeenCalledTimes(1);
	});
});

type TestOverrides = {
	props?: Partial<TButtonLinkWithChildren>;
};

type TReturn = {
	props: TButtonLinkWithChildren;
	user: UserEvent;
	container: HTMLElement;
	baseElement: HTMLElement;
};

const getDefaultProps = (
	overrides: Partial<TButtonLinkWithChildren> = {},
): TButtonLinkWithChildren => ({
	...buttonLinkMock,
	...overrides,
});

const setupTest = (overrides: TestOverrides = {}): TReturn => {
	const props = getDefaultProps(overrides.props);
	const Stub = createRoutesStub([
		{
			path: '/',
			Component: () => <ButtonLink {...props} />,
		},
	]);
	const utils = render(<Stub />);

	return {
		...utils,
		props,
		user: userEvent.setup(),
	};
};
