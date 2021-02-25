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
require('./components.js');
require('./contains-component.js');
require('./css.js');
require('./miscellaneous.js');
require('./environment.js');
require('./font.js');
require('./url.js');
require('./constants.js');
require('./breakpoints.js');
require('./springs.js');
require('./text-styles.js');
require('./theme-dark.js');
require('./theme-light.js');
require('./Theme.js');
var _extends = require('./extends-023d783e.js');
var objectWithoutProperties = require('./objectWithoutProperties-c6d3675c.js');
require('./index-4def0554.js');
require('./_baseGetTag-42b4dd3e.js');
require('./Viewport-819c53c9.js');
require('./Layout.js');
require('./objectWithoutPropertiesLoose-1af20ad0.js');
require('react-dom');
require('./web-7cbdbd84.js');
require('./getDisplayName-7f913e84.js');
require('./PublicUrl-7d4b6d6d.js');
require('./ToastHub.js');
require('./Root-8693e46b.js');
require('./RootPortal.js');
require('./BaseStyles.js');
require('./ScrollView.js');
var Main = require('./Main.js');
require('./Text.js');
var AppBar = require('./AppBar.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);

var _StyledDiv = _styled__default['default']("div").withConfig({
  displayName: "AppView___StyledDiv",
  componentId: "sm6g80-0"
})(["display:flex;height:", ";flex-direction:column;align-items:stretch;justify-content:stretch;"], function (p) {
  return p.height;
});

var _StyledDiv2 = _styled__default['default']("div").withConfig({
  displayName: "AppView___StyledDiv2",
  componentId: "sm6g80-1"
})(["position:relative;z-index:2;flex-shrink:0;"]);

var _StyledDiv3 = _styled__default['default']("div").withConfig({
  displayName: "AppView___StyledDiv3",
  componentId: "sm6g80-2"
})(["position:relative;z-index:1;height:100%;overflow:auto;"]);

var _StyledDiv4 = _styled__default['default']("div").withConfig({
  displayName: "AppView___StyledDiv4",
  componentId: "sm6g80-3"
})(["display:flex;flex-direction:column;min-height:100%;padding:", ";"], function (_ref) {
  var padding = _ref.padding;
  return "".concat(padding, "px");
});

function AppView(_ref2) {
  var appBar = _ref2.appBar,
      children = _ref2.children,
      height = _ref2.height,
      padding = _ref2.padding,
      tabs = _ref2.tabs,
      title = _ref2.title,
      props = objectWithoutProperties.objectWithoutProperties(_ref2, ["appBar", "children", "height", "padding", "tabs", "title"]);

  // Notify Main that it contains this AppView
  Main.useRegisterAppView();
  return /*#__PURE__*/React__default['default'].createElement(_StyledDiv, _extends._extends_1({
    height: height
  }, props), /*#__PURE__*/React__default['default'].createElement(_StyledDiv2, null, appBar || /*#__PURE__*/React__default['default'].createElement(AppBar.default, {
    title: title,
    tabs: tabs
  })), /*#__PURE__*/React__default['default'].createElement(_StyledDiv3, null, /*#__PURE__*/React__default['default'].createElement(_StyledDiv4, {
    padding: padding
  }, children)));
}

AppView.defaultProps = {
  title: '',
  padding: 30,
  height: '100vh'
};
AppView.propTypes = {
  appBar: index.propTypes.element,
  title: index.propTypes.string,
  children: index.propTypes.node,
  padding: index.propTypes.number,
  height: index.propTypes.string,
  tabs: index.propTypes.element
};

exports.default = AppView;
//# sourceMappingURL=AppView.js.map
