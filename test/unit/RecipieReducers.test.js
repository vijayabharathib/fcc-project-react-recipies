import test from 'tape';
import recipies from '../../src/scripts/reducers/RecipieReducers';
import {addRecipie} from '../../src/scripts/actions/ActionCreators';
test ("action creators - addRecipie should auto increment ID",(assert)=>{
    assert.plan(2);
    let prevID=addRecipie("recipie1").id; // 0 is first id
    let nextID=addRecipie("recipie2").id; //1 is next id
    let message="Add recipie should start with ID 0 and increment by 1";
    assert.equal(nextID,prevID+1,message);
    prevID=nextID;
    nextID=addRecipie("recipie3").id //should be 2;
    message="addRecipie should increment id from 1 to 2";
    assert.equal(nextID,prevID+1,message);
    assert.end();
});

test ("action creators- addRecipie should return ADD_RECIPIE",(assert)=>{
    assert.plan(1);
    let expected='ADD_RECIPIE';
    const actual = addRecipie("test recipie").type;
    let message="addRecipie should return ADD_RECIPIE type";
    assert.equal(actual,expected,message);
    assert.end();
});

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
