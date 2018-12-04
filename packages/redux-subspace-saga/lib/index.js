'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var effects = require('redux-saga/effects');
var createSagaMiddleware = require('redux-saga');
var createSagaMiddleware__default = _interopDefault(createSagaMiddleware);
var reduxSubspace = require('redux-subspace');

var provideStore = function provideStore(store, options) {
  return function (saga) {
    return (
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return effects.setContext({
                  store: store,
                  sagaMiddlewareOptions: options
                });

              case 2:
                return _context.delegateYield(saga.apply(void 0, _args), "t0", 3);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      })
    );
  };
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var createSagaMiddleware$1 = (function (options) {
  var sagaMiddleware = createSagaMiddleware__default(options);

  var sagaSubspaceMiddleware = function sagaSubspaceMiddleware(store) {
    sagaSubspaceMiddleware.run = function (saga) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return sagaMiddleware.run.apply(sagaMiddleware, [provideStore(store, options)(saga)].concat(args));
    };

    return sagaMiddleware(store);
  };

  return sagaSubspaceMiddleware;
});

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

var emitter = function emitter() {
  var subscribers = [];

  function subscribe(sub) {
    subscribers.push(sub);
    return function () {
      subscribers.splice(subscribers.indexOf(sub), 1);
    };
  }

  function emit(item) {
    var arr = subscribers.slice();

    for (var i = 0, len = arr.length; i < len; i++) {
      arr[i](item);
    }
  }

  return {
    subscribe: subscribe,
    emit: emit
  };
};

var subspaced = function subspaced(mapState, namespace) {
  var subspaceDecorator = reduxSubspace.subspace(mapState, namespace);
  return function (saga) {
    return (
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var parentStore,
            sagaMiddlewareOptions,
            sagaEmitter,
            store,
            _len,
            args,
            _key,
            _args2 = arguments;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return effects.getContext('store');

              case 2:
                parentStore = _context2.sent;
                _context2.next = 5;
                return effects.getContext('sagaMiddlewareOptions');

              case 5:
                sagaMiddlewareOptions = _context2.sent;
                sagaEmitter = emitter();
                store = _objectSpread({}, sagaMiddlewareOptions, subspaceDecorator(parentStore), {
                  subscribe: sagaEmitter.subscribe
                });

                for (_len = _args2.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = _args2[_key];
                }

                createSagaMiddleware.runSaga.apply(void 0, [store, provideStore(store, sagaMiddlewareOptions)(saga)].concat(args));
                _context2.next = 12;
                return effects.takeEvery('*',
                /*#__PURE__*/
                _regeneratorRuntime.mark(function _callee(action) {
                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          store.processAction(action, sagaEmitter.emit);
                          _context.next = 3;
                          return;

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      })
    );
  };
};

/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var index = (function (options) {
  return reduxSubspace.applyToRoot(createSagaMiddleware$1(options));
});

exports.default = index;
exports.provideStore = provideStore;
exports.subspaced = subspaced;
