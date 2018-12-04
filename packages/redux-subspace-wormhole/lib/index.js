'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isPlainObject = _interopDefault(require('lodash.isplainobject'));
var reduxSubspace = require('redux-subspace');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var wormhole = function wormhole(mapState, key) {
  if (typeof mapState === 'string') {
    var mapStateKey = mapState;

    mapState = function mapState(state) {
      return state[mapStateKey];
    };

    if (typeof key === 'undefined') {
      key = mapStateKey;
    }
  }

  return function (store) {
    return {
      getState: function getState(next) {
        return function () {
          var state = next();

          if (isPlainObject(state)) {
            var _objectSpread2;

            return _objectSpread((_objectSpread2 = {}, _objectSpread2[key] = mapState(store.rootStore.getState()), _objectSpread2), state);
          } else {
            return state;
          }
        };
      }
    };
  };
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var index = (function (mapState, key) {
  return reduxSubspace.applyToChildren(wormhole(mapState, key));
});

exports.default = index;
