import React from 'react';
import Recipie from './Recipie';
import {connect} from 'react-redux';
import {deleteRecipie} from '../actions/ActionCreators';

let RecipieList =({recipies,onDelete})=> {
    let deleteItem=onDelete;
    let recipieList=recipies.map(function(recipie){
      return (
        <Recipie key={recipie.id} name={recipie.name} delete={deleteItem.bind(null,recipie.key)}/>
      )
    });

    return(
      <ul>
        {recipieList}
      </ul>
    )

}

const mapStateToProps= (state) => {
  return {
    recipies: state
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    onDelete: (id) => {
      dispatch(deleteRecipie(id));
    }
  }
}

RecipieList=connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipieList);

export default RecipieList;
