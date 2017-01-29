import test from 'tape';
import reducer from '../../src/scripts/reducers/IndexReducers';
import {
  addRecipie,
  deleteRecipie,
  editRecipie,
  updateRecipie,
  addIngredient,
  toggleIngredients,
  deleteIngredient,
  updateIngredient,
  flushStore,
  editIngredient
} from '../../src/scripts/actions/ActionCreators';
test("UT - reducers - should add name to state",(t)=>{
  t.plan(1);
  const expected="test object";
  const action1=addRecipie("test object");
  const recipie1=reducer([],action1);
  const actual=recipie1[0].name;
  const message="ADD_RECIPIE should add a new entry with provided name";
  t.deepEqual(actual,expected,message);
});

test("UT - reducers - should return editable as false by default",(t)=>{
  t.plan(1);
  const action1=addRecipie("test object");
  const recipie1=reducer([],action1);
  const actual=recipie1[0].editable;
  const expected=false;
  const message="ADD_RECIPIE should add a new entry with editable as false";
  t.deepEqual(actual,expected,message);
});

test("UT - reducers - should return same state for unrecognized action",(t)=>{
  t.plan(1);
  const expected=reducer([],addRecipie("test object"));
  const actual=reducer(expected,{type:'UNKNOWN_ACTION'});
  const message="reducers should return same state for unrecognized action";
  t.deepEqual(actual,expected,message);
  t.end();
});

test("UT - reducers - should remove recipie from state based on id",(t)=>{
  t.plan(1);
  const action1=addRecipie("test object");
  const previousState=reducer([],action1);
  const action2=addRecipie("test object2");
  const nextState=reducer(previousState,action2);

  const deleteAction=deleteRecipie(action2.id);
  const newState=reducer(nextState,deleteAction);
  const message="DELETE_RECIPIE should remove entry by ID";
  t.deepEqual(newState,previousState,message);
  t.end();
});

test("UT - reducers - should return editable state for recipie based on id",(t)=>{
  t.plan(1);
  let state=[];
  for(let i=0;i<3;i++){
    state=reducer(state,addRecipie("test recipie"+i));
  }
  const editAction=editRecipie(state[1].id);
  const newState=reducer(state,editAction);
  const message="Edit_RECIPIE should return editable recipie in the state based on ID";
  t.equal(newState[1].editable,true,message);
  // TODO: editable state should be returned and used in the above tion +test
  t.end();
});

test("UT - reducers - should return updated recipie in state based on id",(t)=>{
  t.plan(1);
  let state=[{
    id: 1,
    name: "old name",
    collapsed: true,
    editable: true
  }];
  let expected=[{
    id: 1,
    name: "new name",
    collapsed: true,
    editable: false //editable should be false after update
  }]
  const updateAction=updateRecipie(state[0].id,"new name");
  const newState=reducer(state,updateAction);
  const message="UPDATE_RECIPIE should return updated recipie name in the state based on ID";
  t.deepEqual(newState,expected,message);
  t.end();
});

test("UT - reducers - should return recipie with ingredient",(t)=>{
  t.plan(2);
  flushStore();
  let expected=[{
    id: 0,
    name: "burger",
    ingredients: [{id: 0,name: "salt",editable: false}],
    collapsed: true,
    editable: false //editable should be false after update
  }];
  let state=reducer([],addRecipie("burger"));
  let addIngredientAction=addIngredient(state[0].id,"salt");
  state=reducer(state,addIngredientAction);
  let message="ADD_INGREDIENT should return updated recipie with ingredient";
  t.deepEqual(state,expected,message);
  expected=[{
    id: 0,
    name: "burger",
    ingredients: [{id: 0,name: "salt",editable: false},{id: 1,name: "water",editable: false}],
    collapsed: true,
    editable: false //editable should be false after update
  }];

  addIngredientAction=addIngredient(state[0].id,"water");
  state=reducer(state,addIngredientAction);
  message="ADD_INGREDIENT should return updated recipie with two ingredients";
  t.deepEqual(state,expected,message);
});

test("UT - reducers - should add ingredient to right recipie",(t)=>{
  t.plan(1);
  let state=reducer([],addRecipie("recipie1"));
  state=reducer(state,addRecipie("recipie2"));
  state=reducer(state,addRecipie("recipie3"));
  let expected="water";
  let addIngredientAction=addIngredient(state[1].id,expected);
  let newState=reducer(state,addIngredientAction);
  let message="ADD_INGREDIENT should add ingredient to right recipie";
  t.equal(newState[1].ingredients[0].name,expected,message);
});


test("UT - reducers - should toggle ingredient to the right recipie",(t)=>{
  t.plan(1);
  let state=reducer([],addRecipie("recipie1"));
  state=reducer(state,addRecipie("recipie2"));
  state=reducer(state,addRecipie("recipie3"));
  let expected=!state[1].collapsed; //
  let action=toggleIngredients(state[1].id);
  let newState=reducer(state,action);
  let message="TOGGLE_INGREDIENT should switch flag";
  t.equal(newState[1].collapsed,expected,message);
});

test("UT - reducers - should delete ingredient from recipie",(t)=>{
  t.plan(1);
  let state=reducer([],addRecipie("recipie1"));
  state=reducer(state,addRecipie("recipie2"));
  state=reducer(state,addRecipie("recipie3"));
  state=reducer(state,addIngredient(state[1].id,"water"));
  let beforeDelete=state[1].ingredients.length;
  state=reducer(state,deleteIngredient(state[1].id,state[1].ingredients[0].id));
  let afterDelete=state[1].ingredients.length;
  let message="DELETE_INGREDIENT should remove ingredient from recipie";
  t.equal(afterDelete,beforeDelete-1,message);
});

test("UT - reducers - should make ingredient editable",(t)=>{
  t.plan(1);
  let state=reducer([],addRecipie("recipie1"));
  state=reducer(state,addRecipie("recipie2"));
  state=reducer(state,addRecipie("recipie3"));
  state=reducer(state,addIngredient(state[1].id,"water"));
  let initialEditableState=state[1].ingredients[0].editable;
  state=reducer(state,editIngredient(state[1].id,state[1].ingredients[0].id));
  let newEditableState=state[1].ingredients[0].editable;
  let message="EDIT_INGREDIENT should make ingredient editable";
  t.equal(initialEditableState,!newEditableState,message);
});

test("UT - reducers - should update ingredient ",(t)=>{
  t.plan(2);
  let state=reducer([],addRecipie("recipie1"));
  state=reducer(state,addRecipie("recipie2"));
  state=reducer(state,addRecipie("recipie3"));
  state=reducer(state,addIngredient(state[1].id,"water"));
  let initialName=state[1].ingredients[0].name;
  let expected="salt";
  state=reducer(state,editIngredient(state[1].id,state[1].ingredients[0].id));
  state=reducer(state,updateIngredient(state[1].id,state[1].ingredients[0].id,expected));
  let actual=state[1].ingredients[0].name;
  let message="UPDATE_INGREDIENT should rename ingredient";
  t.equal(actual,expected,message);
  expected=false;
  actual=state[1].ingredients[0].editable;
  message="UPDATE_INGREDIENT should result in non-editable ingredient";
  t.equal(actual,expected,message);

});
