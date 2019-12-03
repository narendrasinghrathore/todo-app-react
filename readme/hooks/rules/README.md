# Rules of Hooks
_Hooks_ are a new addition in React 16.8. They let you use state and other React features without writing a class.

### Only Call Hooks at the Top Level

**Don’t call Hooks inside loops, conditions, or nested functions.**  Instead, always use Hooks at the top level of your React function. By following this rule, you ensure that Hooks are called in the same order each time a component renders. That’s what allows React to correctly preserve the state of Hooks between multiple  `useState`  and  `useEffect`  calls.

### Only Call Hooks from React Functions

**Don’t call Hooks from regular JavaScript functions.**  Instead, you can:

-   ✅ Call Hooks from React function components.
-   ✅ Call Hooks from custom Hooks (we’ll learn about them  [on the next page](https://reactjs.org/docs/hooks-custom.html)).

By following this rule, you ensure that all stateful logic in a component is clearly visible from its source code.
