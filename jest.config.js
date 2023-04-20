module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	testMatch: [
		"<rootDir>/src/__tests__/**/*.(spec|test).[jt]s?(x)"
	],
	collectCoverage: false,
	collectCoverageFrom: [
		'<rootDir>/src/controllers/**/*.{ts,tsx}',
		'<rootDir>/src/services/**/*.{ts,tsx}'
	],
	coverageThreshold: {
		global: {
		  branches: 70,
		  functions: 70,
		  lines: 70,
		  statements: 70,
		},
		'./src/controllers/Payments': {
			branches: 100,
			functions: 100,
			lines: 90,
			statements: 90,
		}
	}
};