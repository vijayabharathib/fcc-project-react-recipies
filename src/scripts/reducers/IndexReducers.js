import recipieReducers from './RecipieReducers';
import ingredientReducers from './IngredientReducers';

const reducer=(state=[],action)=>{
  let newState=state.filter(()=>true);
  newState=recipieReducers(newState,action);
  newState=ingredientReducers(newState,action);
  return newState;
}

export default reducer;
