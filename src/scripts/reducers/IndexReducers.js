import {combineReducers} from 'redux';
import recipies from './RecipieReducers';

const recipieList=combineReducers({
  recipies
});

export default recipieList;
