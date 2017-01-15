import test from 'tape';
import recipies from '../../src/scripts/reducers/RecipieReducers';
import {
  addRecipie,
  deleteRecipie,
  editRecipie,
  updateRecipie,
  addIngredient,
  toggleIngredients
} from '../../src/scripts/actions/ActionCreators';

test("UT - reducers - should add name to state",(t)=>{
  t.plan(1);
  const expected="test object";
  const action1=addRecipie("test object");
  const recipie1=recipies([],action1);
  const actual=recipie1[0].name;
  const message="ADD_RECIPIE should add a new entry with provided name";
  t.deepEqual(actual,expected,message);
});

test("UT - reducers - should return editable as false by default",(t)=>{
  t.plan(1);
  const action1=addRecipie("test object");
  const recipie1=recipies([],action1);
  const actual=recipie1[0].editable;
  const expected=false;
  const message="ADD_RECIPIE should add a new entry with editable as false";
  t.deepEqual(actual,expected,message);
});

test("UT - reducers - should return same state for unrecognized action",(t)=>{
  t.plan(1);
  const expected=recipies([],addRecipie("test object"));
  const actual=recipies(expected,{type:'UNKNOWN_ACTION'});
  const message="reducers should return same state for unrecognized action";
  t.deepEqual(actual,expected,message);
  t.end();
});

test("UT - reducers - should remove recipie from state based on id",(t)=>{
  t.plan(1);
  const action1=addRecipie("test object");
  const previousState=recipies([],action1);
  const action2=addRecipie("test object2");
  const nextState=recipies(previousState,action2);

  const deleteAction=deleteRecipie(action2.id);
  const newState=recipies(nextState,deleteAction);
  const message="DELETE_RECIPIE should remove entry by ID";
  t.deepEqual(newState,previousState,message);
  t.end();
});

test("UT - reducers - should return editable state for recipie based on id",(t)=>{
  t.plan(1);
  let state=[];
  for(let i=0;i<3;i++){
    state=recipies(state,addRecipie("test recipie"+i));
  }
  const editAction=editRecipie(state[1].id);
  const newState=recipies(state,editAction);
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
  const newState=recipies(state,updateAction);
  const message="UPDATE_RECIPIE should return updated recipie name in the state based on ID";
  t.deepEqual(newState,expected,message);
  t.end();
});

test("UT - reducers - should return recipie with ingredient",(t)=>{
  t.plan(2);
  let state=[{
    id: 1,
    name: "recipie name",
    collapsed: true,
    editable: false,
    ingredients: []
  }];
  let expected=[{
    id: 1,
    name: "recipie name",
    ingredients: [{id: 2,name: "salt"}],
    collapsed: true,
    editable: false //editable should be false after update
  }];
  let addIngredientAction=addIngredient(state[0].id,"salt");
  let newState=recipies(state,addIngredientAction);
  let message="ADD_INGREDIENT should return updated recipie with ingredient";
  t.deepEqual(newState,expected,message);
  expected=[{
    id: 1,
    name: "recipie name",
    ingredients: [{id: 2,name: "salt"},{id: 3,name: "water"}],
    collapsed: true,
    editable: false //editable should be false after update
  }];

  addIngredientAction=addIngredient(state[0].id,"water");
  newState=recipies(state,addIngredientAction);
  message="ADD_INGREDIENT should return updated recipie with two ingredients";
  t.deepEqual(newState,expected,message);
});

test("UT - reducers - should add ingredient to right recipie",(t)=>{
  t.plan(1);
  let state=recipies([],addRecipie("recipie1"));
  state=recipies(state,addRecipie("recipie2"));
  state=recipies(state,addRecipie("recipie3"));
  let expected="water";
  let addIngredientAction=addIngredient(state[1].id,expected);
  let newState=recipies(state,addIngredientAction);
  let message="ADD_INGREDIENT should add ingredient to right recipie";
  t.equal(newState[1].ingredients[0].name,expected,message);
});


test("UT - reducers - should add ingredient to right recipie",(t)=>{
  t.plan(1);
  let state=recipies([],addRecipie("recipie1"));
  state=recipies(state,addRecipie("recipie2"));
  state=recipies(state,addRecipie("recipie3"));
  let expected=!state[1].collapsed; //
  let action=toggleIngredients(state[1].id);
  let newState=recipies(state,action);
  let message="TOGGLE_INGREDIENT should switch flag";
  t.equal(newState[1].collapsed,expected,message);
});
