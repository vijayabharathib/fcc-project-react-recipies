import React, {PropTypes} from 'react';
import Recipie from './Recipie';
import {connect} from 'react-redux';
import {deleteRecipie} from '../actions/ActionCreators';

let RecipieList =({recipies,onDelete})=> {
    let deleteItem=onDelete;
    let recipieList=recipies.map(function(recipie){
      return (
        <Recipie key={recipie.id} {...recipie} onDelete={()=>deleteItem(recipie.id)}/>
      )
    });

    return(
      <ul>
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
        collapsed: PropTypes.bool.isRequired
      }
    ).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired
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
