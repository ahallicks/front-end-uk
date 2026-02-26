// This is a simple implementation of ANSI terminal colours.
// Unlike picocolors, it works in NextJS middleware (the Edge runtime causes compatibility issues).
export const tc = {
	blue: (input: string) => `\x1b[36m${input}\x1b[39m`,
	green: (input: string) => `\x1b[32m${input}\x1b[39m`,
	red: (input: string) => `\x1b[31m${input}\x1b[39m`,
	yellow: (input: string) => `\x1b[33m${input}\x1b[39m`,
	bold: (input: string) => `\x1b[1m${input}\x1b[22m`,
	dim: (input: string) => `\x1b[2m${input}\x1b[22m`,
	// If you want more colours or styles, look here: https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences

	box: (input: string) => {
		// Draw an ASCII box around the input.
		let output = '';
		for (let i = 0; i < input.length + 4; i++) {
			output += i === 0 ? '╔' : i === input.length + 3 ? '╗' : '═';
		}
		output += '\n║ ' + input + ' ║\n';
		for (let i = 0; i < input.length + 4; i++) {
			output += i === 0 ? '╚' : i === input.length + 3 ? '╝' : '═';
		}
		return output;
	},
};
