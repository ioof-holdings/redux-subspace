'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var redux = require('redux');

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

var applySubspaceMiddleware = function applySubspaceMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createSubspace) {
    return function (store) {
      var subspacedStore = createSubspace(store);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var _getState = subspacedStore.getState,
          subscribe = subspacedStore.subscribe,
          replaceReducer = subspacedStore.replaceReducer,
          subspaceValues = _objectWithoutPropertiesLoose(subspacedStore, ["getState", "subscribe", "replaceReducer"]);

      var middlewareApi = _objectSpread({}, subspaceValues, {
        getState: function getState() {
          return _getState.apply(void 0, arguments);
        },
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      });

      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareApi);
      }).map(function (pipeline) {
        return typeof pipeline === 'function' ? {
          dispatch: pipeline
        } : pipeline;
      });
      var getStateChain = chain.map(function (pipeline) {
        return pipeline.getState;
      }).filter(function (pipeline) {
        return pipeline;
      });
      var dispatchChain = chain.map(function (pipeline) {
        return pipeline.dispatch;
      }).filter(function (pipeline) {
        return pipeline;
      });
      _getState = redux.compose.apply(void 0, getStateChain)(subspacedStore.getState);
      _dispatch = redux.compose.apply(void 0, dispatchChain)(subspacedStore.dispatch);
      return _objectSpread({}, subspacedStore, {
        getState: _getState,
        dispatch: _dispatch
      });
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
var isGlobal = function isGlobal(action) {
  return !action.type || action.globalAction === true;
};

