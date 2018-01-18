import { combineReducers } from 'redux'
import * as ActionTypes from './actions'
import entities from '../common/reducers/entities'
import paginate from '../common/reducers/paginate'

export default combineReducers({
    entities,
    starredByUser: paginate({
      mapActionToKey: action => action.login,
      types: [
        ActionTypes.STARRED_REQUEST,
        ActionTypes.STARRED_SUCCESS,
        ActionTypes.STARRED_FAILURE
      ]
    })
})
