module.exports = function (markoDevTools) {
  // allow promises to be used during test
  markoDevTools.config.browserTestDependencies = [
    'bluebird/js/browser/bluebird.core.js'
  ]
}
