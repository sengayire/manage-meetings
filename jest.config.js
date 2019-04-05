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
    '!**/server.js',
    '!**/src/utils/ApolloClient.js',
    '!**/src/utils/FirebaseConfig.js',
    '!**/src/components/**',
    '!**/src/components/navbars/',
    '!**/src/components/setup/',
    '!**/src/fixtures/Preview.js',
    '!**/src/graphql/mappers/Resources.js',
    '!**/src/containers/NavBar.js',
    '!**/src/containers/SettingsContent.js',
    '!**/src/containers/RoomSetupView.js',
    '!**/src/App.js',
    '!**/src/index.js',
    '!**/src/containers/index.js',
  ],
  testPathIgnorePatterns: [
    '__mocks__',
    'docs',
    '__tests__/components/setup/',
    '__tests__/components/commons/Dropdown.test.js',
    '__tests__/App.test.js',
    '__tests__/components/login/Login.test.js',
    '__tests__/components/helpers/queryHelpers.test.js',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['jest-canvas-mock'],
};
