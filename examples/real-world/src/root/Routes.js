import React from 'react'
import { Route, Switch } from 'react-router' 
import { SubspaceProvider } from 'react-redux-subspace'
import { App } from '../app'
import { UserPage } from '../userPage'
import { RepoPage } from '../repoPage'

const Routes = () => (
  <Route path="/" render={props => (
    <SubspaceProvider mapState={(state) => state.app} namespace="app">
      <App {...props}>
        <Switch>
          <Route path="/:login/:name" render={props => (
            <SubspaceProvider mapState={(state) => state.repoPage} namespace="repoPage">
              <RepoPage {...props} />
            </SubspaceProvider>
          )} />
          <Route path="/:login" render={props => (
            <SubspaceProvider mapState={(state) => state.userPage} namespace="userPage">
              <UserPage {...props} />
            </SubspaceProvider>
          )} />
        </Switch>
      </App>
    </SubspaceProvider>
  )} />
)

export default Routes
