import React from 'react'
import { SubspaceProvider } from 'react-redux-subspace'

// work around for lerna/npm link issue for local development
import { ReactReduxContext } from 'react-redux'

import { RandomGif } from '../randomGif'

const RandomGifPair = () => (
  <div style={{ display: 'flex' }}>
    <SubspaceProvider namespace='randomGif1' context={ReactReduxContext}>
      <div style={{ marginRight: '10px' }}>
        <RandomGif />
      </div>
    </SubspaceProvider>
    <SubspaceProvider namespace='randomGif2' context={ReactReduxContext}>
      <div style={{ flowGrow: 1 }}>
        <RandomGif />
      </div>
    </SubspaceProvider>
  </div>
)

export default RandomGifPair
