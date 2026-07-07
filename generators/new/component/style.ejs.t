---
to: "app/components/<%= type %>/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.module.css"
---
@layer <%= type.split('-')[1] %> {
	.base {
		color: inherit;
	}
}
