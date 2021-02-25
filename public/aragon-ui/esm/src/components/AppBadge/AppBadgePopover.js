import React from 'react';
import _styled from 'styled-components';
import '../../utils/environment.js';
import { blockExplorerUrl } from '../../utils/web3.js';
import _extends_1 from '../../../node_modules/@babel/runtime/helpers/extends.js';
import objectWithoutProperties from '../../../node_modules/@babel/runtime/helpers/objectWithoutProperties.js';
import Link from '../Link/Link.js';
import AddressField from '../AddressField/AddressField.js';
import { ImageExists } from '../../hooks/useImageExists.js';
import BadgePopoverActionType from '../BadgeBase/BadgePopoverActionType.js';
import ExtendedPropTypes from '../../proptypes.js';
import BadgePopoverBase from '../BadgeBase/BadgePopoverBase.js';

var AppBadgePopover = /*#__PURE__*/React.memo(function AppBadgePopover(_ref) {
  var appAddress = _ref.appAddress,
      iconFallbackSrc = _ref.iconFallbackSrc,
      iconSrc = _ref.iconSrc,
      networkType = _ref.networkType,
      onClose = _ref.onClose,
      opener = _ref.opener,
      popoverAction = _ref.popoverAction,
      title = _ref.title,
      visible = _ref.visible;
  var etherscanUrl = blockExplorerUrl('address', appAddress, {
    networkType: networkType
  });
  return /*#__PURE__*/React.createElement(BadgePopoverBase, {
    addressField: /*#__PURE__*/React.createElement(ImageExists, {
      src: iconSrc
    }, function (_ref2) {
      var exists = _ref2.exists,
          displayFallback = _ref2.displayFallback;
      return /*#__PURE__*/React.createElement(AddressField, {
        address: appAddress,
        icon: /*#__PURE__*/React.createElement(Icon, {
          src: exists ? iconSrc : iconFallbackSrc
        })
      });
    }),
    link: etherscanUrl && /*#__PURE__*/React.createElement(Link, {
      href: etherscanUrl
    }, "See on Etherscan"),
    onClose: onClose,
    opener: opener,
    popoverAction: popoverAction,
    title: title,
    visible: visible
  });
});
AppBadgePopover.propTypes = {
  appAddress: ExtendedPropTypes.string.isRequired,
  iconFallbackSrc: ExtendedPropTypes.string,
  iconSrc: ExtendedPropTypes.string,
  networkType: ExtendedPropTypes.string,
  onClose: ExtendedPropTypes.func,
  opener: ExtendedPropTypes._element,
  popoverAction: BadgePopoverActionType,
  title: ExtendedPropTypes.node.isRequired,
  visible: ExtendedPropTypes.bool
};

var _StyledDiv = _styled("div").withConfig({
  displayName: "AppBadgePopover___StyledDiv",
  componentId: "cornse-0"
})(["width:100%;height:100%;background-size:contain;background-position:50% 50%;background-repeat:no-repeat;background-image:url(", ");"], function (p) {
  return p._css;
});

function Icon(_ref3) {
  var src = _ref3.src,
      props = objectWithoutProperties(_ref3, ["src"]);

  return /*#__PURE__*/React.createElement(_StyledDiv, _extends_1({}, props, {
    _css: src
  }));
}

Icon.propTypes = {
  src: ExtendedPropTypes.string.isRequired
};

export default AppBadgePopover;
//# sourceMappingURL=AppBadgePopover.js.map
