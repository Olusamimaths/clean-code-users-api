let common = [
  'test/features/**/*.feature', // Specify feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require-module tsconfig-paths/register', // Load tsconfig paths
  '--require test/step-definitions/**/*.ts', // Load step definitions
  '--format progress-bar', // Load custom formatter
  '--format @cucumber/pretty-formatter',
].join(' ');

module.exports = { default: common };
