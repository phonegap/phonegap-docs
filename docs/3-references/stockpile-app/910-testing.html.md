---
title: Lesson 10 - Testing
url: references/stockpile-app/910-testing
layout: subpage
---

The Stockpile app comes bundled with a few different libraries that can be used together for automated tests and reporting.

## Running tests

To run unit tests & e2e tests: `npm test`.

## Karma tests (unit tests)

Unit tests are used to test small pieces of functionality with an application, functions are often tested by providing inputs and then verifying that the outputs are the expected values.

Check out Vue's [unit testing documentation](https://vuejs.org/v2/guide/unit-testing.html) to learn more about unit testing Vue with Karma.

To run the unit tests only: `npm run unit`.

## Nightwatch tests (E2E / integration tests)

E2E (End to End or Integration) tests are used to test UI interactions & workflows in application, for example, if a button is pressed does the UI respond in the expected manner.

We're using [Nightwatch.js](http://nightwatchjs.org/) for our E2E tests.

To run the E2E tests only: `npm run e2e`.

## Sinon.js (mocks / stubs / spies)

Mocks, stubs & spies are useful tools that can be used with unit tests.

[Mocks](http://sinonjs.org/releases/v4.1.1/mocks/) are used to in tests to validate expected outputs. For example, if you have a this method:

```
function add(x,y) {
  return x + y;
}
```

If you mocked `x=1` and `y=2`, you would expect the `add` method to return `3`.

[Stubs](http://sinonjs.org/releases/v4.1.1/stubs/) are used to test a method's behavior by simulating data to cause the method to behave in a certain manner. For example, you could simulate a situation that would cause the method to result in an error; this would be useful to test if your error handling is working as expected.

[Spies](http://sinonjs.org/releases/v4.1.1/spies/) are used to test a method by watching to see if the method behaves as expected.

## LCov code coverage

LCov provides a report that displays how much of the code in your application has been tested by the automated tests.
