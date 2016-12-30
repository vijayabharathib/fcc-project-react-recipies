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

const recipies = (state=[],action) =>{
  switch (action.type) {
    case 'ADD_RECIPIE':
      return [
        ...state,
        recipie(undefined,action)
      ];
    default:
      return state;
  }
}

export default recipies;
