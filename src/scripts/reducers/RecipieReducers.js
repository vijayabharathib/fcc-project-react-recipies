const recipie = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_RECIPIE':
      return {
        id: action.id,
        name: action.name,
        collapsed: true
      }
      break;
    default:
      return state;
  }

}

const recipies = (state=[],action) =>{
  switch (action.type) {
    case 'ADD_RECIPIE':
      return [
        ...state,
        recipie(undefined,action)
      ];
      break;
    default:
      return state;
  }
}

export default recipies;
