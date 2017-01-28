import React from 'react';
import {connect} from 'react-redux';
import EditableRecipie from './EditableRecipie';
import Recipie from './Recipie';
import IngredientList from './IngredientList';
import '../../styles/css/Recipie.css';

let RecipieContainer = ({recipie,dispatch}) => {
    let ingredientList;
    let recipieComponent;
    if(!recipie.collapsed){
      ingredientList=<IngredientList recipie={recipie}></IngredientList>;
    }
    if(recipie.editable){
      recipieComponent= (
        <EditableRecipie recipie={recipie}>
          {ingredientList}
        </EditableRecipie>
      );
    }else{
      recipieComponent= (
        <Recipie recipie={recipie}>
          {ingredientList}
        </Recipie>
      );
    }
    return <div>{recipieComponent}</div>;
}

RecipieContainer=connect()(RecipieContainer);

export default RecipieContainer;
