import test from 'tape';
import recipies from '../../src/scripts/reducers/RecipieReducers';
import {addRecipie, deleteRecipie, editRecipie} from '../../src/scripts/actions/ActionCreators';
test ("UT - action creators - addRecipie should auto increment ID",(assert)=>{
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

test ("UT - action creators - addRecipie should return ADD_RECIPIE",(assert)=>{
    assert.plan(1);
    let expected='ADD_RECIPIE';
    const actual = addRecipie("test recipie").type;
    let message="addRecipie should return ADD_RECIPIE type";
    assert.equal(actual,expected,message);
    assert.end();
});
test ("UT - action creators - deleteRecipie should remove recipie by ID",(assert)=>{
    assert.plan(1);
    const expected=0;
    const actual=deleteRecipie(expected);
    const message="deleteRecipie should return action with id";
    assert.equal(actual.id,expected,message);
    assert.end();
});

test ("UT - action creators - deleteRecipie should return DELETE_RECIPIE",(assert)=>{
    assert.plan(1);
    let expected='DELETE_RECIPIE';
    const actual = deleteRecipie("test recipie").type;
    let message="deleteRecipie should return DELETE_RECIPIE type";
    assert.equal(actual,expected,message);
    assert.end();
});

test ("UT - action creators - editRecipie should return EDIT_RECIPIE",(assert)=>{
    assert.plan(1);
    let expected='EDIT_RECIPIE';
    const actual = editRecipie(1000).type;
    let message="editRecipie should return EDIT_RECIPIE type";
    assert.equal(actual,expected,message);
    assert.end();
});

test ("UT - action creators - editRecipie should return action with ID",(assert)=>{
    assert.plan(1);
    let expected=1000;
    const actual = editRecipie(expected).id;
    let message="editRecipie should return action with ID";
    assert.equal(actual,expected,message);
    assert.end();
});
