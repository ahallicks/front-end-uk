import type { TPageDate } from './page-date.tsx';
import type { UserEvent } from '@testing-library/user-event';

import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { checkA11y } from 'tests/test-utils.ts';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { mockPageDateData } from './page-date.mock.ts';
import { PageDate } from './page-date.tsx';

describe('~/components/01-atoms/page-date', () => {
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

		const element = screen.getByText('Posted:');

		expect(element).toBeTruthy();
	});
});

type TestOverrides = {
	props?: Partial<TPageDate>;
};

type TReturn = {
	props: TPageDate;
	user: UserEvent;
	container: HTMLElement;
	baseElement: HTMLElement;
};

const getDefaultProps = (overrides: Partial<TPageDate> = {}): TPageDate => ({
	...mockPageDateData,
	...overrides,
});

const setupTest = (overrides: TestOverrides = {}): TReturn => {
	const props = getDefaultProps(overrides.props);
	const utils = render(<PageDate {...props} />);
	return {
		...utils,
		props,
		user: userEvent.setup(),
	};
};
