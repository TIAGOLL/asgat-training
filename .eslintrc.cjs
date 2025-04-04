/** @type {import('eslint').Linter.Config} */
module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'standard',
		'plugin:@typescript-eslint/recommended'
	],
	plugins: [
		'simple-import-sort',
		'unused-imports',
		'react',
		'jsx-a11y',
		'@typescript-eslint'
	],
	rules: {
		'space-before-function-paren': ['error', 'never'],
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_'
			}
		],
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'jsx-a11y/alt-text': [
			'warn',
			{
				elements: ['img'],
				img: ['Image']
			}
		],
		'jsx-a11y/aria-props': 'warn',
		'jsx-a11y/aria-proptypes': 'warn',
		'jsx-a11y/aria-unsupported-elements': 'warn',
		'jsx-a11y/role-has-required-aria-props': 'warn',
		'jsx-a11y/role-supports-aria-props': 'warn'
	},
	settings: {
		react: {
			version: 'detect'
		},
		'import/parsers': {
			[require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts']
		}
	}
}
