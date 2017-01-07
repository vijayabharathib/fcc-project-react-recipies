import React, {PropTypes} from 'react';
import Recipie from './Recipie';
import {connect} from 'react-redux';
import {deleteRecipie, editRecipie} from '../actions/ActionCreators';
import '../../styles/css/RecipieList.css';

let RecipieList =({recipies,transmit})=> {
    let recipieList=recipies.map(function(recipie){
      let onDeleteClick = () =>transmit.onDelete(recipie.id);
      let onEditClick = () => transmit.onEdit(recipie.id);
      let recipieObject=Object.assign({},recipie,{
        onDeleteClick,
        onEditClick
      });
      return (
        <Recipie key={recipie.id} recipie={recipieObject} />
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
  ).isRequired,
  transmit: PropTypes.shape({
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps= (state) => {
  return {
    recipies: state
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    transmit: {
      onDelete: (id) => {
        dispatch(deleteRecipie(id));
      },
      onEdit: (id) => {
        dispatch(editRecipie(id));
      }
    }
  }
}

RecipieList=connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipieList);

export default RecipieList;
