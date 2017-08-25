# redux-promise

The [`redux-promise` middleware](https://github.com/acdlite/redux-promise) works simply by using [Redux Subspace's `applyMiddleware` function](/docs/advanced/middleware/README.md).

```javascript
import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import promiseMiddleware from 'redux-promise'

const store = createStore(reducer, applyMiddleware(promiseMiddleware))
```

Now, the resulting actions when the promises resolve will be namespace correctly from the store they were dispatched from.
