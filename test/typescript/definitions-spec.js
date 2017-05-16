import * as ts from 'typescript'
import * as tt from 'typescript-definition-tester'

describe('TypeScript definitions', function () {

  const options = {
    noEmitOnError: true,
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.React
  }

  it('should compile against index.d.ts', (done) => {

    tt.compileDirectory(
      __dirname + '/definitions',
      fileName => fileName.match(/\.tsx?$/),
      options,
      () => done()
    )
  })
})