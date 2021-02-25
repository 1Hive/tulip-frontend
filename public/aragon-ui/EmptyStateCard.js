'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./slicedToArray-a8a77f0e.js');
require('./unsupportedIterableToArray-f175acfa.js');
var React = require('react');
require('./_commonjsHelpers-1b94f6bc.js');
var index$1 = require('./index-46d0e707.js');
require('./defineProperty-3cad0327.js');
require('./toConsumableArray-cc0d28a9.js');
var _styled = require('styled-components');
require('./getPrototypeOf-55c9e80c.js');
require('./color.js');
require('./css.js');
require('./miscellaneous.js');
var environment = require('./environment.js');
require('./font.js');
require('./keycodes.js');
require('./url.js');
var constants = require('./constants.js');
var textStyles = require('./text-styles.js');
require('./theme-dark.js');
require('./theme-light.js');
var Theme = require('./Theme.js');
var _extends = require('./extends-023d783e.js');
var objectWithoutProperties = require('./objectWithoutProperties-c6d3675c.js');
var index = require('./index-4def0554.js');
require('./FocusVisible.js');
require('./ButtonBase.js');
require('./getDisplayName-7f913e84.js');
var PublicUrl = require('./PublicUrl-7d4b6d6d.js');
var Card = require('./Card.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);

var illustrationDefault = "48526b4ed811c6ff.png";

var _StyledCard = _styled__default['default'](Card.default).withConfig({
  displayName: "EmptyStateCard___StyledCard",
  componentId: "ov2yly-0"
})(["display:grid;grid-template-columns:1fr;grid-template-rows:", "px 1fr auto;height:", "px;padding:", "px;text-align:center;"], function (p) {
  return p._css;
}, function (p) {
  return p._css2;
}, function (p) {
  return p._css3;
});

var _StyledDiv = _styled__default['default']("div").withConfig({
  displayName: "EmptyStateCard___StyledDiv",
  componentId: "ov2yly-1"
})(["display:flex;justify-content:center;overflow:hidden;"]);

var _StyledDiv2 = _styled__default['default']("div").withConfig({
  displayName: "EmptyStateCard___StyledDiv2",
  componentId: "ov2yly-2"
})(["color:", ";", ";"], function (p) {
  return p._css4;
}, function (p) {
  return p._css5;
});

var EmptyStateCard = /*#__PURE__*/React__default['default'].memo(function EmptyStateCard(_ref) {
  var action = _ref.action,
      icon = _ref.icon,
      illustration = _ref.illustration,
      text = _ref.text,
      props = objectWithoutProperties.objectWithoutProperties(_ref, ["action", "icon", "illustration", "text"]);

  var theme = Theme.useTheme();
  var publicUrl = PublicUrl.usePublicUrl();

  if (icon !== undefined) {
    environment.warnOnce('EmptyStateCard:icon', 'EmptyStateCard: the `icon` prop is deprecated, please use `illustration` instead.');

    if (illustration === undefined) {
      illustration = icon;
    }
  } // default illustration


  if (!illustration) {
    illustration = /*#__PURE__*/React__default['default'].createElement("img", {
      src: publicUrl + illustrationDefault,
      alt: "",
      height: 20 * constants.GU
    });
  }

  return /*#__PURE__*/React__default['default'].createElement(index.i, {
    name: "EmptyStateCard"
  }, /*#__PURE__*/React__default['default'].createElement(_StyledCard, _extends._extends_1({}, props, {
    _css: 20 * constants.GU,
    _css2: 42 * constants.GU,
    _css3: 2 * constants.GU
  }), /*#__PURE__*/React__default['default'].createElement(_StyledDiv, null, illustration), /*#__PURE__*/React__default['default'].createElement(_StyledDiv2, {
    _css4: theme.surfaceContent,
    _css5: textStyles.textStyle('title4')
  }, text), /*#__PURE__*/React__default['default'].createElement("div", null, action)));
});
EmptyStateCard.propTypes = {
  action: index$1.propTypes.node,
  illustration: index$1.propTypes.node,
  text: index$1.propTypes.node.isRequired,
  // deprecated
  icon: index$1.propTypes.node
};

exports.default = EmptyStateCard;
//# sourceMappingURL=EmptyStateCard.js.map
