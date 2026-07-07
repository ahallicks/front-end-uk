import 'vitest-axe/extend-expect';
import '@testing-library/jest-dom/vitest';

import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

import axe from './configure-axe.ts';
expect.extend(matchers);

export const checkA11y = async (
	component: string | Element,
	axeOptions = {},
): Promise<void> => {
	const results = await axe(component, axeOptions);

	expect(results).toHaveNoViolations();
};
