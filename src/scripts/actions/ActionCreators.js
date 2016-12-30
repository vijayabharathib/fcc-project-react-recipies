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
