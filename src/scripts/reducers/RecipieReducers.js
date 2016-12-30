const recipie = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_RECIPIE':
      return {
        id: action.id,
        name: action.name,
        collapsed: true
      }
    default:
      return state;
  }
}

const deleteItem=(state,action) => {
  return state.filter(recipie => recipie.id!==action.id);
}

const recipies = (state=[],action) => {
  switch (action.type) {
    case 'ADD_RECIPIE':
      return [
        ...state,
        recipie(undefined,action)
      ];
    case 'DELETE_RECIPIE':
      return deleteItem(state,action);
    default:
      return state;
  }
}

export default recipies;
