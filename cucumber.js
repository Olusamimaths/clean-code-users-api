let common = [
  'test/features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require test/step-definitions/**/*.ts', // Load step definitions
  '--require-module tsconfig-paths/register', // Load tsconfig paths
  '--format progress-bar', // Load custom formatter
  '--format @cucumber/pretty-formatter',
].join(' ');

module.exports = {
  default: common,
};
