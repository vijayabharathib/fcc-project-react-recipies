const _recipie = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_RECIPIE':
      return {
        id: action.id,
        name: action.name,
        collapsed: true,
        editable: false
      }
    default:
      return state;
  }
}

const _deleteItem=(state,action) => {
  return state.filter(recipie => recipie.id!==action.id);
}

const _editItem=(state,action)=>{
  let newState=Object.assign(state);
  let newRecipie;
  for(var i=0;i<newState.length;i++){
    if(newState[i].id===action.id){
      newRecipie=Object.assign({},newState[i],{
        editable: !newState[i].editable
      });
      break;
    }
  }
  return [
    ...newState.slice(0,i),
    newRecipie,
    ...newState.slice(i+1)
  ];
}
const recipies = (state=[],action) => {
  switch (action.type) {
    case 'ADD_RECIPIE':
      return [
        ...state,
        _recipie(undefined,action)
      ];
    case 'DELETE_RECIPIE':
      return _deleteItem(state,action);
    case 'EDIT_RECIPIE':
      return _editItem(state,action);
    default:
      return state;
  }
}

export default recipies;
