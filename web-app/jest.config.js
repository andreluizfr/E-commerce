module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/components/**/*.{ts,tsx}',
		'<rootDir>/src/pages/**/*.{ts,tsx}',
        '<rootDir>/src/store/features/**/*.{ts,tsx}',
        '<rootDir>/src/hooks/**/*.{ts,tsx}',
        '<rootDir>/src/libs/**/*.{ts,tsx}'
	],
	coverageThreshold: {
		global: {
		  branches: 70,
		  functions: 70,
		  lines: 70,
		  statements: 70,
		}
	}
};