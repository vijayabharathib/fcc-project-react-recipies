import test from 'tape';
import recipies from '../../src/scripts/reducers/RecipieReducers';
import {
  addRecipie,
  deleteRecipie,
  editRecipie,
  updateRecipie,
  addIngredient,
  toggleIngredients,
  deleteIngredient,
  editIngredient,
  updateIngredient,
  flushStore} from '../../src/scripts/actions/ActionCreators';
test ("UT - action creators - addRecipie should auto increment ID",(t)=>{
    t.plan(2);
    let prevID=addRecipie("recipie1").id; // 0 is first id
    let nextID=addRecipie("recipie2").id; //1 is next id
    let message="Add recipie should start with ID 0 and increment by 1";
    t.equal(nextID,prevID+1,message);
    prevID=nextID;
    nextID=addRecipie("recipie3").id //should be 2;
    message="addRecipie should increment id from 1 to 2";
    t.equal(nextID,prevID+1,message);
    t.end();
});

test ("UT - action creators - addRecipie should return ADD_RECIPIE",(t)=>{
    t.plan(1);
    let expected='ADD_RECIPIE';
    const actual = addRecipie("test recipie").type;
    let message="addRecipie should return ADD_RECIPIE type";
    t.equal(actual,expected,message);
    t.end();
});
test ("UT - action creators - deleteRecipie should remove recipie by ID",(t)=>{
    t.plan(1);
    const expected=0;
    const actual=deleteRecipie(expected);
    const message="deleteRecipie should return action with id";
    t.equal(actual.id,expected,message);
    t.end();
});

test ("UT - action creators - deleteRecipie should return DELETE_RECIPIE",(t)=>{
    t.plan(1);
    let expected='DELETE_RECIPIE';
    const actual = deleteRecipie("test recipie").type;
    let message="deleteRecipie should return DELETE_RECIPIE type";
    t.equal(actual,expected,message);
    t.end();
});

test ("UT - action creators - editRecipie should return EDIT_RECIPIE",(t)=>{
    t.plan(1);
    let expected='EDIT_RECIPIE';
    const actual = editRecipie(1000).type;
    let message="editRecipie should return EDIT_RECIPIE type";
    t.equal(actual,expected,message);
    t.end();
});

test ("UT - action creators - editRecipie should return action with ID",(t)=>{
    t.plan(1);
    let expected=1000;
    const actual = editRecipie(expected).id;
    let message="editRecipie should return action with ID";
    t.equal(actual,expected,message);
    t.end();
});

test ("UT - action creators - updateRecipie should return action with ID and value",(t)=>{
    t.plan(1);
    let id=777;
    let name="new text";
    let expected={
      id,
      name,
      type: 'UPDATE_RECIPIE'
    }
    const actual = updateRecipie(id,name);
    let message="updateRecipie should return action with ID, UPDATE_RECIPIE type and new value";
    t.deepEqual(actual,expected,message);
});

test ("UT - action creators - addIngredient",(t)=>{
    t.plan(1);
    let r_id=777;
    let name="new ingredient";
    let expected={
      recipie_id: r_id,
      name,
      ingredient_id: 0,
      type: 'ADD_INGREDIENT'
    }
    flushStore();
    const actual = addIngredient(r_id,name);
    let message="addIngredient should return action with ID, ADD_INGREDIENT type";
    t.deepEqual(actual,expected,message);
});

test ("UT - action creators - toggleIngredient",(t)=>{
    t.plan(1);
    let r_id=777;
    let expected={
      recipie_id: r_id,
      type: 'TOGGLE_INGREDIENT'
    }
    const actual = toggleIngredients(r_id);
    let message="toggleIngredient should return action with ID, TOGGLE_INGREDIENT type";
    t.deepEqual(actual,expected,message);
});

test ("UT - action creators - delete ingredient",(t)=>{
    t.plan(1);
    let r_id=777;
    let i_id=888;
    let expected={
      recipie_id: r_id,
      ingredient_id: i_id,
      type: 'DELETE_INGREDIENT'
    }
    const actual = deleteIngredient(r_id,i_id);
    let message="deleteIngredient should return action with ID, DELETE_INGREDIENT type";
    t.deepEqual(actual,expected,message);
});

test ("UT - action creators - editable ingredient",(t)=>{
    t.plan(1);
    let r_id=777;
    let i_id=888;
    let expected={
      recipie_id: r_id,
      ingredient_id: i_id,
      type: 'EDIT_INGREDIENT'
    }
    const actual = editIngredient(r_id,i_id);
    let message="editIngredient should return action with ID, EDIT_INGREDIENT type";
    t.deepEqual(actual,expected,message);
});

test ("UT - action creators - update ingredient",(t)=>{
    t.plan(1);
    let r_id=777;
    let i_id=888;
    let expected={
      recipie_id: r_id,
      ingredient_id: i_id,
      type: 'UPDATE_INGREDIENT',
      name: 'honey'
    }
    const actual = updateIngredient(r_id,i_id,'honey');
    let message="updateIngredient should return action with ID, UPDATE_INGREDIENT type";
    t.deepEqual(actual,expected,message);
});