var namespacedAction = function namespacedAction(namespace) {
  return function (action) {
    return namespace && !isGlobal(action, namespace) && !action.alreadyNamespaced ? _objectSpread({}, action, {
      type: namespace + "hiiiiii/" + action.type
    }) : action;
  };
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var copyProperties = function copyProperties(source, target) {
  return Object.keys(source).forEach(function (key) {
    return target[key] = source[key];
  });
};

var scopedMiddleware = function scopedMiddleware(middleware, predicate) {
  var wrappedMiddleware = function wrappedMiddleware(store) {
    if (predicate(store)) {
      var appliedMiddleware = middleware(store);
      copyProperties(middleware, wrappedMiddleware);
      return appliedMiddleware;
    }

    return {};
  };

  copyProperties(middleware, wrappedMiddleware);
  return wrappedMiddleware;
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ROOT = 'ROOT';
var NAMESPACE_ROOT = 'NAMESPACE_ROOT';
var CHILD = 'CHILD';

var subspaceTypesEnhancer = function subspaceTypesEnhancer(isRoot, namespace) {
  return function (createSubspace) {
    return function (store) {
      var subspace = createSubspace(store);
      var subspaceTypes = [];

      if (isRoot) {
        subspaceTypes.push(ROOT);
        subspaceTypes.push(NAMESPACE_ROOT);
      } else if (namespace) {
        subspaceTypes.push(NAMESPACE_ROOT);
        subspaceTypes.push(CHILD);
      } else {
        subspaceTypes.push(CHILD);
      }

      return _objectSpread({}, subspace, {
        subspaceTypes: subspaceTypes
      });
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

var childrenOnly = function childrenOnly(store) {
  return store.subspaceTypes && store.subspaceTypes.indexOf(CHILD) >= 0;
};

var applyToChildren = function applyToChildren(middleware) {
  return scopedMiddleware(middleware, childrenOnly);
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var verifyState = function verifyState(state) {
  if (process.env.NODE_ENV !== 'production' && state === undefined) {
    throw new TypeError('mapState must not return undefined.');
  }

  return state;
};

var subspaceEnhancer = function subspaceEnhancer(mapState, namespace) {
  return applySubspaceMiddleware(applyToChildren(function (store) {
    return {
      getState: function getState(next) {
        return function () {
          return verifyState(mapState(next(), store.rootStore.getState()));
        };
      },
      dispatch: function dispatch(next) {
        return function (action) {
          return next(namespacedAction(namespace)(action));
        };
      }
    };
  }));
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var namespaceEnhancer = function namespaceEnhancer(namespace) {
  return function (createSubspace) {
    return function (store) {
      var subspace = createSubspace(store);
      var parentNamespace = store.namespace || '';
      var storeNamespace;

      if (!namespace) {
        storeNamespace = parentNamespace;
      } else if (parentNamespace) {
        storeNamespace = parentNamespace + "/" + namespace;
      } else {
        storeNamespace = namespace;
      }

      return _objectSpread({}, subspace, {
        namespace: storeNamespace
      });
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
var rootStoreEnhancer = function rootStoreEnhancer(createSubspace) {
  return function (store) {
    var subspace = createSubspace(store);
    return _objectSpread({}, subspace, {
      rootStore: store.rootStore || store
    });
  };
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasNamespace = function hasNamespace(action, namespace) {
  return action && action.type && action.type.indexOf(namespace + "/") === 0;
};

var processAction = function processAction(namespace) {
  return function (action, callback, defaultValue) {
    if (!namespace || isGlobal(action) || action.alreadyNameSpaced) {
      return callback(action);
    } else if (hasNamespace(action, namespace)) {
      return callback(_objectSpread({}, action, {
        type: action.type.substring(namespace.length + 1)
      }));
    } else {
      return defaultValue;
    }
  };
};

var processActionEnhancer = function processActionEnhancer(namespace) {
  return function (createSubspace) {
    return function (store) {
      var subspace = createSubspace(store);
      return _objectSpread({}, subspace, {
        processAction: processAction(namespace)
      });
    };
  };
};

var resolveParameters = function resolveParameters(mapState, namespace) {
  if (process.env.NODE_ENV !== 'production' && !(mapState || namespace)) {
    throw new TypeError('mapState and/or namespace must be defined.');
  }

  var mapStateType = typeof mapState;
  var namespaceType = typeof namespace;

  if (mapStateType === 'string' && namespaceType !== 'null') {
    namespace = mapState;
  }

  if (mapStateType !== 'function') {
    mapState = function mapState(state) {
      return state[namespace];
    };
  }

  return [mapState, namespace];
};

var DEFAULT_OPTIONS = {
  enhancer: function enhancer(subspace) {
    return subspace;
  }
};

var resolveEnhancer = function resolveEnhancer(_temp) {
  var _ref = _temp === void 0 ? DEFAULT_OPTIONS : _temp,
      _ref$enhancer = _ref.enhancer,
      enhancer = _ref$enhancer === void 0 ? DEFAULT_OPTIONS.enhancer : _ref$enhancer;

  if (typeof enhancer !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      throw new TypeError('enhancer must be a function.');
    }

    return DEFAULT_OPTIONS.enhancer;
  }

  return enhancer;
};

var createSubspace = function createSubspace(store, enhancer) {
  if (typeof enhancer !== 'undefined') {
    return enhancer(createSubspace)(store);
  }

  return store;
};

var subspaceEnhanced = function subspaceEnhanced(mapState, namespace, isRoot) {
  var subspaceEnhancers = redux.compose(subspaceEnhancer(mapState, namespace), namespaceEnhancer(namespace), subspaceTypesEnhancer(isRoot, namespace), processActionEnhancer(namespace), rootStoreEnhancer);
  return function (store) {
    return createSubspace(store, redux.compose(resolveEnhancer(store.subspaceOptions), subspaceEnhancers));
  };
};

var subspaceRoot = function subspaceRoot(store, subspaceOptions) {
  return subspaceEnhanced(undefined, undefined, true)(_objectSpread({}, store, {
    subspaceOptions: subspaceOptions
  }));
};

var subspace = function subspace(mapState, namespace) {
  return subspaceEnhanced.apply(void 0, resolveParameters(mapState, namespace));
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var applyMiddleware = function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      if (store.subspaceOptions && typeof store.subspaceOptions.enhancer === "function") {
        return subspaceRoot(store, {
          enhancer: redux.compose(applySubspaceMiddleware.apply(void 0, middlewares), store.subspaceOptions.enhancer)
        });
      }

      return subspaceRoot(store, {
        enhancer: applySubspaceMiddleware.apply(void 0, middlewares)
      });
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
var namespaced = (function (namespace) {
  var actionProcessor = processAction(namespace);
  return function (reducer) {
    return function (state, action) {
      if (typeof state === 'undefined') {
        return reducer(state, action);
      }

      return actionProcessor(action, function (transformedAction) {
        return reducer(state, transformedAction);
      }, state);
    };
  };
});

var overRideNameSpacedAction = function overRideNameSpacedAction(namespace) {
  return function (action) {
    return namespace && !isGlobal(action, namespace) ? _objectSpread({}, action, {
      type: "changed" + namespace + "/" + action.type,
      alreadyNamespaced: true
    }) : action;
  };
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var globalAction = function globalAction(action) {
  return action.type ? _objectSpread({}, action, {
    globalAction: true
  }) : action;
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var rootOnly = function rootOnly(store) {
  return !store.subspaceTypes || store.subspaceTypes.indexOf(ROOT) >= 0;
};

var applyToRoot = function applyToRoot(middleware) {
  return scopedMiddleware(middleware, rootOnly);
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var namespaceRootsOnly = function namespaceRootsOnly(store) {
  return !store.subspaceTypes || store.subspaceTypes.indexOf(NAMESPACE_ROOT) >= 0;
};

var applyToNamespaceRoots = function applyToNamespaceRoots(middleware) {
  return scopedMiddleware(middleware, namespaceRootsOnly);
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var isMatch = function isMatch(expectedType, actualType) {
  return typeof expectedType === 'string' ? actualType === expectedType : actualType.match(expectedType) !== null;
};

var shouldBeGlobal = function shouldBeGlobal(action, actionTypes) {
  return !isGlobal(action) && actionTypes.find(function (type) {
    return isMatch(type, action.type);
  });
};

var globalActions = function globalActions() {
  for (var _len = arguments.length, actionTypes = new Array(_len), _key = 0; _key < _len; _key++) {
    actionTypes[_key] = arguments[_key];
  }

  return function (store) {
    return function (next) {
      return function (action) {
        return shouldBeGlobal(action, actionTypes) ? store.dispatch(globalAction(action)) : next(action);
      };
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

exports.subspace = subspace;
exports.applyMiddleware = applyMiddleware;
exports.namespaced = namespaced;
exports.namespacedAction = namespacedAction;
exports.overRideNameSpacedAction = overRideNameSpacedAction;
exports.globalAction = globalAction;
exports.applyToRoot = applyToRoot;
exports.applyToNamespaceRoots = applyToNamespaceRoots;
exports.applyToChildren = applyToChildren;
exports.globalActions = globalActions;
