import test from 'tape';
import recipies from '../../src/scripts/reducers/RecipieReducers';
import {
  addRecipie,
  deleteRecipie,
  editRecipie,
  updateRecipie
} from '../../src/scripts/actions/ActionCreators';

test("UT - reducers - should add name to state",(assert)=>{
  assert.plan(1);
  const expected="test object";
  const action1=addRecipie("test object");
  const recipie1=recipies([],action1);
  const actual=recipie1[0].name;
  const message="ADD_RECIPIE should add a new entry with provided name";
  assert.deepEqual(actual,expected,message);
});

test("UT - reducers - should return editable as false by default",(assert)=>{
  assert.plan(1);
  const action1=addRecipie("test object");
  const recipie1=recipies([],action1);
  const actual=recipie1[0].editable;
  const expected=false;
  const message="ADD_RECIPIE should add a new entry with editable as false";
  assert.deepEqual(actual,expected,message);
});

test("UT - reducers - should return same state for unrecognized action",(assert)=>{
  assert.plan(1);
  const expected=recipies([],addRecipie("test object"));
  const actual=recipies(expected,{type:'UNKNOWN_ACTION'});
  const message="reducers should return same state for unrecognized action";
  assert.deepEqual(actual,expected,message);
  assert.end();
});

test("UT - reducers - should remove recipie from state based on id",(assert)=>{
  assert.plan(1);
  const action1=addRecipie("test object");
  const previousState=recipies([],action1);
  const action2=addRecipie("test object2");
  const nextState=recipies(previousState,action2);

  const deleteAction=deleteRecipie(action2.id);
  const newState=recipies(nextState,deleteAction);
  const message="DELETE_RECIPIE should remove entry by ID";
  assert.deepEqual(newState,previousState,message);
  assert.end();
});

test("UT - reducers - should return editable state for recipie based on id",(assert)=>{
  assert.plan(1);
  let state=[];
  for(let i=0;i<3;i++){
    state=recipies(state,addRecipie("test recipie"+i));
  }
  const editAction=editRecipie(state[1].id);
  const newState=recipies(state,editAction);
  const message="Edit_RECIPIE should return editable recipie in the state based on ID";
  assert.equal(newState[1].editable,true,message);
  // TODO: editable state should be returned and used in the above assertion +test
  assert.end();
});

test("UT - reducers - should return updated recipie in state based on id",(assert)=>{
  assert.plan(1);
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
  assert.deepEqual(newState,expected,message);
  assert.end();
});
