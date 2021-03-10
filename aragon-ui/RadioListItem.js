'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./slicedToArray-511ed810.js');
require('./unsupportedIterableToArray-29a5d0c3.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./_commonjsHelpers-72d386ba.js');
var index = require('./index-b0606964.js');
require('./defineProperty-0921a47c.js');
require('./toConsumableArray-1d057efc.js');
var _styled = require('styled-components');
var _styled__default = _interopDefault(_styled);
require('./getPrototypeOf-7bdb15aa.js');
require('./color.js');
require('./components.js');
require('./contains-component.js');
var css = require('./css.js');
require('./dayjs.min-e07657bf.js');
require('./date.js');
require('./miscellaneous.js');
require('./environment.js');
require('./font.js');
require('./math-f4029164.js');
require('./characters.js');
require('./format.js');
require('./keycodes.js');
require('./url.js');
require('./web3.js');
var constants = require('./constants.js');
require('./breakpoints.js');
require('./springs.js');
require('./text-styles.js');
require('./theme-dark.js');
require('./theme-light.js');
var Theme = require('./Theme.js');
require('./extends-40571110.js');
require('./objectWithoutProperties-35db8ab0.js');
require('./FocusVisible.js');
require('./objectWithoutPropertiesLoose-1af20ad0.js');
require('react-dom');
require('./web-d0294535.js');
require('./Checkbox.js');
require('./RadioGroup.js');
var Radio = require('./Radio.js');

var _StyledLabel = _styled__default("label").withConfig({
  displayName: "RadioListItem___StyledLabel",
  componentId: "znrfgj-0"
})(["display:flex;", ";& + &{margin-top:", "px;}"], function (p) {
  return p._css;
}, function (p) {
  return p._css2;
});

var _StyledRadio = _styled__default(Radio.default).withConfig({
  displayName: "RadioListItem___StyledRadio",
  componentId: "znrfgj-1"
})(["flex-shrink:0;"]);

var _StyledDiv = _styled__default("div").withConfig({
  displayName: "RadioListItem___StyledDiv",
  componentId: "znrfgj-2"
})(["flex-grow:1;margin-left:12px;padding:12px 12px;border-radius:3px;transition:border 100ms ease-in-out;cursor:pointer;border:1px ", " solid;&:hover{border-color:", ";}"], function (p) {
  return p._css3;
}, function (p) {
  return p._css4;
});

var _StyledDiv2 = _styled__default("div").withConfig({
  displayName: "RadioListItem___StyledDiv2",
  componentId: "znrfgj-3"
})(["margin-top:", "px;"], function (p) {
  return p._css5;
});

var RadioListItem = React__default.memo(function RadioListItem(_ref) {
  var description = _ref.description,
      index = _ref.index,
      title = _ref.title;
  var theme = Theme.useTheme();
  return /*#__PURE__*/React__default.createElement(_StyledLabel, {
    _css: css.unselectable(),
    _css2: 1 * constants.GU
  }, /*#__PURE__*/React__default.createElement(_StyledRadio, {
    id: index
  }), /*#__PURE__*/React__default.createElement(_StyledDiv, {
    _css3: theme.border,
    _css4: theme.accent.alpha(0.35)
  }, /*#__PURE__*/React__default.createElement("strong", null, title), /*#__PURE__*/React__default.createElement(_StyledDiv2, {
    _css5: 0.5 * constants.GU
  }, description)));
});
RadioListItem.propTypes = {
  description: index.PropTypes.node.isRequired,
  index: index.PropTypes.number.isRequired,
  title: index.PropTypes.node.isRequired
};

exports.default = RadioListItem;
//# sourceMappingURL=RadioListItem.js.map
