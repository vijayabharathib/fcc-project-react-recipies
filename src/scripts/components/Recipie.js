import React from 'react';

let Recipie = ({recipie}) => {
    function recipieHeader(name,editable){
      console.log("in header");
      let header=<h4 className="c-recipie__name">{name}</h4>;
      if(editable){
        console.log("inside");
        header=<input type="text" value="{name}"></input>;
      }
      console.log("returning header...")
      return header;
    }
    return(
      <li className="c-recipie">
        {recipieHeader(recipie.name,recipie.editable)}
        <button className="c-recipie__delete" onClick={recipie.onDeleteClick}>x</button>
        <button className="c-recipie__edit" onClick={recipie.onEditClick}>Edit</button>
      </li>
    )
}

export default Recipie;
