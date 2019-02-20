import React from 'react'
import { Route, Switch } from 'react-router' 
import { SubspaceProvider } from 'react-redux-subspace'

// work around for lerna/npm link issue for local development
import { ReactReduxContext } from 'react-redux'

import { App } from '../app'
import { UserPage } from '../userPage'
import { RepoPage } from '../repoPage'

const Routes = () => (
  <Route path="/" render={props => (
    <SubspaceProvider mapState={(state) => state.app} namespace="app" context={ReactReduxContext}>
      <App {...props}>
        <Switch>
          <Route path="/:login/:name" render={props => (
            <SubspaceProvider mapState={(state) => state.repoPage} namespace="repoPage" context={ReactReduxContext}>
              <RepoPage {...props} />
            </SubspaceProvider>
          )} />
          <Route path="/:login" render={props => (
            <SubspaceProvider mapState={(state) => state.userPage} namespace="userPage" context={ReactReduxContext}>
              <UserPage {...props} />
            </SubspaceProvider>
          )} />
        </Switch>
      </App>
    </SubspaceProvider>
  )} />
)

export default Routes
