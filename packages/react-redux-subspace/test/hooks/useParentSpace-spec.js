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

import useParentSpace from "../../src/hooks/useParentSpace"

describe("useParentSpace Tests", () => {
  it("should return parent space", () => {
    let state = {
      subState: {
        value: "wrong"
      },
      value: "expected"
    }

    let mockSubspace = configureStore()(state.subState)

    let mockStore = configureStore()(state)

    mockSubspace.parentStore = mockStore

    let wrapper = ({ children }) => (
      <Provider store={mockSubspace}>{children}</Provider>
    )
    let { result } = renderHook(() => useParentSpace(), {
      wrapper
    })

    expect(result.current).to.equal(mockStore)
  })

  it("should return new parent space if store change", () => {
    let state = {
      subState1: {
        value: "wrong"
      },
      subState2: {
        value: "wrong"
      },
      value: "expected"
    }

    let mockSubspace = configureStore()(state.subState1)

    let mockStore = configureStore()(state)

    mockSubspace.parentStore = mockStore

    let wrapper = ({ children }) => (
      <Provider store={mockSubspace}>{children}</Provider>
    )
    let { result, rerender } = renderHook(() => useParentSpace(), {
      wrapper
    })

    mockSubspace = configureStore()(state.subState2)

    mockStore = configureStore()(state)

    mockSubspace.parentStore = mockStore

    rerender()

    expect(result.current).to.equal(mockStore)
  })

  it("should return parent space from custom context", () => {
    it("should return parent space", () => {
      let state = {
        subState: {
          value: "wrong"
        },
        value: "expected"
      }

      let mockSubspace = configureStore()(state.subState)

      let mockStore = configureStore()(state)

      mockSubspace.parentStore = mockStore

      let customContext = React.createContext(null)

      let wrapper = ({ children }) => (
        <Provider store={mockSubspace} context={customContext}>
          {children}
        </Provider>
      )
      let { result } = renderHook(() => useParentSpace(), {
        wrapper
      })

      expect(result.current).to.equal(mockStore)
    })
  })
})
