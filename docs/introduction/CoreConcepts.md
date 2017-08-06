# Core Concepts

Redux Subspace attempts to follow all of the [Core Concepts of Redux](http://redux.js.org/docs/introduction/CoreConcepts.html) itself without drastically changing the way you write a Redux application.  In fact, an application using a subspace as it's store should be mostly oblivious to the fact that it isn't just a regular Redux store.  The only thing that should be aware of the subspace is the parent application that created it.

In that regard, it is important to note that subspaces are arbitrarily nestable, so an application that creates a subspace for a sub-application could be a sub-application in it's own right.
