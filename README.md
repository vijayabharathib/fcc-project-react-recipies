# Recipie Box project in react

[![Build Status](https://travis-ci.org/vijayabharathib/fcc-project-react-recipies.svg?branch=master)][travis] [![Coverage Status](https://coveralls.io/repos/github/vijayabharathib/fcc-project-react-recipies/badge.svg?branch=master)][coveralls]

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

## Development

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

```
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

`extend-tape` and `tape-jsx-equals`  were not used. They are still part of the development dependencies as there are usecases for them in the test when they are refactored.

`babel-cli`, `babel-preset-es2015` and `babel-preset-react` are part of the create-react-app(???).

`tape --require ignore-styles` will enable that the css import statements within component files are ignored during test.

Piping the tape test output through `faucet` makes it neat and colorful.

Run `npm test` on a terminal and nice and colorful test results should be ready.

```
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

---
## More details around these later
```
## Watch JS & test files and run tests on change

## Continuous integration using [Travis-CI][travis]

## Coverage info via [Coveralls][coveralls]
```
## References
A free 30-video tutorial on egghead.io by the creator of redux himself: [Getting Started With Redux][redux-getting-started]. I have watched it several times while refactoring. Nearly half of the story is on how to build redux itself giving a sense of the underlying engine. Need to watch till the end to see the full power of the library.


[back-reference-section]: http://just-for-named-references
[travis]: https://travis-ci.org/vijayabharathib/fcc-project-react-recipies
[coveralls]: https://coveralls.io/github/vijayabharathib/fcc-project-react-recipies?branch=master
[redux-getting-started]: https://egghead.io/courses/getting-started-with-redux
