function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __browser_json = require.resolve("./browser.json"),
      __loadTag = __helpers.t,
      lasso_page = __loadTag(require("lasso/taglib/page-tag")),
      lasso_head = __loadTag(require("lasso/taglib/head-tag")),
      lasso_body = __loadTag(require("lasso/taglib/body-tag"));

  return function render(data, out) {
    out.w("<!DOCTYPE html>");

    lasso_page({
        packagePath: __browser_json,
        dirname: __dirname,
        filename: __filename
      }, out);

    out.w("<html><head><title>Marko notification demo</title>");

    lasso_head({}, out);

    out.w("</head><body><button id=\"simple-notification-btn\">Generate Simple Notification</button>");

    lasso_body({}, out);

    out.w("</body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
