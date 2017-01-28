import React from 'react';
import Recipie from './Recipie';
import {connect} from 'react-redux';
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

const mapStateToProps= (state) => {
  return {
    recipies: state
  }
}

RecipieList=connect(mapStateToProps)(RecipieList);

export default RecipieList;
