# Recipie Box project in react

[![Build Status](https://travis-ci.org/vijayabharathib/fcc-project-react-recipies.svg?branch=master)][link-travis] [![Coverage Status][badge-svg-coveralls]][link-coveralls]

The project is hosted on github pages: https://vijayabharathib.github.io/fcc-project-react-recipies/

This project is part of the free code camp 'data visualization certificate'. Uses the following development workflow

- [x] Use react for view (create-react-app)
- [x] Use redux for state management
- [x] Local storage for rehydrating state
- [x] Use sass for styling
- [x] Use tape, react-test-utils, jsdom for testing
- [x] automatic Unit and integration tests in dev (npm-watch)
- [x] watch and process sass (npm-watch)
- [x] Travis-CI for integration and deployment to github pages
- [x] Coveralls for test coverage
- [x] Separation of concerns (Container and Presentational components)

```
Disclaimer: Here is a documentation of the workflow as I learn to get comfortable with react development. May not be the industry best practice. If there is a better way, file an issue in this repo.
```

## Development

#### Project Structure
```
root
  --> public
  --> src
      --> images
      --> scripts
          --> actions
          --> reducers
          --> components
      --> styles
          --> scss
          --> css
  --> test
      --> integration
      --> unit

```
#### Commandline scripts
Workflow | Command
-------|--------
Install node dependencies | `npm install`
Start the dev server | `npm start`
Start watch on tests and sass files | `npm run watch -s`
Get a report on test and coverage | `npm run report`
Deploy to gh-pages | `npm run deploy`

## Create-React-App
The create-react-app npm package serves as a springboard to get started. Find the package in github @ https://github.com/facebookincubator/create-react-app.

## Get SASS working with create-react-app

Create-react-app by default does not support sass pre-processor. There are several threads and issues asking for this support. But it seems the decision not to support any pre-processor is due to the number of pre-processors out there.

However, create-react-app is a Node.Js project. It is not too difficult to setup the pre-processor running in the background. This processor can compile sass files to css, which in turn is picked up by the dev-server.

Here is the workflow:

1. setup npm-watch to monitor the sass folder
2. setup npm script using node-sass to process sass to css
3. pass npm-import as --importer flag the npm script on step 2


Here is the package.json that will handle the workflow. The key within the watch section must match the npm script that has to be run if there is a trigger (due to file changes).
```
package.json
```
```json
{
  "devDependencies": {
    "node-sass": "^4.1.1",
    "node-sass-import": "^1.1.1",
    "npm-watch": "^0.1.7",
  },
  "watch": {
    "style": {
      "patterns": [
        "src"
      ],
      "extensions": "scss",
      "quiet": true
    }
  },
  "scripts": {
    "style": "node-sass -r src/styles/scss -o src/styles/css --importer node_modules/node-sass-import",
    "watch": "npm-watch"
  }
}

```
`npm start` in a terminal and `npm run watch -s` in another gives the necessary workflow. It would have been nice to just use `npm start` for the whole workflow, but you might have to `eject` out of default create-react-app package. That would unpack several files.

It is also possible to set up an npm script using `concurrently` npm package to run both of them in a single script. But the output from `concurrently` is kind of clumsy with both js compilation messages and sass compilations. Imagine another watch for tests sending results to the same terminal window. That's a lot of output text to make sense from.

---

## Test create-react-app with TAPE and JSDOM

#### ES6
`babel-cli`, `babel-preset-es2015` and `babel-preset-react` allow us to use ES5 syntax in our tests. `.babelrc` file at the root of the project has the following presets defined:
```json
{
  "presets": ["es2015","react"]
}
```
This allows the npm script to use babel-node to initiate the tape tests from.

#### TAPE
`tape --require ignore-styles` will enable that the css import statements within component files are ignored during test.

Piping the tape test output through `faucet` makes it neat and colorful.

Run `npm test` on a terminal and nice and colorful test results should be ready.

Here is the portion of package.json that lists the necessary packages and scripts.
```json
{
  "devDependencies": {
    "babel-cli": "^6.18.0",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "faucet": "0.0.1",
    "ignore-styles": "^5.0.1",
    "react-addons-test-utils": "^15.4.1",
    "tape": "^4.6.3"
  },
  "scripts": {
    "test": "babel-node node_modules/.bin/tape --require ignore-styles test/**/*.test.js | faucet"
  }
}

```
But what's with that node_modules/.bin/tape? Well, `npm run <command>` will add `node_modules/bin/tape` to the path. However, `babel-node` jumps on that advantage, while tape had to speak its absolute path.

After all that configuration, this test must be running and resulting from `npm test`

```javascript
import test from 'tape';
import reducer from '../../src/scripts/reducers/IndexReducers';
import { addRecipie }from '../../src/scripts/actions/ActionCreators';
test("UnitTest- reducers - recipie should be non-editable by default",(t)=>{
  t.plan(1);
  const recipie1=reducer([],addRecipie("test object"));
  const actual=recipie1[0].editable;
  const expected=false;
  const message="new entry should be non-editable";
  t.equal(actual,expected,message);
});
```
#### Refactor
`extend-tape` and `tape-jsx-equals`  were not used, but still part of the development dependencies in the project's package.json. They are retained as it is possible to refactor the tests using these packages.

For example, some of the tests cannot use deepEqual to compare state as the id is dynamically generated using `uuid`. However, extend-tape can be used to re-wire deepEqual to ignore just the ID and compare rest of the state.

---
## Watch for change & run tests
Setions on Setting up testing and Watching for sass style files already brought in many of the packages required for this job. So, it's going to be easier.

The `watch` section already had provision for `style` script. Adding a watch for `test` script can be done by including a single line: `"test": "{src,test}/**/*.js"`

That just says, run `npm test` when files with .js extension are changed within src or test folders (and their sub-folders).

```
package.json
```
```json
{
  "watch": {
    "test": "{src,test}/**/*.js",
    "style": {
      "patterns": [
        "src"
      ],
      "extensions": "scss",
      "quiet": true
    }
  }
}
```
---
## Code Coverage Report (nyc)
All we need is an extra [nyc][link-nyc] package in the existing configuration to get this nice code coverage information.
    "report": "nyc npm run local-test && nyc report --reporter=lcov",
![react nyc coverage report][image-nyc-coverage]

---

## Badge of honor on coveralls
You can get nice badge on the repository via coveralls [![Coverage Status][badge-svg-coveralls]][link-coveralls]
![coveralls code coverage by file][image-coverall-by-file]

![coveralls-by-commits](https://cloud.githubusercontent.com/assets/15519267/22578155/9d43605a-e9ec-11e6-8d57-3b10d77e082a.png)

---

## Continuous integration using [Travis-CI][link-travis]

![travis ci build status][image-travis-build]

---

## More details around these later
```


## concurrently

```
## References
A free 30-video tutorial on egghead.io by the creator of redux himself: [Getting Started With Redux][redux-getting-started]. I have watched it several times while refactoring. Nearly half of the story is on how to build redux itself giving a sense of the underlying engine. Need to watch till the end to see the full power of the library.


[back-reference-section]: http://just-for-named-references
[link-travis]: https://travis-ci.org/vijayabharathib/fcc-project-react-recipies
[link-coveralls]: https://coveralls.io/github/vijayabharathib/fcc-project-react-recipies?branch=master
[link-nyc]:
[redux-getting-started]: https://egghead.io/courses/getting-started-with-redux
[image-nyc-coverage]:https://cloud.githubusercontent.com/assets/15519267/22577800/41056d44-e9ea-11e6-8a80-1a0ac316a4f9.png
[image-coverall-by-file]:https://cloud.githubusercontent.com/assets/15519267/22578088/0dd1a756-e9ec-11e6-88ab-b95021038b2f.png
[coveralls-by-commits]:https://cloud.githubusercontent.com/assets/15519267/22578155/9d43605a-e9ec-11e6-8d57-3b10d77e082a.png
[image-travis-build]:https://cloud.githubusercontent.com/assets/15519267/22578352/23264c18-e9ee-11e6-8619-45c7092e3691.png

[badge-svg-coveralls]:https://coveralls.io/repos/github/vijayabharathib/fcc-project-react-recipies/badge.svg?branch=master
[badge-svg-travis]:https://travis-ci.org/vijayabharathib/fcc-project-react-recipies.svg?branch=master
