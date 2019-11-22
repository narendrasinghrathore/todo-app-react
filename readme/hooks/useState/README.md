# Using the Effect Hook
The _Effect Hook_ lets you perform side effects in function components:
```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. Whether or not you’re used to calling these operations “side effects” (or just “effects”), you’ve likely performed them in your components before.

Tip

If you’re familiar with React class lifecycle methods, you can think of  `useEffect`  Hook as  `componentDidMount`,  `componentDidUpdate`, and  `componentWillUnmount`  combined.


## Effects Without Cleanup

Sometimes, we want to  **run some additional code after React has updated the DOM.**  Network requests, manual DOM mutations, and logging are common examples of effects that don’t require a cleanup. We say that because we can run them and immediately forget about them.

### Example Using Classes

In React class components, the  `render`  method itself shouldn’t cause side effects. It would be too early — we typically want to perform our effects  _after_  React has updated the DOM.

This is why in React classes, we put side effects into  `componentDidMount`  and  `componentDidUpdate`. Coming back to our example, here is a React counter class component that updates the document title right after React makes changes to the DOM:

```
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

Note how  **we have to duplicate the code between these two lifecycle methods in class.**

This is because in many cases we want to perform the same side effect regardless of whether the component just mounted, or if it has been updated. Conceptually, we want it to happen after every render — but React class components don’t have a method like this. We could extract a separate method but we would still have to call it in two places.

Now let’s see how we can do the same with the  `useEffect`  Hook.

### [](https://reactjs.org/docs/hooks-effect.html#example-using-hooks)Example Using Hooks

We’ve already seen this example at the top of this page, but let’s take a closer look at it:

```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

**What does  `useEffect`  do?**  By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates. In this effect, we set the document title, but we could also perform data fetching or call some other imperative API.

**Why is  `useEffect`  called inside a component?**  Placing  `useEffect`  inside the component lets us access the  `count`  state variable (or any props) right from the effect. We don’t need a special API to read it — it’s already in the function scope. Hooks embrace JavaScript closures and avoid introducing React-specific APIs where JavaScript already provides a solution.

**Does  `useEffect`  run after every render?**  **Yes! By default, it runs both after the first render  _and_  after every update.** (We will later talk about  [how to customize this](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects).) Instead of thinking in terms of “mounting” and “updating”, you might find it easier to think that effects happen “after render”. React guarantees the DOM has been updated by the time it runs the effects.






### Detailed Explanation

Now that we know more about effects, these lines should make sense:

```
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
}
```

We declare the  `count`  state variable, and then we tell React we need to use an effect. We pass a function to the  `useEffect`  Hook. This function we pass  _is_  our effect. Inside our effect, we set the document title using the  `document.title`  browser API. We can read the latest  `count`  inside the effect because it’s in the scope of our function. When React renders our component, it will remember the effect we used, and then run our effect after updating the DOM. This happens for every render, including the first one.

Experienced JavaScript developers might notice that the function passed to  `useEffect`  is going to be different on every render. This is intentional. In fact, this is what lets us read the  `count`  value from inside the effect without worrying about it getting stale. Every time we re-render, we schedule a  _different_  effect, replacing the previous one. In a way, this makes the effects behave more like a part of the render result — each effect “belongs” to a particular render.

Tip

Unlike  `componentDidMount`  or  `componentDidUpdate`, effects scheduled with  `useEffect`  don’t block the browser from updating the screen. This makes your app feel more responsive. The majority of effects don’t need to happen synchronously. In the uncommon cases where they do (such as measuring the layout), there is a separate  [`useLayoutEffect`](https://reactjs.org/docs/hooks-reference.html#uselayouteffect)  Hook with an API identical to  `useEffect`.

## Effects with Cleanup

Earlier, we looked at how to express side effects that don’t require any cleanup. However, some effects do. For example,  **we might want to set up a subscription**  to some external data source. In that case, it is important to clean up so that we don’t introduce a memory leak! Let’s compare how we can do it with classes and with Hooks.

### [](https://reactjs.org/docs/hooks-effect.html#example-using-classes-1)Example Using Classes

In a React class, you would typically set up a subscription in  `componentDidMount`, and clean it up in  `componentWillUnmount`. For example, let’s say we have a  `ChatAPI`  module that lets us subscribe to a friend’s online status. Here’s how we might subscribe and display that status using a class:

```
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

Notice how  `componentDidMount`  and  `componentWillUnmount`  need to mirror each other. Lifecycle methods force us to split this logic even though conceptually code in both of them is related to the same effect.

### Example Using Hooks

Let’s see how we could write this component with Hooks.

You might be thinking that we’d need a separate effect to perform the cleanup. But code for adding and removing a subscription is so tightly related that  `useEffect`  is designed to keep it together. If your effect returns a function, React will run it when it is time to clean up:

```
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

**Why did we return a function from our effect?**  This is the optional cleanup mechanism for effects. Every effect may return a function that cleans up after it. This lets us keep the logic for adding and removing subscriptions close to each other. They’re part of the same effect!

**When exactly does React clean up an effect?**  React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React  _also_  cleans up effects from the previous render before running the effects next time.


### Tip: Optimizing Performance by Skipping Effects

In some cases, cleaning up or applying the effect after every render might create a performance problem. In class components, we can solve this by writing an extra comparison with  `prevProps`  or  `prevState`  inside  `componentDidUpdate`:

```
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

This requirement is common enough that it is built into the  `useEffect`  Hook API. You can tell React to  _skip_  applying an effect if certain values haven’t changed between re-renders. To do so, pass an array as an optional second argument to  `useEffect`:

```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes

```

In the example above, we pass  `[count]`  as the second argument. What does this mean? If the  `count`  is  `5`, and then our component re-renders with  `count`  still equal to  `5`, React will compare  `[5]`  from the previous render and  `[5]`  from the next render. Because all items in the array are the same (`5 === 5`), React would skip the effect. That’s our optimization.

When we render with  `count`  updated to  `6`, React will compare the items in the  `[5]`  array from the previous render to items in the  `[6]`  array from the next render. This time, React will re-apply the effect because  `5 !== 6`. If there are multiple items in the array, React will re-run the effect even if just one of them is different.

This also works for effects that have a cleanup phase:

```
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Only re-subscribe if props.friend.id changes

```

In the future, the second argument might get added automatically by a build-time transformation.

> Note
> 
> If you use this optimization, make sure the array includes  **all values from the component scope (such as props and state) that change over time and that are used by the effect**. Otherwise, your code will reference stale values from previous renders. Learn more about  [how to deal with functions](https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)  and  [what to do when the array changes too often](https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).
> 
> If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array (`[]`) as a second argument. This tells React that your effect doesn’t depend on  _any_  values from props or state, so it never needs to re-run. This isn’t handled as a special case — it follows directly from how the dependencies array always works.
> 
> If you pass an empty array (`[]`), the props and state inside the effect will always have their initial values. While passing  `[]`  as the second argument is closer to the familiar  `componentDidMount`  and  `componentWillUnmount`  mental model, there are usually  [better](https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)  [solutions](https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often)  to avoid re-running effects too often. Also, don’t forget that React defers running  `useEffect`  until after the browser has painted, so doing extra work is less of a problem.
> 
> We recommend using the  [`exhaustive-deps`](https://github.com/facebook/react/issues/14920)  rule as part of our  [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation)  package. It warns when dependencies are specified incorrectly and suggests a fix.
