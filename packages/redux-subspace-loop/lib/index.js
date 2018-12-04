'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reduxSubspace = require('redux-subspace');
var reduxLoop = require('redux-loop');

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

var namespacedCommand = function namespacedCommand(namespace) {
  var actionNamespacer = reduxSubspace.namespacedAction(namespace);
  return function namespaceCommand(cmd) {
    if (cmd.type === "RUN") {
      return _objectSpread({}, cmd, {
        successActionCreator: function successActionCreator() {
          return actionNamespacer(cmd.successActionCreator.apply(cmd, arguments));
        },
        failActionCreator: function failActionCreator() {
          return actionNamespacer(cmd.failActionCreator.apply(cmd, arguments));
        }
      });
    }

    if (cmd.type === "ACTION") {
      return _objectSpread({}, cmd, {
        actionToDispatch: actionNamespacer(cmd.actionToDispatch)
      });
    }

    if (cmd.type === "LIST" || cmd.type === "BATCH" || cmd.type === "SEQUENCE") {
      return _objectSpread({}, cmd, {
        cmds: cmd.cmds.map(namespaceCommand)
      });
    }

    return cmd;
  };
};

var namespaced = function namespaced(namespace) {
  var namespacer = reduxSubspace.namespaced(namespace);
  var commandNamespacer = namespacedCommand(namespace);
  return function (reducer) {
    return namespacer(function (state, action) {
      var result = reducer(state, action);

      if (reduxLoop.isLoop(result)) {
        var model = reduxLoop.getModel(result);
        var cmd = reduxLoop.getCmd(result);
        return reduxLoop.loop(model, commandNamespacer(cmd));
      }

      return result;
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

exports.namespaced = namespaced;
