---
to: "app/components/<%= type %>/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.tsx"
---
import { clsx } from 'clsx';

import styles from './<%= h.changeCase.paramCase(name) %>.module.css';

export type T<%= h.inflection.camelize(h.changeCase.camelCase(name)) %> = React.PropsWithChildren & {
	className?: string;
}

export const <%= h.inflection.camelize(h.changeCase.camelCase(name)) %>: React.FC<T<%= h.inflection.camelize(h.changeCase.camelCase(name)) %>> = ({ className, ...rest }) => {
	return (
		<div
			className={clsx(styles.base, className)}
			data-e2e-id="<%= h.changeCase.paramCase(name) %>"
			{...rest}
		>
			Component
		</div>
	)
};
