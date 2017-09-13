# Enhancers

In standard Redux, [`enhancers`](http://redux.js.org/docs/introduction/Ecosystem.html#enhancers) can be used to enhance the store with third-party capabilities. Many of the existing Redux enhancers will just work with Redux Subspace, but enhancers that try to use the store's `dispatch` function can cause some problems for namespaced subspaces as it may bypass the subspace and go directly to the root store.

Fixing this generally involves creating some form of wrapper around the thing the enhancer trying to use to augment it's functionality to be aware of subspaces.

## Supported Redux Enhancers

As previously stated, many Redux enhancers will just work with Redux Subspace, but the following list is actively supported:

* [redux-loop](/docs/advanced/enhancers/redux-loop.md)
