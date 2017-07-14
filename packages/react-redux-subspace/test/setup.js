/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import babelRegister from 'babel-register'

babelRegister(
    {
        babelrc: false,
        presets: ['es2015', 'stage-0', 'react']
    }
)

global.expect = require('chai').expect
global.sinon = require('sinon')

var chai = require("chai")
var sinonChai = require("sinon-chai")
global.expect = chai.expect
global.assert = chai.assert
chai.use(sinonChai)