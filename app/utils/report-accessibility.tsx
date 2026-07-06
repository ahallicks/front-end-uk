'use client';

import React from 'react';

export const Axe: React.FC = (config?: Record<string, unknown>) => {
	if (
		typeof window !== 'undefined' &&
		process.env.NODE_ENV !== 'production'
	) {
		Promise.all([import('@axe-core/react'), import('react-dom')]).then(
			([axe, ReactDOM]) => axe.default(React, ReactDOM, 1000, config),
		);
	}
	return null;
};
