/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as ts from 'typescript'
import * as tt from 'typescript-definition-tester'
import path from 'path'
import fs from 'fs'

describe('TypeScript definitions', function () {

  const options = {
    noEmitOnError: true,
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.React
  }

  fs.readdirSync(path.join(__dirname, 'definitions')).forEach((filename) => {
    it(`should compile ${path.basename(filename, path.extname(filename))} against index.d.ts`, (done) => {
      tt.compile([path.join(__dirname, 'definitions', filename)], options, done)
    }).timeout(5000)
  });
})
