import { combineReducers } from 'redux'
import * as ActionTypes from './actions'
import entities from '../common/reducers/entities'
import paginate from '../common/reducers/paginate'

export default combineReducers({
    entities,
    stargazersByRepo: paginate({
      mapActionToKey: action => action.fullName,
      types: [
        ActionTypes.STARGAZERS_REQUEST,
        ActionTypes.STARGAZERS_SUCCESS,
        ActionTypes.STARGAZERS_FAILURE
      ]
    })
})
