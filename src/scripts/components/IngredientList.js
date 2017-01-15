import React, {PropTypes} from 'react';

let IngredientList =()=> {

    return(
      <section className="c-ingredient">
        <header className="c-ingredient__header">
          <h3 className="c-ingredient__title">Ingredients</h3>
          <form>
            <input type="text" className="c-ingredient__add--editable">
            </input>
            <button className="c-ingredient__add" type="submit">+</button>        
          </form>
        </header>
      </section>
    )

}



export default IngredientList;
