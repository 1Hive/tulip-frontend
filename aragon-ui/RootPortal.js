'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./slicedToArray-511ed810.js');
require('./unsupportedIterableToArray-29a5d0c3.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./_commonjsHelpers-72d386ba.js');
var index = require('./index-b0606964.js');
require('./extends-40571110.js');
require('./objectWithoutProperties-35db8ab0.js');
var ReactDOM = _interopDefault(require('react-dom'));
var index$1 = require('./index-18242897.js');

var RootPortal = function RootPortal(props) {
  return /*#__PURE__*/React__default.createElement(index$1.Root, null, function (rootElement) {
    if (!rootElement) {
      throw new Error('<RootPortal> needs to be nested in <Root.Provider>. Have you declared <Main>?');
    }

    return ReactDOM.createPortal(props.children, rootElement);
  });
};

RootPortal.propTypes = {
  children: index.PropTypes.node.isRequired
};

exports.default = RootPortal;
//# sourceMappingURL=RootPortal.js.map
