import React from 'react';
import ReactDOM from 'react-dom';
import test from 'tape';

import TestUtils from 'react-addons-test-utils';
import {
  findRenderedDOMComponentWithClass as findByClass,
  findRenderedDOMComponentWithTag as findByTag,
  scryRenderedDOMComponentsWithTag as scryByTag,
  scryRenderedDOMComponentsWithClass as scryByClass
} from 'react-addons-test-utils';
import jsdom from 'jsdom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import recipies from '../../src/scripts/reducers/RecipieReducers';
import Recipie from '../../src/scripts/components/Recipie';
import RecipieBox from '../../src/scripts/components/RecipieBox';

//there is no docucment/browser/window
//so, warm it up with jsdom empty document
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

test("IT - Ingredients - add ingredient button should display text input", (t) => {
    t.plan(4);
    //create a redux store
    let store = createStore(recipies);
    //create root app
    const component = TestUtils.renderIntoDocument(
        <Provider store={store}><RecipieBox/></Provider>
    );
    //add a recipie
    component.props.store.dispatch({type: 'ADD_RECIPIE', id: 900, name: 'recipie'});
    let recipie = findByTag(component, "h2");
    TestUtils.Simulate.click(recipie); //click on the reccicpie header
    let actual = scryByTag(component, "h3").length;
    let expected = 1;
    let message = "One 'ingredient' header should be present";
    t.equal(actual, expected, message); //check if the recipie is expanded

    actual = scryByClass(component, "c-ingredient__add");
    message = "Ingredient header should have add button";
    expected = 1;
    t.equal(actual.length, expected, message);

    let textBox = findByClass(component, "c-ingredient__add--editable");
    expected = "salt";
    textBox.value = expected;
    TestUtils.Simulate.change(textBox);
    const form = findByClass(component, "c-ingredient__new__form");
    TestUtils.Simulate.submit(form); //add an ingredient
    let state = component.props.store.getState();
    actual = state[0].ingredients.length;
    expected = 1;
    message = "Add button should inlude ingredient to the recipie"
    //check if the ingredient is added to the state
    t.equal(actual, expected, message);

    actual = scryByClass(component, "c-ingredient__item").length;
    message = "There should be one list item for each ingredient";
    //check if the ingredient is added to the dom
    t.equal(actual, expected, message);
});
