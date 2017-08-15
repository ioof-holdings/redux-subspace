# Introduction

Redux Subspace is an extension to Redux. If you are not familiar with Redux itself, please take the time read [their documentation](http://redux.js.org/) first.

## Motivation

Redux revolutionised state management in single-page javascript applications, however, in large, complex applications, it doesn't take long before there are lots of nested reducers and refactoring the state structure can have a rippling effect throughout the application.

A common solution to solve this is to break the large application up into multiple sub-applications. The [Redux documentation](http://redux.js.org/docs/recipes/IsolatingSubapps.html) suggests using multiple stores to do this, but often there is some part of the state that is global to all the sub apps as well as their own local state.

Redux Subspace attempts to solve this problem in a different way. Rather than multiple stores, a single store is used, so there is still [a single source of truth](http://redux.js.org/docs/introduction/ThreePrinciples.html#single-source-of-truth), and sub-stores are created with a selector to present a slice of the state to the sub-application.

Another common issue that occurs in large applications is how to [reuse action and reducer logic](http://redux.js.org/docs/recipes/reducers/ReusingReducerLogic.html) for multiple sections of the state. Redux Subspace has the ability to namespace actions and reducers to prevent action type cross-talk and state changes in unrelated sections of the application.

## Core Concepts

Redux Subspace attempts to follow all of the [Core Concepts of Redux](http://redux.js.org/docs/introduction/CoreConcepts.html) itself without drastically changing the way you write a Redux application.  In fact, an application using a subspace as it's store should be mostly oblivious to the fact that it isn't just a regular Redux store.  The only thing that should be aware of the subspace is the parent application that created it.

In that regard, it is important to note that subspaces are arbitrarily nestable, so an application that creates a subspace for a sub-application could be a sub-application in it's own right.
