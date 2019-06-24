import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import auth from './auth';
import projects from './projects';

const rootReducer = combineReducers({
    form,
    auth,
    projects
});

export default rootReducer;
