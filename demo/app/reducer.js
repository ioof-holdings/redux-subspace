import { combineReducers } from 'redux'
import { namespaced } from '../../src'
import configuration from './configuration'
import { reducer as subComponent } from '../component1'
import { reducer as middleComponent} from '../component2'
import { reducer as thunkComponent } from '../component3'

const reducer = combineReducers({ 
    configuration, 
    subComponent, 
    namespacedComponent: namespaced(subComponent, 'namespaced'), 
    middleComponent: namespaced(middleComponent, 'middle'), 
    thunkComponent, 
    namespacedThunkComponent: namespaced(thunkComponent, 'namespacedThunk') 
})

export { reducer }