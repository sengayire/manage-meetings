module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/vendor/**',
    '!**/src/index.js',
    '!**/*.eslintrc.js',
    '!**/coverage/**',
    '!**/webpack.config.js',
    '!**/config/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/postcss.config.js',
    '!**/setupTests.js',
    '!**/jest.config.js',
    '!**/src/utils/ApolloClient.js',
    '!**/src/utils/FirebaseConfig.js',
  ],
  testPathIgnorePatterns: ['__mocks__', 'docs'],
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['jest-canvas-mock'],
};
