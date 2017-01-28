import React, {PropTypes} from 'react';
import Recipie from './Recipie';
import {connect} from 'react-redux';
import {deleteRecipie, editRecipie, toggleIngredients} from '../actions/ActionCreators';
import '../../styles/css/RecipieList.css';

let RecipieList =({recipies,dispatch})=> {
    let recipieList=recipies.map(function(recipie){
      return (
        <Recipie key={recipie.id} recipie={recipie} />
      )
    });

    return(
      <ul className="o-recipie__list">
        {recipieList}
      </ul>
    )

}

RecipieList.propTypes = {
  recipies: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        collapsed: PropTypes.bool.isRequired,
        editable: PropTypes.bool.isRequired
      }
    ).isRequired
  ).isRequired
}

const mapStateToProps= (state) => {
  return {
    recipies: state
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    dispatch: dispatch
  }
}

RecipieList=connect(mapStateToProps,mapDispatchToProps)(RecipieList);

export default RecipieList;
