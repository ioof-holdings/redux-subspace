'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reduxSubspace = require('redux-subspace');
var operators = require('rxjs/operators');
var reduxObservable = require('redux-observable');

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

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _toPropertyKey(key) {
  if (typeof key === "symbol") {
    return key;
  } else {
    return String(key);
  }
}

var SUBSPACE_STORE_KEY = '@@redux-subspace/store';

var identity = function identity(x) {
  return x;
};

var subspaced = function subspaced(mapState, namespace) {
  var subspaceDecorator = reduxSubspace.subspace(mapState, namespace);
  return function (epic) {
    return function (action$, state$, _ref) {
      if (_ref === void 0) {
        _ref = {};
      }

      var _ref2 = _ref,
          parentStore = _ref2[SUBSPACE_STORE_KEY],
          dependencies = _objectWithoutPropertiesLoose(_ref2, [SUBSPACE_STORE_KEY].map(_toPropertyKey));

      if (parentStore === undefined) {
        throw new Error('Subspace epic couldn\'t find the store. Make sure you\'ve used createEpicMiddleware from redux-subspace-observable');
      }

      var subspacedStore = subspaceDecorator(parentStore);
      Object.defineProperty(dependencies, SUBSPACE_STORE_KEY, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: subspacedStore
      });
      var subspacedState$ = new reduxObservable.StateObservable(state$.pipe(operators.map(subspacedStore.getState)), subspacedStore.getState());
      var filteredAction$ = action$.pipe(operators.map(function (action) {
        return subspacedStore.processAction(action, identity);
      }), operators.filter(identity));
      return epic(filteredAction$, subspacedState$, dependencies).pipe(operators.map(subspacedStore.dispatch), operators.ignoreElements());
    };
  };
};

var createEpicMiddleware = function createEpicMiddleware(options) {
  if (options === void 0) {
    options = {};
  }

  if (options.dependencies != null && (Array.isArray(options.dependencies) || typeof options.dependencies !== 'object')) {
    throw new TypeError('dependencies must be an object');
  }

  var subspaceEpicMiddleware = function subspaceEpicMiddleware(store) {
    var _objectSpread2;

    var optionsWithStore = _objectSpread({}, options, {
      dependencies: _objectSpread({}, options.dependencies, (_objectSpread2 = {}, _objectSpread2[SUBSPACE_STORE_KEY] = store, _objectSpread2))
    });

    var epicMiddleware = reduxObservable.createEpicMiddleware(optionsWithStore);

    subspaceEpicMiddleware.run = function (rootEpic) {
      return epicMiddleware.run(rootEpic);
    };

    return epicMiddleware(store);
  };

  return reduxSubspace.applyToRoot(subspaceEpicMiddleware);
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

exports.subspaced = subspaced;
exports.createEpicMiddleware = createEpicMiddleware;
