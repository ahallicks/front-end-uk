import type { TAlert } from './alert.tsx';
import type { UserEvent } from '@testing-library/user-event';

import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { checkA11y } from 'tests/test-utils.ts';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { mockAlertData } from './alert.mock.ts';
import { Alert } from './alert.tsx';

describe('~/components/atoms/alert', () => {
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

		const element = screen.getByText('Success Alert');

		expect(element).toBeTruthy();
	});
});

type TestOverrides = {
	props?: Partial<TAlert>;
};

type TReturn = {
	props: TAlert;
	user: UserEvent;
	container: HTMLElement;
	baseElement: HTMLElement;
};

const getDefaultProps = (overrides: Partial<TAlert> = {}): TAlert => ({
	...mockAlertData,
	...overrides,
});

const setupTest = (overrides: TestOverrides = {}): TReturn => {
	const props = getDefaultProps(overrides.props);
	const utils = render(
		<Alert {...props}>{props.children ?? 'Component'}</Alert>,
	);
	return {
		...utils,
		props,
		user: userEvent.setup(),
	};
};
