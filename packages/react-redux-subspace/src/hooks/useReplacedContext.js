/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext, useMemo } from "react"

const useReplacedContext = (context, store) => {
  const contextValue = useContext(context)
  return useMemo(
    () => ({ ...contextValue, store }),
    [contextValue, store]
  )
}

export default useReplacedContext
