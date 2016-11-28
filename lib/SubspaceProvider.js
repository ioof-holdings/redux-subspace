'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _subspaceWrappers = require('./subspaceWrappers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016, IOOF Holdings Limited.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SubspaceProvider = function (_Component) {
    _inherits(SubspaceProvider, _Component);

    function SubspaceProvider() {
        _classCallCheck(this, SubspaceProvider);

        return _possibleConstructorReturn(this, (SubspaceProvider.__proto__ || Object.getPrototypeOf(SubspaceProvider)).apply(this, arguments));
    }

    _createClass(SubspaceProvider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var rootStore = this.context.store;
            var getState = (0, _subspaceWrappers.getSubState)(rootStore.getState, this.props.mapState);
            var dispatch = (0, _subspaceWrappers.namespacedDispatch)(rootStore.dispatch, getState, this.props.namespace) || (0, _subspaceWrappers.subStateDispatch)(rootStore.dispatch, getState);

            return { store: _extends({}, rootStore, { getState: getState, dispatch: dispatch }) };
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;

            return _react.Children.only(children);
        }
    }]);

    return SubspaceProvider;
}(_react.Component);

exports.default = SubspaceProvider;


SubspaceProvider.propTypes = {
    mapState: _react.PropTypes.func.isRequired,
    children: _react.PropTypes.element.isRequired,
    namespace: _react.PropTypes.string
};

SubspaceProvider.contextTypes = {
    store: _react.PropTypes.object
};

SubspaceProvider.childContextTypes = {
    store: _react.PropTypes.object
};