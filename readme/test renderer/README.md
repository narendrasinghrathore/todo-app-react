# Test Renderer

**Importing**

```
import TestRenderer from 'react-test-renderer'; // ES6
const TestRenderer = require('react-test-renderer'); // ES5 with npm
```

## Overview

This package provides a React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.

Essentially, this package makes it easy to grab a snapshot of the platform view hierarchy (similar to a DOM tree) rendered by a React DOM or React Native component without using a browser or  [jsdom](https://github.com/tmpvar/jsdom).

Example:

```
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

You can use Jest’s snapshot testing feature to automatically save a copy of the JSON tree to a file and check in your tests that it hasn’t changed:  [Learn more about it](https://jestjs.io/docs/en/snapshot-testing).

You can also traverse the output to find specific nodes and make assertions about them.

```
import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Hello</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Sub</p>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
```

### [TestRenderer](https://reactjs.org/docs/test-renderer.html#testrenderer)

-   [`TestRenderer.create()`](https://reactjs.org/docs/test-renderer.html#testrenderercreate)
-   [`TestRenderer.act()`](https://reactjs.org/docs/test-renderer.html#testrendereract)

### [TestRenderer instance](https://reactjs.org/docs/test-renderer.html#testrenderer-instance)

-   [`testRenderer.toJSON()`](https://reactjs.org/docs/test-renderer.html#testrenderertojson)
-   [`testRenderer.toTree()`](https://reactjs.org/docs/test-renderer.html#testrenderertotree)
-   [`testRenderer.update()`](https://reactjs.org/docs/test-renderer.html#testrendererupdate)
-   [`testRenderer.unmount()`](https://reactjs.org/docs/test-renderer.html#testrendererunmount)
-   [`testRenderer.getInstance()`](https://reactjs.org/docs/test-renderer.html#testrenderergetinstance)
-   [`testRenderer.root`](https://reactjs.org/docs/test-renderer.html#testrendererroot)

### [TestInstance](https://reactjs.org/docs/test-renderer.html#testinstance)

-   [`testInstance.find()`](https://reactjs.org/docs/test-renderer.html#testinstancefind)
-   [`testInstance.findByType()`](https://reactjs.org/docs/test-renderer.html#testinstancefindbytype)
-   [`testInstance.findByProps()`](https://reactjs.org/docs/test-renderer.html#testinstancefindbyprops)
-   [`testInstance.findAll()`](https://reactjs.org/docs/test-renderer.html#testinstancefindall)
-   [`testInstance.findAllByType()`](https://reactjs.org/docs/test-renderer.html#testinstancefindallbytype)
-   [`testInstance.findAllByProps()`](https://reactjs.org/docs/test-renderer.html#testinstancefindallbyprops)
-   [`testInstance.instance`](https://reactjs.org/docs/test-renderer.html#testinstanceinstance)
-   [`testInstance.type`](https://reactjs.org/docs/test-renderer.html#testinstancetype)
-   [`testInstance.props`](https://reactjs.org/docs/test-renderer.html#testinstanceprops)
-   [`testInstance.parent`](https://reactjs.org/docs/test-renderer.html#testinstanceparent)
-   [`testInstance.children`](https://reactjs.org/docs/test-renderer.html#testinstancechildren)
