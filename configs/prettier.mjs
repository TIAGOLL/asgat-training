/** @typedef {import("prettier").Config} PrettierConfig */

/** @type {PrettierConfig} */

const config = {
	plugins: ["prettier-plugin-tailwindcss"],
	printWidth: 150,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	singleQuote: true,
	quoteProps: "as-needed",
	jsxSingleQuote: true,
	trailingComma: "es5",
	bracketSpacing: true,
	endOfLine: "crlf",
	bracketSameLine: false,
	arrowParens: "always",
	singleAttributePerLine: false,
	requirePragma: false,
	
};

export default config;