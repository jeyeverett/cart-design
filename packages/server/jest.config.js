/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\@constants/(.*)$': '<rootDir>/src/constants/$1',
    '\\@lib/(.*)$': '<rootDir>/src/lib/$1',
    '\\@services/(.*)$': '<rootDir>/src/services/$1',
    '\\@src/(.*)$': '<rootDir>/src/$1',
    '\\@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  setupFiles: ['dotenv/config'],
};
