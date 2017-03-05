module.exports = function (markoDevTools) {
  markoDevTools.config.browserTestDependencies = [
    // allow promises to be used during test
    'bluebird/js/browser/bluebird.core.js',

    // add unit test for index file to be run
    'require-run: ./test/create-test.js'
  ]
}
