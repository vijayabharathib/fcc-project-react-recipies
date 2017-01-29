export const loadState = () => {
  try {
    let storedState=localStorage.getItem('RecipieState');
    if (storedState===null){
      return undefined;
    }
    return JSON.parse(storedState);
  } catch(error){
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    let serializedState = JSON.stringify(state);
    localStorage.setItem('RecipieState',serializedState);
  }catch(error){
    console.log(error);
  }
}
