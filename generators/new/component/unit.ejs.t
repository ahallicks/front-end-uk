---
to: "app/components/<%= type %>/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.test.tsx"
---
import type { T<%= h.inflection.camelize(h.changeCase.camelCase(name)) %> } from './<%= h.changeCase.paramCase(name) %>.tsx';
import type { UserEvent } from '@testing-library/user-event';

import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { checkA11y } from 'tests/test-utils.ts';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { mock<%= h.inflection.camelize(h.changeCase.camelCase(name)) %>Data } from './<%= h.changeCase.paramCase(name) %>.mock.ts';
import { <%= h.inflection.camelize(h.changeCase.camelCase(name)) %> } from './<%= h.changeCase.paramCase(name) %>.tsx';

describe('~/components/<%= type %>/<%= h.changeCase.paramCase(name) %>', () => {
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

		const element = screen.getByText('Component');
		
		expect(element).toBeTruthy();
	});
})

type TestOverrides = {
	props?: Partial<T<%= h.inflection.camelize(h.changeCase.camelCase(name)) %>>;
};

type TReturn = {
	props: T<%= h.inflection.camelize(h.changeCase.camelCase(name)) %>;
	user: UserEvent;
	container: HTMLElement;
	baseElement: HTMLElement;
};

const getDefaultProps = (overrides: Partial<T<%= h.inflection.camelize(h.changeCase.camelCase(name)) %>> = {}): T<%= h.inflection.camelize(h.changeCase.camelCase(name)) %> => ({
	...mock<%= h.inflection.camelize(h.changeCase.camelCase(name)) %>Data,
	...overrides,
});

const setupTest = (overrides: TestOverrides = {}): TReturn => {
	const props = getDefaultProps(overrides.props);
	const utils = render(
		<<%= h.inflection.camelize(h.changeCase.camelCase(name)) %> {...props}>{props.children ?? 'Component'}</<%= h.inflection.camelize(h.changeCase.camelCase(name)) %>>
	);
	return {
		...utils,
		props,
		user: userEvent.setup(),
	};
};
