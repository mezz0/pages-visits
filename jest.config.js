module.exports = {
  setupFiles: [ './jest.config.jsx'],
  snapshotSerializers: ['jest-serializer-html-string'],
  testMatch: ['./**/spec/**/*.js?(x)', './**/__tests__/**/*.js?(x)'],
  testPathIgnorePatterns: ['/node_modules/', 'spec/javascripts/fixtures/', 'spec/fixtures/', 'spec/shared_test/', 'spec/helpers/'],
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx'],
  coveragePathIgnorePatterns: ['index.js?(x)', 'dependency.js', 'domMutation.js', 'option.js', 'widgetLoader.js', 'src/common/timezone-data'],
  coverageDirectory: '<rootDir>/coverage',
  transform: { '^.+\\.jsx?$': 'babel-jest' },
};
