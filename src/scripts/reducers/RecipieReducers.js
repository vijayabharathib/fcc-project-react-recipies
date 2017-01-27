const _newRecipie = (action) => {
    return {
      id: action.id,
      name: action.name,
      collapsed: true,
      editable: false,
      ingredients: []
    }
}

const _deleteRecipie=(state,action) => {
  return state.filter(recipie => recipie.id!==action.id);
}

//used by _editRecipie & _updateRecipie
const _amendRecipieParts=(state,id,partial)=>{
  let newState=Object.assign(state);
  return newState.map(recipie => {
    if(recipie.id===id) { //find the right recipie
      return Object.assign({},recipie,partial); //overwrite parts supplied
    } else {
      return recipie;
    }
  });
}

//make the recipie editable (GUI STATE)
const _editRecipie=(state,action)=>{
  //change only the editable flag to make it editable
  let partial={
    editable: true
  };
  return _amendRecipieParts(state,action.id,partial);
}

//update recipie (to rename)
const _updateRecipie=(state,action)=>{
  //just change the name and make it non-editable
  let partial={
    name: action.name,
    editable: false
  };
  return _amendRecipieParts(state,action.id,partial);
}

const _addIngredient=(state,action) => {
  let recipie;
  let newState=Object.assign(state);
  for(var i=0;i<newState.length;i++){
    if(newState[i].id===action.recipie_id){
      break;
    }
  }
  recipie=newState[i];
  recipie.ingredients=(recipie.ingredients.length>0 ? recipie.ingredients : []);
  recipie.ingredients.push({id: action.ingredient_id,name: action.name, editable: false});
  return [
    ...newState.slice(0,i),
    recipie,
    ...newState.slice(i+1)
  ];
}

const _toggleIngredient=(state,action) => {
  let recipie;
  let newState=Object.assign(state);
  for(var i=0;i<newState.length;i++){
    if(newState[i].id===action.recipie_id){
      break;
    }
  }
  recipie=newState[i];
  recipie.collapsed=!recipie.collapsed;
  return [
    ...newState.slice(0,i),
    recipie,
    ...newState.slice(i+1)
  ];
}

const _deleteIngredient=(state,action) => {
  let recipie;
  let newState=Object.assign(state);
  for(var i=0;i<newState.length;i++){
    if(newState[i].id===action.recipie_id){
      break;
    }
  }
  recipie=newState[i];
  recipie.ingredients=recipie.ingredients.filter((ingredient)=>{
    return ingredient.id!==action.ingredient_id;
  });
  return [
    ...newState.slice(0,i),
    recipie,
    ...newState.slice(i+1)
  ];
}

const _editIngredient=(state,action) => {
  let recipie;
  let newState=Object.assign(state);
  for(var i=0;i<newState.length;i++){
    if(newState[i].id===action.recipie_id){
      break;
    }
  }
  recipie=newState[i];
  recipie.ingredients=recipie.ingredients.map((ingredient)=>{
    if(ingredient.id===action.ingredient_id){
      ingredient.editable=!ingredient.editable;
    }
    return ingredient;
  });
  return [
    ...newState.slice(0,i),
    recipie,
    ...newState.slice(i+1)
  ];
}

const _updateIngredient=(state,action) => {
  let recipie;
  let newState=Object.assign(state);
  for(var i=0;i<newState.length;i++){
    if(newState[i].id===action.recipie_id){
      break;
    }
  }
  recipie=newState[i];
  recipie.ingredients=recipie.ingredients.map((ingredient)=>{
    if(ingredient.id===action.ingredient_id){
      ingredient.name=action.name;
      ingredient.editable=false;
    }
    return ingredient;
  });
  return [
    ...newState.slice(0,i),
    recipie,
    ...newState.slice(i+1)
  ];
}

const _flushAll=(state)=>{
  state=[];
}
const recipies = (state=[],action) => {
  switch (action.type) {
    case 'ADD_RECIPIE':
      return [
        _newRecipie(action),
        ...state
      ];
    case 'DELETE_RECIPIE':
      return _deleteRecipie(state,action);
    case 'EDIT_RECIPIE':
      return _editRecipie(state,action);
    case 'UPDATE_RECIPIE':
      return _updateRecipie(state,action);
    case 'TOGGLE_INGREDIENT':
      return _toggleIngredient(state,action);
    case 'ADD_INGREDIENT':
      return _addIngredient(state,action);
    case 'DELETE_INGREDIENT':
      return _deleteIngredient(state,action);
    case 'EDIT_INGREDIENT':
      return _editIngredient(state,action);
    case 'UPDATE_INGREDIENT':
      return _updateIngredient(state,action);
    case 'FLUSH_ALL':
      return _flushAll(state);
    default:
      return state;
  }
}

export default recipies;
