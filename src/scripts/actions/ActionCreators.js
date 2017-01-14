let nextRecipie=0;
export const addRecipie=(name) => {
  return {
    type: 'ADD_RECIPIE',
    name,
    id: nextRecipie++
  }
}

export const deleteRecipie=(id) => {
  return {
    type: 'DELETE_RECIPIE',
    id
  }
}

export const editRecipie=(id)=>{
  return {
    type: 'EDIT_RECIPIE',
    id
  }
}

export const updateRecipie=(id,name)=>{
  return {
    type: 'UPDATE_RECIPIE',
    id,
    name
  }
}

let nextIngredient=0;
export const addIngredient=(id,name) => {
  return {
    type: 'ADD_INGREDIENT',
    name,
    recipie_id: id,
    ingredient_id: nextIngredient++
  }
}

export const toggleIngredients=(id) => {
  return {
    type: 'TOGGLE_INGREDIENT',
    recipie_id: id,
  }
}
