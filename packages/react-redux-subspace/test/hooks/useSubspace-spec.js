/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

import { renderHook } from "@testing-library/react-hooks"

import useSubspace from "../../src/hooks/useSubspace"

describe("useSubspace Tests", () => {
  it("should create subspace", () => {
    let state = {
      subState: {
        value: "expected"
      },
      value: "wrong"
    }

    let mockStore = configureStore()(state)

    let wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    )
    let { result } = renderHook(() => useSubspace(state => state.subState), {
      wrapper
    })

    expect(result.current.getState()).to.deep.equal({ value: "expected" })
  })

  it("should create subspace with namespace", () => {
    let state = {
      subState: {
        value: "expected"
      },
      value: "wrong"
    }

    let mockStore = configureStore()(state)

    let wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    )
    let { result } = renderHook(
      () => useSubspace(state => state.subState, "test"),
      {
        wrapper
      }
    )

    result.current.dispatch({ type: "TEST_ACTION" })

    expect(mockStore.getActions()).to.deep.equal([{ type: "test/TEST_ACTION" }])
  })

  it("should create subspace with namespace for substate", () => {
    let state = {
      subState: {
        value: "expected"
      },
      value: "wrong"
    }

    let mockStore = configureStore()(state)

    let wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    )
    let { result } = renderHook(() => useSubspace("subState"), {
      wrapper
    })

    result.current.dispatch({ type: "TEST_ACTION" })

    expect(result.current.getState()).to.deep.equal({ value: "expected" })
    expect(mockStore.getActions()).to.deep.equal([
      { type: "subState/TEST_ACTION" }
    ])
  })

  it("should map to new state if mapState changes without recreating subspace", () => {
    let state1 = {
      subState1: {
        value: "wrong"
      },
      subState2: {
        value: "expected"
      },
      value: "wrong"
    }

    let mockStore = configureStore()(state1)

    let wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    )
    let { result, rerender } = renderHook(
      ({ mapState }) => useSubspace(mapState),
      {
        wrapper,
        initialProps: {
          mapState: state => state.subState1
        }
      }
    )

    const originalSubspace = result.current

    rerender({ mapState: state => state.subState2 })

    expect(result.current.getState()).to.deep.equal({ value: "expected" })
    expect(result.current).to.equal(originalSubspace)
  })

  it("should recreate subspace if mapState changes in string form", () => {
    let state1 = {
      subState1: {
        value: "wrong"
      },
      subState2: {
        value: "expected"
      },
      value: "wrong"
    }

    let mockStore = configureStore()(state1)

    let wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    )
    let { result, rerender } = renderHook(
      ({ mapState }) => useSubspace(mapState),
      {
        wrapper,
        initialProps: {
          mapState: 'subState1'
        }
      }
    )

    const originalSubspace = result.current

    rerender({ mapState: 'subState2' })

    expect(result.current.getState()).to.deep.equal({ value: "expected" })
    expect(result.current).to.not.equal(originalSubspace)
  })

  it("should recreate subspace if namespace changes", () => {
    let state1 = {
      subState: {
        value: "expected"
      },
      value: "wrong"
    }

    let mockStore = configureStore()(state1)

    let wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    )
    let { result, rerender } = renderHook(
      ({ mapState, namespace }) => useSubspace(mapState, namespace),
      {
        wrapper,
        initialProps: {
          mapState: state => state.subState,
          namespace: "test1"
        }
      }
    )

    rerender({ namespace: "test2" })

    result.current.dispatch({ type: "TEST_ACTION" })

    expect(mockStore.getActions()).to.deep.equal([
      { type: "test2/TEST_ACTION" }
    ])
  })

  it("should recreate subspace if store change", () => {
    let state1 = {
      subState: {
        value: "wrong"
      },
      value: "wrong"
    }

    let mockStore = configureStore()(state1)

    let wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    )
    let { result, rerender } = renderHook(
      () => useSubspace(state => state.subState),
      {
        wrapper
      }
    )

    let state2 = {
      subState: {
        value: "expected"
      },
      value: "wrong"
    }

    mockStore = configureStore()(state2)

    rerender()

    expect(result.current.getState()).to.deep.equal({ value: "expected" })
  })

  it("should not recreate subspace if nothing changes", () => {
    let state1 = {
      subState: {
        value: "expected"
      },
      value: "wrong"
    }

    let mockStore = configureStore()(state1)

    let wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    )
    let { result, rerender } = renderHook(
      ({ mapState, namespace }) => useSubspace(mapState, namespace),
      {
        wrapper,
        initialProps: {
          mapState: state => state.subState,
          namespace: "test"
        }
      }
    )

    let originalStore = result.current

    rerender()

    result.current.dispatch({ type: "TEST_ACTION" })

    expect(result.current).to.equal(originalStore)
  })

  it("should create subspace with custom context", () => {
    let state = {
      subState: {
        value: "expected"
      },
      value: "wrong"
    }

    let mockStore = configureStore()(state)

    let customContext = React.createContext(null)

    let wrapper = ({ children }) => (
      <Provider store={mockStore} context={customContext}>
        {children}
      </Provider>
    )
    let { result } = renderHook(
      () =>
        useSubspace(state => state.subState, { context: customContext }),
      {
        wrapper
      }
    )

    expect(result.current.getState()).to.deep.equal({ value: "expected" })
  })
})
