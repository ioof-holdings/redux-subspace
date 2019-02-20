import React from 'react'
import { SubspaceProvider } from 'react-redux-subspace'

// work around for lerna/npm link issue for local development
import { ReactReduxContext } from 'react-redux'

import { RandomGifPair } from '../randomGifPair'

const RandomGifPairPair = () => (
  <div>
    <SubspaceProvider namespace='randomGifPair1' context={ReactReduxContext}>
      <RandomGifPair />
    </SubspaceProvider>
    <SubspaceProvider namespace='randomGifPair2' context={ReactReduxContext}>
      <RandomGifPair />
    </SubspaceProvider>
  </div>
)

export default RandomGifPairPair
