import React from 'react';
import AddRecipie from './AddRecipie';
import RecipieList from './RecipieList';
const RecipieBox = () => {
  return(
    <div className="container">
      <AddRecipie />
      <RecipieList />
    </div>
  )
}

export default RecipieBox;
