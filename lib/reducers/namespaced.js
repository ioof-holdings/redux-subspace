'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

exports.default = function (reducer, namespace) {
    return function (state, action) {
        if (typeof state === 'undefined' || action.globalAction) {
            return reducer(state, action);
        }

        if (action && action.type && action.type.indexOf(namespace + '/') === 0) {
            var theAction = _extends({}, action, { type: action.type.substring(namespace.length + 1) });
            return reducer(state, theAction);
        }

        return state;
    };
};