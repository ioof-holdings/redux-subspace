# redux-subspace

[![npm version](https://img.shields.io/npm/v/redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace)
[![npm downloads](https://img.shields.io/npm/dm/redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/redux-subspace.svg?style=flat-square)](/LICENSE.md)

[![All Contributors](https://img.shields.io/badge/all_contributors-19-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![Watch on GitHub](https://img.shields.io/github/watchers/ioof-holdings/redux-subspace.svg?style=social)](https://github.com/ioof-holdings/redux-subspace/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/ioof-holdings/redux-subspace.svg?style=social)](https://github.com/ioof-holdings/redux-subspace/stargazers)

This is a library to help build decoupled, componentized [Redux](http://redux.js.org/) apps that share a single global store.

## Installation

```sh
npm install --save redux-subspace react-redux-subspace
```

## Quick Start

```javascript
import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { namespaced } from 'redux-subspace'
import { SubspaceProvider } from 'react-redux-subspace'
import { TodoApp, todoReducer } from './todoApp'
import { CounterApp, counterReducer } from './counterApp'

const rootReducer = combineReducers({
  todo: todoReducer
  counter1: namespaced('counter1')(counterReducer),
  counter2: namespaced('counter2')(counterReducer)
})

const store = createStore(rootReducer)

const App = () => (
  <Provider store={store}>
    <SubspaceProvider mapState={(state) => state.todo}>
      <TodoApp />
    </SubspaceProvider>
    <SubspaceProvider mapState={(state) => state.counter1} namespace="counter1">
      <CounterApp />
    </SubspaceProvider>
    <SubspaceProvider mapState={(state) => state.counter2} namespace="counter2">
      <CounterApp />
    </SubspaceProvider>
  </Provider>
)
```

## [Documentation](https://ioof-holdings.github.io/redux-subspace/)

* [Introduction](https://ioof-holdings.github.io/redux-subspace/docs/Introduction.html)
* [Basics](https://ioof-holdings.github.io/redux-subspace/docs/basics/)
* [Advanced](https://ioof-holdings.github.io/redux-subspace/docs/advanced/)
* [Examples](https://ioof-holdings.github.io/redux-subspace/docs/Examples.html)

## Packages

* [`redux-subspace`](https://github.com/ioof-holdings/redux-subspace/tree/master/packages/redux-subspace): The core package for Redux Subspace
* [`react-redux-subspace`](https://github.com/ioof-holdings/redux-subspace/tree/master/packages/react-redux-subspace): React bindings compatible with `react-redux`
* [`redux-subspace-loop`](https://github.com/ioof-holdings/redux-subspace/tree/master/packages/redux-subspace-loop): Utilities for integrating with `redux-loop`
* [`redux-subspace-observable`](https://github.com/ioof-holdings/redux-subspace/tree/master/packages/redux-subspace-observable): Utilities for integrating with `redux-observable`
* [`redux-subspace-saga`](https://github.com/ioof-holdings/redux-subspace/tree/master/packages/redux-subspace-saga): Utilities for integrating with `redux-saga`
* [`redux-subspace-wormhole`](https://github.com/ioof-holdings/redux-subspace/tree/master/packages/redux-subspace-wormhole): Middleware for exposing additional state to subspaces

## Upgrading From Version 1 to Version 2

When upgrading to version 2 of Redux Subspace, refer to the [migration guide](/docs/Migrating.md) to work through all the breaking changes.

## Media

* [Scaling React and Redux at IOOF](http://www.slideshare.net/VivianFarrell/scaling-react-and-redux-at-ioof) - [MelbJS](http://melbjs.com/) (Vivian Farrell, Emily Rosengren)
* [You might Need Redux (And Its Ecosystem)](http://blog.isquaredsoftware.com/2017/09/presentation-might-need-redux-ecosystem/) - [React Boston](http://www.reactboston.com/) (Mark Erikson)
* [From Monolith to Micro-Frontends](https://mpeyper.github.io/from-monolith-to-micro-frontends-wd42/) - [Web Developer 42˚](http://web.dev42.co/) (Michael Peyper)

## Contributors

Thanks goes to these wonderful people ([emojis](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/23029903?v=4" width="100px;"/><br /><sub><b>Michael Peyper</b></sub>](https://github.com/mpeyper)<br />[💬](#question-mpeyper "Answering Questions") [🐛](https://github.com/ioof-holdings/redux-subspace/issues?q=author%3Ampeyper "Bug reports") [💻](https://github.com/ioof-holdings/redux-subspace/commits?author=mpeyper "Code") [📖](https://github.com/ioof-holdings/redux-subspace/commits?author=mpeyper "Documentation") [💡](#example-mpeyper "Examples") [🤔](#ideas-mpeyper "Ideas, Planning, & Feedback") [🚇](#infra-mpeyper "Infrastructure (Hosting, Build-Tools, etc)") [👀](#review-mpeyper "Reviewed Pull Requests") [📦](#platform-mpeyper "Packaging/porting to new platform") [📢](#talk-mpeyper "Talks") [⚠️](https://github.com/ioof-holdings/redux-subspace/commits?author=mpeyper "Tests") [🔧](#tool-mpeyper "Tools") | [<img src="https://avatars2.githubusercontent.com/u/6560018?v=4" width="100px;"/><br /><sub><b>Jonathan Peyper</b></sub>](https://github.com/jpeyper)<br />[💬](#question-jpeyper "Answering Questions") [💻](https://github.com/ioof-holdings/redux-subspace/commits?author=jpeyper "Code") [🤔](#ideas-jpeyper "Ideas, Planning, & Feedback") [👀](#review-jpeyper "Reviewed Pull Requests") [⚠️](https://github.com/ioof-holdings/redux-subspace/commits?author=jpeyper "Tests") | [<img src="https://avatars3.githubusercontent.com/u/1409738?v=4" width="100px;"/><br /><sub><b>Vivian Farrell</b></sub>](https://github.com/vivian-farrell)<br />[🤔](#ideas-vivian-farrell "Ideas, Planning, & Feedback") [📦](#platform-vivian-farrell "Packaging/porting to new platform") [👀](#review-vivian-farrell "Reviewed Pull Requests") [📢](#talk-vivian-farrell "Talks") | [<img src="https://avatars2.githubusercontent.com/u/971283?v=4" width="100px;"/><br /><sub><b>Emily Rosengren</b></sub>](https://github.com/emirose)<br />[📢](#talk-emirose "Talks") | [<img src="https://avatars1.githubusercontent.com/u/121742?v=4" width="100px;"/><br /><sub><b>Morgan Larosa</b></sub>](https://github.com/chaos95)<br />[🚇](#infra-chaos95 "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars2.githubusercontent.com/u/656565?v=4" width="100px;"/><br /><sub><b>Amit Kothari</b></sub>](http://amitkothari.com)<br />[💻](https://github.com/ioof-holdings/redux-subspace/commits?author=amitkothari "Code") [💡](#example-amitkothari "Examples") | [<img src="https://avatars3.githubusercontent.com/u/1206987?v=4" width="100px;"/><br /><sub><b>Riku Rouvila</b></sub>](http://rikurouvila.fi)<br />[💻](https://github.com/ioof-holdings/redux-subspace/commits?author=rikukissa "Code") [📖](https://github.com/ioof-holdings/redux-subspace/commits?author=rikukissa "Documentation") [⚠️](https://github.com/ioof-holdings/redux-subspace/commits?author=rikukissa "Tests") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars2.githubusercontent.com/u/2007370?v=4" width="100px;"/><br /><sub><b>Michael</b></sub>](https://github.com/mradionov)<br />[💻](https://github.com/ioof-holdings/redux-subspace/commits?author=mradionov "Code") | [<img src="https://avatars0.githubusercontent.com/u/9067274?v=4" width="100px;"/><br /><sub><b>James Adams</b></sub>](https://medium.com/@jamesadams0)<br />[📖](https://github.com/ioof-holdings/redux-subspace/commits?author=James-E-Adams "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/21031458?v=4" width="100px;"/><br /><sub><b>Lee Kyles</b></sub>](https://github.com/lkyles1991)<br />[💻](https://github.com/ioof-holdings/redux-subspace/commits?author=lkyles1991 "Code") [⚠️](https://github.com/ioof-holdings/redux-subspace/commits?author=lkyles1991 "Tests") | [<img src="https://avatars1.githubusercontent.com/u/6398211?v=4" width="100px;"/><br /><sub><b>Evert Bouw</b></sub>](https://github.com/evertbouw)<br />[💻](https://github.com/ioof-holdings/redux-subspace/commits?author=evertbouw "Code") [⚠️](https://github.com/ioof-holdings/redux-subspace/commits?author=evertbouw "Tests") [📖](https://github.com/ioof-holdings/redux-subspace/commits?author=evertbouw "Documentation") [💡](#example-evertbouw "Examples") | [<img src="https://avatars0.githubusercontent.com/u/4831814?v=4" width="100px;"/><br /><sub><b>Paweł Bród</b></sub>](https://github.com/Crazy-Ivan)<br />[🐛](https://github.com/ioof-holdings/redux-subspace/issues?q=author%3ACrazy-Ivan "Bug reports") | [<img src="https://avatars0.githubusercontent.com/u/2294352?v=4" width="100px;"/><br /><sub><b>majo44</b></sub>](https://github.com/majo44)<br />[🐛](https://github.com/ioof-holdings/redux-subspace/issues?q=author%3Amajo44 "Bug reports") [💻](https://github.com/ioof-holdings/redux-subspace/commits?author=majo44 "Code") [⚠️](https://github.com/ioof-holdings/redux-subspace/commits?author=majo44 "Tests") | [<img src="https://avatars1.githubusercontent.com/u/26989071?v=4" width="100px;"/><br /><sub><b>Garth Newton</b></sub>](https://github.com/garth-newton)<br />[🐛](https://github.com/ioof-holdings/redux-subspace/issues?q=author%3Agarth-newton "Bug reports") [📖](https://github.com/ioof-holdings/redux-subspace/commits?author=garth-newton "Documentation") |
| [<img src="https://avatars2.githubusercontent.com/u/9800850?v=4" width="100px;"/><br /><sub><b>Mateusz Burzyński</b></sub>](https://github.com/Andarist)<br />[🔧](#tool-Andarist "Tools") | [<img src="https://avatars3.githubusercontent.com/u/6784822?v=4" width="100px;"/><br /><sub><b>psamusev</b></sub>](https://github.com/psamusev)<br />[🐛](https://github.com/ioof-holdings/redux-subspace/issues?q=author%3Apsamusev "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/762949?v=4" width="100px;"/><br /><sub><b>Jay Phelps</b></sub>](https://twitter.com/_jayphelps)<br />[👀](#review-jayphelps "Reviewed Pull Requests") | [<img src="https://avatars1.githubusercontent.com/u/1128784?v=4" width="100px;"/><br /><sub><b>Mark Erikson</b></sub>](http://blog.isquaredsoftware.com)<br />[📢](#talk-markerikson "Talks") | [<img src="https://avatars2.githubusercontent.com/u/15002250?v=4" width="100px;"/><br /><sub><b>Nikita</b></sub>](https://github.com/NikitaKolokoltsev)<br />[🐛](https://github.com/ioof-holdings/redux-subspace/issues?q=author%3ANikitaKolokoltsev "Bug reports") [💻](https://github.com/ioof-holdings/redux-subspace/commits?author=NikitaKolokoltsev "Code") [⚠️](https://github.com/ioof-holdings/redux-subspace/commits?author=NikitaKolokoltsev "Tests") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.
Contributions of any kind are welcome!
