'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var getSubState = exports.getSubState = function getSubState(getState, mapState) {
    return function () {
        var rootState = getState();
        var subState = mapState(rootState);

        if (subState && (typeof subState === 'undefined' ? 'undefined' : _typeof(subState)) === 'object' && !Array.isArray(subState)) {
            return _extends({}, mapState(rootState), { root: rootState.root || rootState });
        } else {
            return subState;
        }
    };
};