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

var subStateDispatch = exports.subStateDispatch = function subStateDispatch(dispatch, getState) {

    var wrapDispatch = function wrapDispatch(localDispatch) {
        return function (action) {
            if (typeof action === 'function') {
                // assumes thunk
                var thunk = function thunk(rootDispatch, rootGetState) {
                    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                        args[_key - 2] = arguments[_key];
                    }

                    var wrappedDispatch = wrapDispatch(localDispatch, getState);
                    return action.apply(undefined, [wrappedDispatch, getState].concat(args));
                };
                return localDispatch(thunk);
            } else {
                return localDispatch(action);
            }
        };
    };

    return wrapDispatch(dispatch, getState);
};

var namespacedDispatch = exports.namespacedDispatch = function namespacedDispatch(dispatch, getState, namespace) {
    if (!namespace) return;

    var wrapDispatch = function wrapDispatch(localDispatch) {
        return function (action) {
            if (action.type && !action.globalAction) {
                var namespacedAction = _extends({}, action, { type: namespace + '/' + action.type });
                return localDispatch(namespacedAction);
            } else if (typeof action === 'function') {
                // assumes thunk
                var thunk = function thunk(rootDispatch, rootGetState) {
                    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                        args[_key2 - 2] = arguments[_key2];
                    }

                    var wrappedDispatch = wrapDispatch(localDispatch, getState, namespace);
                    return action.apply(undefined, [wrappedDispatch, getState].concat(args));
                };
                return localDispatch(thunk);
            } else {
                return localDispatch(action);
            }
        };
    };

    return wrapDispatch(dispatch, getState, namespace);
};

var namespacedReducer = exports.namespacedReducer = function namespacedReducer(reducer, namespace) {
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