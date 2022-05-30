# vite-React-ts-prettier-eslint-template

_Step 1_

```bash
npm create vite@latest your_app_name
```

This will init a vite project, follow the CLI prompt and choose `vanilla`

Now we will set up the template to work with React `^17.0.2`

_Step 2_

```bash
cd you_app_name

# Install react and react-dom as dependencies
npm i -S react react-dom
```

`React` and `react-dom` are now installed as dependencies in `package.json`

_Step 3_

```bash
# Install dev-dependencies
# @types/react @types/react-dom
# @typescript-eslint/eslint-plugin @typescript-eslint/parser
# @vitejs/plugin-react-refresh eslint
# eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y
# eslint-plugin-prettier eslint-plugin-react eslint-plugin-simple-import-sort
# pre-commit prettier typescript vite vite-tsconfig-paths

npm i -D @types/react @types/react-dom @typescript-eslint/eslint-plugin @typescript-eslint/parser **@vitejs/plugin-react-refresh eslint eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-simple-import-sort pre-commit prettier typescript vite vite-tsconfig-paths**
```

Here’s an intro to each dev-dependency we have installed

- `@types/react` This package contains type definitions for React
- `@types/react-dom` This package contains **_type_** definitions for **_React_** (**_react_**-**_dom_**)
- `@typescript-eslint/eslint-plugin` Monorepo for all the tooling which enables ESLint to support TypeScript
- `@typescript-eslint/parser` An ESLint parser which leverages **[TypeScript ESTree](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/typescript-estree)**
   to allow for ESLint to lint TypeScript source code
- `@vitejs/plugin-react-refresh` \***\*Provides **[React Refresh](https://www.npmjs.com/package/react-refresh)\*\* support for Vite
- **`eslint`** ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code
- `eslint-config-prettier` Turns off all rules that are unnecessary or might conflict with [Prettier]
- `eslint-plugin-import` This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names
- `eslint-plugin-jsx-a11y` Static AST checker for accessibility rules on JSX elements
- `eslint-plugin-prettier` Runs **_prettier_** as an **_eslint_** rule
- `eslint-plugin-reac` **_React_** specific linting rules for **_ESLint_**
- `eslint-plugin-simple-import-sort` Easy autofixable **_import sorting_**
- `pre-commit` **pre-commit** is a pre-commit hook installer for _git_. It will ensure that your _npm test_ (or other specified scripts) passes before you can commit your changes
- `prettier` **_Prettier_** is an opinionated code formatter
- `typescript` add typescript language support
- `vite` Next Generation [Frontend Tooling](https://www.npmjs.com/package/vite)
- `vite-tsconfig-paths` **_Vite_** resolver for TypeScript compilerOptions.**_paths_**

These are the dev-dependencies so far.

_Step 4_

Create a `tsconfig.json` to configure typesacript language settings

```json
{
	"compilerOptions": {
		"target": "ESNext",
		"lib": ["DOM", "DOM.Iterable", "ESNext"],
		"types": ["vite/client"],
		"baseUrl": "src",
		"allowJs": false,
		"skipLibCheck": false,
		"esModuleInterop": false,
		"allowSyntheticDefaultImports": true,
		"strict": true,
		"forceConsistentCasingInFileNames": true,
		"module": "ESNext",
		"moduleResolution": "Node",
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react"
	},
	"include": ["./src"],
	"exclude": ["node_modules"]
}
```

_Step 5_

Create a `.eslintrc.js` to configure eslint

```jsx
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				paths: ['src'],
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	env: {
		browser: true,
		amd: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended', // Make sure this is always the last element in the array.
	],
	plugins: ['simple-import-sort', 'prettier'],
	rules: {
		'prettier/prettier': ['error', {}, { usePrettierrc: true }],
		'react/react-in-jsx-scope': 'off',
		'jsx-a11y/accessible-emoji': 'off',
		'react/prop-types': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: ['Link'],
				specialLink: ['hrefLeft', 'hrefRight'],
				aspects: ['invalidHref', 'preferButton'],
			},
		],
	},
};
```

_Step 6_

Create a `.prettierrc.js` to configure syntax formatting

```jsx
module.exports = {
	semi: true,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	trailingComma: 'all',
	singleQuote: true,
	printWidth: 90,
	tabWidth: 2,
	endOfLine: 'auto',
};

//MORE OPTIONS
// {
//   "arrowParens": "always",
//   "bracketSpacing": true,
//   "embeddedLanguageFormatting": "auto",
//   "htmlWhitespaceSensitivity": "css",
//   "insertPragma": false,
//   "jsxBracketSameLine": false,
//   "jsxSingleQuote": false,
//   "proseWrap": "preserve",
//   "quoteProps": "as-needed",
//   "requirePragma": false,
//   "semi": true,
//   "singleQuote": false,
//   "tabWidth": 2,
//   "trailingComma": "es5",
//   "useTabs": false,
//   "printWidth": 100
// }
```

_Step 7_

Create a `.eslintignore` and `.prettierignore`

```
node_modules
.DS_Store
dist
dist-ssr
*.local
node_modules/*
```

_Step 9_

Add scripts to `package.json`

```json
{
	"name": "vite-react-eslint-prettier-ts",
	"private": true,
	"version": "0.0.0",
	"scripts": {
		"dev": "vite",
		"build": "tsc && vite build",
		"preview": "vite preview",
		"lint:fix": "eslint ./src --ext .jsx,.js,.ts,.tsx --quiet --fix --ignore-path ./.gitignore",
		"lint:format": "prettier --loglevel warn --write \"./**/*.{js,jsx,ts,tsx,css,md,json}\"",
		"lint": "npm lint:format && npm lint:fix",
		"type-check": "tsc"
	},
	"devDependencies": {
		"@types/react": "^17.0.39",
		"@types/react-dom": "^17.0.13",
		"@typescript-eslint/eslint-plugin": "^5.14.0",
		"@typescript-eslint/parser": "^5.14.0",
		"@vitejs/plugin-react-refresh": "^1.3.6",
		"eslint": "^8.10.0",
		"eslint-config-prettier": "^8.5.0",
		"eslint-plugin-import": "^2.25.4",
		"eslint-plugin-jsx-a11y": "^6.5.1",
		"eslint-plugin-prettier": "^4.0.0",
		"eslint-plugin-react": "^7.29.3",
		"eslint-plugin-simple-import-sort": "^7.0.0",
		"pre-commit": "^1.2.2",
		"prettier": "^2.5.1",
		"typescript": "^4.6.2",
		"vite": "^2.8.0",
		"vite-tsconfig-paths": "^3.4.1"
	},
	"dependencies": {
		"react": "^17.0.2",
		"react-dom": "^17.0.2"
	},
	"pre-commit": "lint"
}
```
