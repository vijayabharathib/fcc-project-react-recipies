import {v4} from 'node-uuid';

export const addRecipie=(name) => {
  return {
    type: 'ADD_RECIPIE',
    name,
    id: v4()
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

export const addIngredient=(id,name) => {
  return {
    type: 'ADD_INGREDIENT',
    name,
    recipie_id: id,
    ingredient_id: v4()
  }
}

export const toggleIngredients=(id) => {
  return {
    type: 'EXPAND_RECIPIE',
    recipie_id: id,
  }
}

export const deleteIngredient=(r_id,i_id) => {
  return {
    type: 'DELETE_INGREDIENT',
    recipie_id: r_id,
    ingredient_id: i_id
  }
}

export const editIngredient=(r_id,i_id) => {
  return {
    type: 'EDIT_INGREDIENT',
    recipie_id: r_id,
    ingredient_id: i_id
  }
}


export const updateIngredient=(r_id,i_id,name) => {
  return {
    type: 'UPDATE_INGREDIENT',
    recipie_id: r_id,
    ingredient_id: i_id,
    name
  }
}
