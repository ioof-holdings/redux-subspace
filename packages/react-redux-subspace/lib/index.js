'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reduxSubspace = require('redux-subspace');
var hoistNonReactStatics = _interopDefault(require('hoist-non-react-statics'));
var wrapDisplayName = _interopDefault(require('recompose/wrapDisplayName'));

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var SubspaceProvider =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(SubspaceProvider, _React$PureComponent);

  function SubspaceProvider() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = SubspaceProvider.prototype;

  _proto.getChildContext = function getChildContext() {
    var makeSubspaceDecorator = function makeSubspaceDecorator(props) {
      return props.subspaceDecorator || reduxSubspace.subspace(props.mapState, props.namespace);
    };

    return {
      store: makeSubspaceDecorator(this.props)(this.context.store)
    };
  };

  _proto.render = function render() {
    return React.Children.only(this.props.children);
  };

  return SubspaceProvider;
}(React__default.PureComponent);

SubspaceProvider.propTypes = {
  children: PropTypes.element.isRequired,
  mapState:
  /*#__PURE__*/
  PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  namespace: PropTypes.string,
  subspaceDecorator: PropTypes.func
};
SubspaceProvider.contextTypes = {
  store: PropTypes.object.isRequired
};
SubspaceProvider.childContextTypes = {
  store: PropTypes.object
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var subspaced = function subspaced(mapState, namespace) {
  var subspaceDecorator = reduxSubspace.subspace(mapState, namespace);
  return function (WrappedComponent) {
    var SubspacedComponent = function SubspacedComponent(props) {
      return React__default.createElement(SubspaceProvider, {
        subspaceDecorator: subspaceDecorator
      }, React__default.createElement(WrappedComponent, props));
    };

    hoistNonReactStatics(SubspacedComponent, WrappedComponent);
    SubspacedComponent.displayName = wrapDisplayName(WrappedComponent, 'Subspaced');
    return SubspacedComponent;
  };
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

exports.subspaced = subspaced;
exports.SubspaceProvider = SubspaceProvider;
