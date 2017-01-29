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
const _amendRecipieParts=(state,id,propertiesToUpdate)=>{
  let condense=Object.assign; //take a copy of Object.assign function
  let newState=state.filter(()=>true);//condense(state);
  return newState.map(recipie => {
    //if id matches, then merge required properties with recipie,
    //if not, return the recipie intact
    return (recipie.id===id ? condense({},recipie,propertiesToUpdate) : recipie);
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


const _toggleIngredient=(state,action) => {
  let newState=state.filter(()=>true);//Object.assign(state);
  let recipie=_findRecipie(newState,action.recipie_id);
  recipie.collapsed=!recipie.collapsed;
  return _mergeRecipie(newState,recipie);
}


const recipieReducers = (state=[],action) => {
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
    default:
      return state;
  }
}

export default recipieReducers;
