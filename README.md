# redux-subspace

## Deprecated

**This library is no longer being actively maintained.**

IOOF has been slowly moving away from the ubiquitous use of Redux as a core piece of our micro-frontend architecture and have been actively replacing
the usage of this library with more standard React and JavaScript patterns.  Due to some technical constraints, we've also been unable to upgrade to
the latest version of the library ourselves for quite some time now, further fuelling our desire to move away from this solution.

At this time, we will be ceasing all maintenance tasks and we recommend that you consider using an alternative library:

* [`redux-doghouse`](https://www.npmjs.com/package/redux-doghouse)
* [`redux-fractal`](https://www.npmjs.com/package/redux-fractal)
* [`lean-redux`](https://www.npmjs.com/package/lean-redux)
* [`redux-react-local`](https://www.npmjs.com/package/redux-react-local)
* [`multireducer`](https://www.npmjs.com/package/multireducer)

If you want to continue using this library, we encourage you to fork this repo and take over maintenance yourself.

---

[![npm version](https://img.shields.io/npm/v/redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace)
[![npm downloads](https://img.shields.io/npm/dm/redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/redux-subspace)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/redux-subspace.svg?style=flat-square)](/LICENSE.md)

[![All Contributors](https://img.shields.io/badge/all_contributors-21-orange.svg?style=flat-square)](#contributors-)
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
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/mpeyper"><img src="https://avatars0.githubusercontent.com/u/23029903?v=4" width="100px;" alt="Michael Peyper"/><br /><sub><b>Michael Peyper</b></sub></a><br /><a href="#question-mpeyper" title="Answering Questions">💬</a> <a href="https://github.com/ioof-holdings/redux-subspace/issues?q=author%3Ampeyper" title="Bug reports">🐛</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=mpeyper" title="Code">💻</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=mpeyper" title="Documentation">📖</a> <a href="#example-mpeyper" title="Examples">💡</a> <a href="#ideas-mpeyper" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-mpeyper" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#review-mpeyper" title="Reviewed Pull Requests">👀</a> <a href="#platform-mpeyper" title="Packaging/porting to new platform">📦</a> <a href="#talk-mpeyper" title="Talks">📢</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=mpeyper" title="Tests">⚠️</a> <a href="#tool-mpeyper" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/jpeyper"><img src="https://avatars2.githubusercontent.com/u/6560018?v=4" width="100px;" alt="Jonathan Peyper"/><br /><sub><b>Jonathan Peyper</b></sub></a><br /><a href="#question-jpeyper" title="Answering Questions">💬</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=jpeyper" title="Code">💻</a> <a href="#ideas-jpeyper" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-jpeyper" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=jpeyper" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/vivian-farrell"><img src="https://avatars3.githubusercontent.com/u/1409738?v=4" width="100px;" alt="Vivian Farrell"/><br /><sub><b>Vivian Farrell</b></sub></a><br /><a href="#ideas-vivian-farrell" title="Ideas, Planning, & Feedback">🤔</a> <a href="#platform-vivian-farrell" title="Packaging/porting to new platform">📦</a> <a href="#review-vivian-farrell" title="Reviewed Pull Requests">👀</a> <a href="#talk-vivian-farrell" title="Talks">📢</a></td>
    <td align="center"><a href="https://github.com/emirose"><img src="https://avatars2.githubusercontent.com/u/971283?v=4" width="100px;" alt="Emily Rosengren"/><br /><sub><b>Emily Rosengren</b></sub></a><br /><a href="#talk-emirose" title="Talks">📢</a></td>
    <td align="center"><a href="https://github.com/chaos95"><img src="https://avatars1.githubusercontent.com/u/121742?v=4" width="100px;" alt="Morgan Larosa"/><br /><sub><b>Morgan Larosa</b></sub></a><br /><a href="#infra-chaos95" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://amitkothari.com"><img src="https://avatars2.githubusercontent.com/u/656565?v=4" width="100px;" alt="Amit Kothari"/><br /><sub><b>Amit Kothari</b></sub></a><br /><a href="https://github.com/ioof-holdings/redux-subspace/commits?author=amitkothari" title="Code">💻</a> <a href="#example-amitkothari" title="Examples">💡</a></td>
    <td align="center"><a href="http://rikurouvila.fi"><img src="https://avatars3.githubusercontent.com/u/1206987?v=4" width="100px;" alt="Riku Rouvila"/><br /><sub><b>Riku Rouvila</b></sub></a><br /><a href="https://github.com/ioof-holdings/redux-subspace/commits?author=rikukissa" title="Code">💻</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=rikukissa" title="Documentation">📖</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=rikukissa" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mradionov"><img src="https://avatars2.githubusercontent.com/u/2007370?v=4" width="100px;" alt="Michael"/><br /><sub><b>Michael</b></sub></a><br /><a href="https://github.com/ioof-holdings/redux-subspace/commits?author=mradionov" title="Code">💻</a></td>
    <td align="center"><a href="https://medium.com/@jamesadams0"><img src="https://avatars0.githubusercontent.com/u/9067274?v=4" width="100px;" alt="James Adams"/><br /><sub><b>James Adams</b></sub></a><br /><a href="https://github.com/ioof-holdings/redux-subspace/commits?author=James-E-Adams" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/lkyles1991"><img src="https://avatars1.githubusercontent.com/u/21031458?v=4" width="100px;" alt="Lee Kyles"/><br /><sub><b>Lee Kyles</b></sub></a><br /><a href="https://github.com/ioof-holdings/redux-subspace/commits?author=lkyles1991" title="Code">💻</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=lkyles1991" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/evertbouw"><img src="https://avatars1.githubusercontent.com/u/6398211?v=4" width="100px;" alt="Evert Bouw"/><br /><sub><b>Evert Bouw</b></sub></a><br /><a href="https://github.com/ioof-holdings/redux-subspace/commits?author=evertbouw" title="Code">💻</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=evertbouw" title="Tests">⚠️</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=evertbouw" title="Documentation">📖</a> <a href="#example-evertbouw" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/Crazy-Ivan"><img src="https://avatars0.githubusercontent.com/u/4831814?v=4" width="100px;" alt="Paweł Bród"/><br /><sub><b>Paweł Bród</b></sub></a><br /><a href="https://github.com/ioof-holdings/redux-subspace/issues?q=author%3ACrazy-Ivan" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/majo44"><img src="https://avatars0.githubusercontent.com/u/2294352?v=4" width="100px;" alt="majo44"/><br /><sub><b>majo44</b></sub></a><br /><a href="https://github.com/ioof-holdings/redux-subspace/issues?q=author%3Amajo44" title="Bug reports">🐛</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=majo44" title="Code">💻</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=majo44" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/garth-newton"><img src="https://avatars1.githubusercontent.com/u/26989071?v=4" width="100px;" alt="Garth Newton"/><br /><sub><b>Garth Newton</b></sub></a><br /><a href="https://github.com/ioof-holdings/redux-subspace/issues?q=author%3Agarth-newton" title="Bug reports">🐛</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=garth-newton" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Andarist"><img src="https://avatars2.githubusercontent.com/u/9800850?v=4" width="100px;" alt="Mateusz Burzyński"/><br /><sub><b>Mateusz Burzyński</b></sub></a><br /><a href="#tool-Andarist" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/psamusev"><img src="https://avatars3.githubusercontent.com/u/6784822?v=4" width="100px;" alt="psamusev"/><br /><sub><b>psamusev</b></sub></a><br /><a href="https://github.com/ioof-holdings/redux-subspace/issues?q=author%3Apsamusev" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://twitter.com/_jayphelps"><img src="https://avatars1.githubusercontent.com/u/762949?v=4" width="100px;" alt="Jay Phelps"/><br /><sub><b>Jay Phelps</b></sub></a><br /><a href="#review-jayphelps" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://blog.isquaredsoftware.com"><img src="https://avatars1.githubusercontent.com/u/1128784?v=4" width="100px;" alt="Mark Erikson"/><br /><sub><b>Mark Erikson</b></sub></a><br /><a href="#talk-markerikson" title="Talks">📢</a></td>
    <td align="center"><a href="https://github.com/NikitaKolokoltsev"><img src="https://avatars2.githubusercontent.com/u/15002250?v=4" width="100px;" alt="Nikita"/><br /><sub><b>Nikita</b></sub></a><br /><a href="https://github.com/ioof-holdings/redux-subspace/issues?q=author%3ANikitaKolokoltsev" title="Bug reports">🐛</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=NikitaKolokoltsev" title="Code">💻</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=NikitaKolokoltsev" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://burningpotato.com"><img src="https://avatars1.githubusercontent.com/u/540777?v=4" width="100px;" alt="Conrad Buck"/><br /><sub><b>Conrad Buck</b></sub></a><br /><a href="https://github.com/ioof-holdings/redux-subspace/commits?author=conartist6" title="Code">💻</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=conartist6" title="Tests">⚠️</a> <a href="https://github.com/ioof-holdings/redux-subspace/commits?author=conartist6" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/travikk"><img src="https://avatars2.githubusercontent.com/u/627275?v=4" width="100px;" alt="travikk"/><br /><sub><b>travikk</b></sub></a><br /><a href="#review-travikk" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.
Contributions of any kind are welcome!
