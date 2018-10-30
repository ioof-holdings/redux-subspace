import { timer, of } from 'rxjs'
import { switchMap, mergeMap, map, take, takeUntil } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import { START_COUNTDOWN, INCREMENT_ASYNC, INCREMENT, CANCEL_INCREMENT_ASYNC } from '../actionTypes'

const startCountdownEpic = (action$) => {
  /*
   * This action does not exist in the corresponding redux saga example: it's used to isolate
   * better a single countdown worflow.
   */
  return action$.pipe(
    ofType(START_COUNTDOWN),
    switchMap(() => {

      const start = 5

      /*
       * A countdown generates a 5,4,3,2,1,0,-1 series of events,
       * where all are separated by 1 second but the last one (-1), that is only
       * 10 milliseconds away from 0.
       * This way, when the counter hit 0 the "INCREMENT_ASYNC" is dispatched,
       * so the counter becomes 0 again and, when it dispatches -1
       * (10 milliseconds later), the actual increment is dispatched at last.
       */
      return timer(0, 1000).pipe(
        mergeMap(tick => {
          //when we reach 5 we schedule 5 and 6.
          if (tick === start) {
            return timer(0, 10).pipe(
              mergeMap(y => of(start, start + 1))
            )
          } else {
            return of(tick)
          }
        }),
        map(i => start - i),
        take(start + 2),
        // supports cancellation
        takeUntil(action$.pipe(ofType(CANCEL_INCREMENT_ASYNC))),
        map(seconds => {
          if (seconds === -1) {
            // actual increment action
            return { type: INCREMENT }
          } else {
            // increment async action
            return { type: INCREMENT_ASYNC, value: seconds }
          }
        })
      )
    })
  )
}

/**
 * there is only one epic.
 */
export const rootEpic = combineEpics(
  startCountdownEpic
)
