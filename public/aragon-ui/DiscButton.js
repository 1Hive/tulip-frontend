'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./slicedToArray-a8a77f0e.js');
require('./unsupportedIterableToArray-f175acfa.js');
var React = require('react');
require('./_commonjsHelpers-1b94f6bc.js');
var index = require('./index-46d0e707.js');
require('./defineProperty-3cad0327.js');
require('./toConsumableArray-cc0d28a9.js');
var _styled = require('styled-components');
require('./getPrototypeOf-55c9e80c.js');
require('./color.js');
require('./css.js');
require('./miscellaneous.js');
require('./environment.js');
require('./font.js');
require('./keycodes.js');
var constants = require('./constants.js');
require('./text-styles.js');
require('./theme-dark.js');
require('./theme-light.js');
var Theme = require('./Theme.js');
var _extends = require('./extends-023d783e.js');
var objectWithoutProperties = require('./objectWithoutProperties-c6d3675c.js');
require('./FocusVisible.js');
var ButtonBase = require('./ButtonBase.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);

var _StyledButtonBase = _styled__default['default'](ButtonBase.default).withConfig({
  displayName: "DiscButton___StyledButtonBase",
  componentId: "sc-1ay99f2-0"
})(["display:flex;align-items:center;justify-content:center;width:", "px;height:", "px;background:", ";color:", ";border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,0.25);transition-property:transform,box-shadow;transition-duration:50ms;transition-timing-function:ease-in-out;&:active{transform:translateY(1px);box-shadow:0px 1px 3px rgba(0,0,0,0.125);}"], function (p) {
  return p._css;
}, function (p) {
  return p._css2;
}, function (p) {
  return p._css3;
}, function (p) {
  return p._css4;
});

var DiscButton = /*#__PURE__*/React__default['default'].forwardRef(function (_ref, ref) {
  var children = _ref.children,
      description = _ref.description,
      size = _ref.size,
      props = objectWithoutProperties.objectWithoutProperties(_ref, ["children", "description", "size"]);

  var theme = Theme.useTheme();
  return /*#__PURE__*/React__default['default'].createElement(_StyledButtonBase, _extends._extends_1({
    ref: ref,
    focusRingSpacing: 4,
    focusRingRadius: size,
    title: description
  }, props, {
    _css: size,
    _css2: size,
    _css3: theme.help,
    _css4: theme.helpContent
  }), children);
});
DiscButton.propTypes = {
  children: index.propTypes.node.isRequired,
  description: index.propTypes.string.isRequired,
  size: index.propTypes.number
};
DiscButton.defaultProps = {
  size: 5 * constants.GU
};

exports.default = DiscButton;
//# sourceMappingURL=DiscButton.js.map
