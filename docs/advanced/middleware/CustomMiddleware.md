# Custom Middleware

## Redux Middlware

If you want to write middleware that is compatible with Redux in general, you can just follow the [Redux documentation](http://redux.js.org/docs/advanced/Middleware.html).

You may want to consider exporting your middleware with [one of the utilites](/docs/advanced/middleware/README.md#using-existing-redux-middleware) for applying the middleware to a specific layer if you are aware of a specific requirement your middleware has.

## Redux Subspace Middleware

Although Redux Subspace works with standard Redux middleware, you can also write Redux Subspace specific middleware.  The main difference between Redux middleware and Redux Subspace middleware, is Redux middleware only allows you to modify the `dispatch` pipeline, whereas Redux Subspace middleware can modify both the `dispatch` and the `getState` pipelines.

### `dispatch` Middleware

`dispatch` middleware can be written the same as standard Redux middleware:

```javascript
const middleware = (subspace) => (next) => (action) => next(action)
```

We can also write it more explicilty as:

```javascript
const middleware = (subspace) => ({
    dispatch: (next) => (action) => next(action)
})
```

### `getState` Middleware

`getState` middleware is similar to the more explicit `dispatch` middleware:

```javascript
const middleware = (subspace) => ({
    getState: (next) => () => next()
})
```

### Combining `dispatch` and `getState` Middleware

It is possible to write a single middleware that extends both pipelines:

```javascript
const middleware = (subspace) => ({
    dispatch: (next) => (action) => next(action),
    getState: (next) => () => next()
})
```
