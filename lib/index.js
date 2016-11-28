'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubspaceProvider = exports.namespaced = undefined;

var _subspaceWrappers = require('./subspaceWrappers');

var _SubspaceProvider = require('./SubspaceProvider');

var _SubspaceProvider2 = _interopRequireDefault(_SubspaceProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

exports.namespaced = _subspaceWrappers.namespacedReducer;
exports.SubspaceProvider = _SubspaceProvider2.default;