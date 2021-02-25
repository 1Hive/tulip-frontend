'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./slicedToArray-a8a77f0e.js');
require('./unsupportedIterableToArray-f175acfa.js');
var React = require('react');
require('./_commonjsHelpers-1b94f6bc.js');
require('./index-46d0e707.js');
var defineProperty = require('./defineProperty-3cad0327.js');
require('./toConsumableArray-cc0d28a9.js');
var _styled = require('styled-components');
require('./getPrototypeOf-55c9e80c.js');
require('./color.js');
require('./css.js');
require('./miscellaneous.js');
require('./environment.js');
require('./font.js');
require('./keycodes.js');
require('./constants.js');
require('./breakpoints.js');
require('./text-styles.js');
require('./theme-dark.js');
require('./theme-light.js');
var Theme = require('./Theme.js');
var _extends = require('./extends-023d783e.js');
var objectWithoutProperties = require('./objectWithoutProperties-c6d3675c.js');
require('./index-4def0554.js');
require('./_baseGetTag-42b4dd3e.js');
require('./Viewport-819c53c9.js');
require('./Layout.js');
require('./FocusVisible.js');
require('./ButtonBase.js');
require('./IconPropTypes-12cd7567.js');
var IconCross = require('./IconCross.js');
var IconSearch = require('./IconSearch.js');
require('./Button.js');
var ButtonIcon = require('./ButtonIcon.js');
var TextInput = require('./TextInput.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var EMPTY = '';

var _StyledIconSearch = _styled__default['default'](IconSearch.default).withConfig({
  displayName: "SearchInput___StyledIconSearch",
  componentId: "sc-13u679s-0"
})(["color:", ";"], function (p) {
  return p._css;
});

var _StyledButtonIcon = _styled__default['default'](ButtonIcon.default).withConfig({
  displayName: "SearchInput___StyledButtonIcon",
  componentId: "sc-13u679s-1"
})(["color:", ";"], function (p) {
  return p._css2;
});

var SearchInput = /*#__PURE__*/React__default['default'].forwardRef(function (_ref2, ref) {
  var onChange = _ref2.onChange,
      props = objectWithoutProperties.objectWithoutProperties(_ref2, ["onChange"]);

  var theme = Theme.useTheme();
  var fallbackRef = React.useRef();

  var _ref = ref || fallbackRef;

  var handleChange = React.useCallback(function (ev) {
    var value = ev.currentTarget.value;
    onChange(value, {
      inputChangeEvent: ev
    });
  }, [onChange]);
  var handleClearClick = React.useCallback(function (ev) {
    onChange(EMPTY, {
      clearClickEvent: ev
    });

    if (_ref.current) {
      _ref.current.focus();
    }
  }, [onChange, _ref]);
  return /*#__PURE__*/React__default['default'].createElement(TextInput.default, _extends._extends_1({
    ref: _ref,
    adornment: (props.value || '') === EMPTY ? /*#__PURE__*/React__default['default'].createElement(_StyledIconSearch, {
      _css: theme.surfaceIcon
    }) : /*#__PURE__*/React__default['default'].createElement(_StyledButtonIcon, {
      onClick: handleClearClick,
      label: "Clear search input",
      _css2: theme.surfaceIcon
    }, /*#__PURE__*/React__default['default'].createElement(IconCross.default, null)),
    adornmentPosition: "end",
    onChange: handleChange
  }, props));
});
SearchInput.propTypes = _objectSpread({}, TextInput.default.propTypes);

exports.default = SearchInput;
//# sourceMappingURL=SearchInput.js.map
