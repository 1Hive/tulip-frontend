'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var slicedToArray = require('./slicedToArray-a8a77f0e.js');
require('./unsupportedIterableToArray-f175acfa.js');
var React = require('react');
require('./_commonjsHelpers-1b94f6bc.js');
var index = require('./index-46d0e707.js');
require('./defineProperty-3cad0327.js');
require('./toConsumableArray-cc0d28a9.js');
require('styled-components');
require('./getPrototypeOf-55c9e80c.js');
require('./color.js');
require('./css.js');
require('./miscellaneous.js');
require('./environment.js');
require('./font.js');
require('./keycodes.js');
require('./url.js');
require('./constants.js');
require('./breakpoints.js');
require('./springs.js');
require('./text-styles.js');
require('./theme-dark.js');
require('./theme-light.js');
require('./Theme.js');
require('./extends-023d783e.js');
require('./objectWithoutProperties-c6d3675c.js');
require('./index-4def0554.js');
require('./_baseGetTag-42b4dd3e.js');
require('./Viewport-819c53c9.js');
require('./Layout.js');
require('./Box.js');
require('./FocusVisible.js');
require('./ButtonBase.js');
require('./PaginationItem.js');
require('./IconPropTypes-12cd7567.js');
require('./IconDown.js');
require('./IconEllipsis.js');
require('./IconUp.js');
require('./PaginationSeparator.js');
require('./Pagination.js');
require('./objectWithoutPropertiesLoose-1af20ad0.js');
require('react-dom');
require('./web-7cbdbd84.js');
require('./Checkbox.js');
require('./Button.js');
require('./ButtonIcon.js');
require('./ToggleButton.js');
require('./OpenedSurfaceBorder.js');
require('./TableView.js');
require('./ListView.js');
require('./getDisplayName-7f913e84.js');
require('./PublicUrl-7d4b6d6d.js');
require('./LoadingRing.js');
require('./Link.js');
require('./EmptyState.js');
var _DataView = require('./DataView.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Accordion = /*#__PURE__*/React__default['default'].memo(function Accordion(_ref) {
  var items = _ref.items,
      className = _ref.className,
      style = _ref.style;
  var fields = React.useMemo(function () {
    return [null];
  }, []);
  var renderEntry = React.useCallback(function (_ref2) {
    var _ref3 = slicedToArray.slicedToArray(_ref2, 1),
        row = _ref3[0];

    return [row];
  }, []);
  var renderEntryExpansion = React.useCallback(function (_ref4) {
    var _ref5 = slicedToArray.slicedToArray(_ref4, 2),
        _ = _ref5[0],
        expansion = _ref5[1];

    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, expansion);
  }, []);
  return /*#__PURE__*/React__default['default'].createElement(_DataView.default, {
    className: className,
    entries: items,
    entriesPerPage: -1,
    fields: fields,
    renderEntry: renderEntry,
    renderEntryExpansion: renderEntryExpansion,
    style: style
  });
}); // className and style are passed manually to ensure users don’t rely on extra
// props to be passed to DataView. The reason is because Accordion is going to
// stop consuming DataView in the future, and would instead share a common
// “expandable” component with it.

Accordion.propTypes = {
  className: index.propTypes.string,
  items: index.propTypes.arrayOf(index.propTypes.arrayOf(index.propTypes.node)).isRequired,
  style: index.propTypes.object
};

exports.default = Accordion;
//# sourceMappingURL=Accordion.js.map
