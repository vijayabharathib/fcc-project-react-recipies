import React from 'react';

let AddIngredient =(props)=> {
    let input;
    const add=(e)=>{
      e.preventDefault();
      if(input.value.trim()){
        props.onAddIngredient(input.value);
        input.value="";
      }
    }

    return(
      <div className="c-add__ingredient">
        <form className="c-ingredient__new__form" onSubmit={add}>
          <input
            type="text"
            className="c-ingredient__add--editable"
            ref={(node) => {input=node}}>
          </input>
          <button className="c-ingredient__add" type="submit">+</button>
        </form>
      </div>
    )

}


export default AddIngredient;
