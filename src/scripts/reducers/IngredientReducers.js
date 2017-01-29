
const _findRecipie=(state,id)=>{
  let list=state.filter(recipie => {
    return recipie.id===id;
  });
  return (list.length===1 ? Object.assign({},list[0]) : undefined);
}

//this function takes a recipie
//and replaces the recipie with the same id in the state
const _mergeRecipie=(state,recipie)=>{
  //if recipie id in the state matches required recipie,
  //return the new recipie,
  //if not return the old recipie intact
  return state.map((item)=>{
    return (item.id===recipie.id ? recipie : item);
  });
}

const _addIngredient=(state,action) => {
  let recipie=_findRecipie(state,action.recipie_id);
  recipie.ingredients=(recipie.ingredients.length>0 ? recipie.ingredients : []);
  let newIngredients=recipie.ingredients.filter(()=>true);
  newIngredients.push({id: action.ingredient_id,name: action.name, editable: false});
  recipie.ingredients=newIngredients;
  return _mergeRecipie(state,recipie);
}


const _deleteIngredient=(state,action) => {
  let recipie=_findRecipie(state,action.recipie_id);
  recipie.ingredients=recipie.ingredients.filter((ingredient)=>{
    return ingredient.id!==action.ingredient_id;
  });
  return _mergeRecipie(state,recipie);
}

//used by _editIngredient & _updateIngredient functions
const _amendIngredientParts=(ingredients,id,propertiesToUpdate)=>{
  return ingredients.map((ingredient)=>{
    return (ingredient.id===id ? Object.assign(ingredient,propertiesToUpdate): ingredient);
  });
}

const _editIngredient=(state,action) => {
  let recipie=_findRecipie(state,action.recipie_id);

  let propertiesToUpdate={
    editable: true
  };
  recipie.ingredients=_amendIngredientParts(recipie.ingredients,action.ingredient_id,propertiesToUpdate);
  return _mergeRecipie(state,recipie);
}

const _updateIngredient=(state,action) => {
  let recipie=_findRecipie(state,action.recipie_id);
  let propertiesToUpdate={
    name: action.name,
    editable: false
  };
  recipie.ingredients=_amendIngredientParts(recipie.ingredients,action.ingredient_id,propertiesToUpdate);
  return _mergeRecipie(state,recipie);
}

const reduceIngredients = (state=[],action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return _addIngredient(state,action);
    case 'DELETE_INGREDIENT':
      return _deleteIngredient(state,action);
    case 'EDIT_INGREDIENT':
      return _editIngredient(state,action);
    case 'UPDATE_INGREDIENT':
      return _updateIngredient(state,action);
    default:
      return state;
  }
}

export default reduceIngredients;
