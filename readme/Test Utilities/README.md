# Test Utilities

**Importing**

```
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // ES5 with npm
```

## Overview

`ReactTestUtils`  makes it easy to test React components in the testing framework of your choice. At Facebook we use  [Jest](https://facebook.github.io/jest/)  for painless JavaScript testing. Learn how to get started with Jest through the Jest website’s  [React Tutorial](https://jestjs.io/docs/tutorial-react).

> Note:
> 
> We recommend using  [React Testing Library](https://testing-library.com/react)  which is designed to enable and encourage writing tests that use your components as the end users do.
> 
> Alternatively, Airbnb has released a testing utility called  [Enzyme](https://airbnb.io/enzyme/), which makes it easy to assert, manipulate, and traverse your React Components’ output.

-   [`act()`](https://reactjs.org/docs/test-utils.html#act)
-   [`mockComponent()`](https://reactjs.org/docs/test-utils.html#mockcomponent)
-   [`isElement()`](https://reactjs.org/docs/test-utils.html#iselement)
-   [`isElementOfType()`](https://reactjs.org/docs/test-utils.html#iselementoftype)
-   [`isDOMComponent()`](https://reactjs.org/docs/test-utils.html#isdomcomponent)
-   [`isCompositeComponent()`](https://reactjs.org/docs/test-utils.html#iscompositecomponent)
-   [`isCompositeComponentWithType()`](https://reactjs.org/docs/test-utils.html#iscompositecomponentwithtype)
-   [`findAllInRenderedTree()`](https://reactjs.org/docs/test-utils.html#findallinrenderedtree)
-   [`scryRenderedDOMComponentsWithClass()`](https://reactjs.org/docs/test-utils.html#scryrendereddomcomponentswithclass)
-   [`findRenderedDOMComponentWithClass()`](https://reactjs.org/docs/test-utils.html#findrendereddomcomponentwithclass)
-   [`scryRenderedDOMComponentsWithTag()`](https://reactjs.org/docs/test-utils.html#scryrendereddomcomponentswithtag)
-   [`findRenderedDOMComponentWithTag()`](https://reactjs.org/docs/test-utils.html#findrendereddomcomponentwithtag)
-   [`scryRenderedComponentsWithType()`](https://reactjs.org/docs/test-utils.html#scryrenderedcomponentswithtype)
-   [`findRenderedComponentWithType()`](https://reactjs.org/docs/test-utils.html#findrenderedcomponentwithtype)
-   [`renderIntoDocument()`](https://reactjs.org/docs/test-utils.html#renderintodocument)
-   [`Simulate`](https://reactjs.org/docs/test-utils.html#simulate)



## Reference

### [](https://reactjs.org/docs/test-utils.html#act)`act()`

To prepare a component for assertions, wrap the code rendering it and performing updates inside an  `act()`  call. This makes your test run closer to how React works in the browser.

> Note
> 
> If you use  `react-test-renderer`, it also provides an  `act`  export that behaves the same way.

For example, let’s say we have this  `Counter`  component:


```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  handleClick() {
    this.setState(state => ({
      count: state.count + 1,
    }));
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>
          Click me
        </button>
      </div>
    );
  }
}
```

Here is how we can test it:

```
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');

  // Test second render and componentDidUpdate
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('You clicked 1 times');
  expect(document.title).toBe('You clicked 1 times');
});
```

-   Don’t forget that dispatching DOM events only works when the DOM container is added to the  `document`. You can use a library like  [React Testing Library](https://testing-library.com/react)  to reduce the boilerplate code.
    
-   The  [`recipes`](https://reactjs.org/docs/testing-recipes.html)  document contains more details on how  `act()`  behaves, with examples and usage.
