import React from 'react'
import { Route } from 'react-router'
import { subspaced } from 'react-redux-subspace'
import { App } from '../app'
import { UserPage } from '../userPage'
import { RepoPage } from '../repoPage'

export default <Route path="/" component={subspaced((state) => state.app, 'app')(App)}>
  <Route path="/:login/:name"
         component={subspaced((state) => state.repoPage, 'repoPage')(RepoPage)} />
  <Route path="/:login"
         component={subspaced((state) => state.userPage, 'userPage')(UserPage)} />
</Route>
