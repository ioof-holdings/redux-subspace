/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

global.expect = require('chai').expect
global.sinon = require('sinon')

var chai = require("chai")
var sinonChai = require("sinon-chai")
global.expect = chai.expect
global.assert = chai.assert
chai.use(sinonChai)
