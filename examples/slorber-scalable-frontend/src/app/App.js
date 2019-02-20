import React from 'react'
import { SubspaceProvider } from 'react-redux-subspace'

// work around for lerna/npm link issue for local development
import { ReactReduxContext } from 'react-redux'

import { RandomGif } from '../randomGif'
import { RandomGifPair } from '../randomGifPair'
import { RandomGifPairPair } from '../randomGifPairPair'
import { Button } from '../button'
import { Counter } from '../counter'

const App = () => (
  <div>
    <h2>1. RandomGif</h2>
    <hr/>
  
    <h3>1.1 Single</h3>
    <SubspaceProvider namespace='randomGif' context={ReactReduxContext}>
      <RandomGif />
    </SubspaceProvider>
    <hr/>
    
    <h3>1.2 Pair</h3>
    <SubspaceProvider namespace='randomGifPair' context={ReactReduxContext}>
      <RandomGifPair />
    </SubspaceProvider>
    <hr/>
    
    <h3>1.3 Pair of Pair</h3>
    <SubspaceProvider namespace='randomGifPairPair' context={ReactReduxContext}>
      <RandomGifPairPair />
    </SubspaceProvider>
    <hr/>
    
    <h3>2. Button</h3>
    <SubspaceProvider namespace='button' context={ReactReduxContext}>
      <Button />
    </SubspaceProvider>
    <hr/>
        
    <h3>3. Counter</h3>
    <SubspaceProvider namespace='counter' context={ReactReduxContext}>
      <Counter />
    </SubspaceProvider>
    <hr/>
  </div>
)

export default App
