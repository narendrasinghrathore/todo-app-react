import { combineReducers } from 'redux';
import reducer from './todo.reducer';

const AppReducer = combineReducers({
    todo: reducer
})

export default AppReducer;