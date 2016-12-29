import test from 'tape';
import recipies from '../../src/scripts/reducers/RecipieReducers';
import {addRecipie} from '../../src/scripts/actions/ActionCreators';

test("reducers should add name to state",(assert)=>{
  assert.plan(1);
  const expected="test object";
  const action1=addRecipie("test object");
  const recipie1=recipies([],action1);
  const actual=recipie1[0].name;
  const message="ADD_RECIPIE should add a new entry with provided name";
  assert.deepEqual(expected,actual,message);
  assert.end();
});

test("reducers should return same state for unrecognized action",(assert)=>{
  assert.plan(1);
  const expected=recipies([],addRecipie("test object"));
  const actual=recipies(expected,{type:'UNKNOWN_ACTION'});
  const message="reducers should return same state for unrecognized action";
  assert.deepEqual(expected,actual,message);
  assert.end();
});
