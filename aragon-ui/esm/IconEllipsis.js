import './slicedToArray-ad07b557.js';
import './unsupportedIterableToArray-aef68344.js';
import React from 'react';
import './_commonjsHelpers-97e6d7b1.js';
import './index-097535f1.js';
import './defineProperty-a0480c32.js';
import 'styled-components';
import './miscellaneous.js';
import './environment.js';
import './font.js';
import './constants.js';
import './breakpoints.js';
import './springs.js';
import './text-styles.js';
import { _ as _extends } from './extends-db4f0c26.js';
import { _ as _objectWithoutProperties } from './objectWithoutProperties-234758e1.js';
import './index-422d37c0.js';
import { u as useIconSize, I as IconPropTypes } from './IconPropTypes-9078a621.js';

function IconEllipsis(_ref) {
  var size = _ref.size,
      props = _objectWithoutProperties(_ref, ["size"]);

  var sizeValue = useIconSize(size);
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: sizeValue,
    height: sizeValue,
    fill: "none",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("circle", {
    cx: 6,
    cy: 12,
    r: 1,
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 12,
    cy: 12,
    r: 1,
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 18,
    cy: 12,
    r: 1,
    fill: "currentColor"
  }));
}

IconEllipsis.propTypes = IconPropTypes;

export default IconEllipsis;
//# sourceMappingURL=IconEllipsis.js.map
