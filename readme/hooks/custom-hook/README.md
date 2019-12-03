# Building Your Own Hooks

_Hooks_  are a new addition in React 16.8. They let you use state and other React features without writing a class.

Building your own Hooks lets you extract component logic into reusable functions.

**A custom Hook is a JavaScript function whose name starts with ”`use`” and that may call other Hooks.**  For example,  `useFriendStatus`  below is our first custom Hook:

```
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

There’s nothing new inside of it — the logic is copied from the components above. Just like in a component, make sure to only call other Hooks unconditionally at the top level of your custom Hook.

Unlike a React component, a custom Hook doesn’t need to have a specific signature. We can decide what it takes as arguments, and what, if anything, it should return. In other words, it’s just like a normal function. Its name should always start with  `use`  so that you can tell at a glance that the  [rules of Hooks](https://reactjs.org/docs/hooks-rules.html)  apply to it.

The purpose of our  `useFriendStatus`  Hook is to subscribe us to a friend’s status.


**Do I have to name my custom Hooks starting with “`use`”?**  Please do. This convention is very important. Without it, we wouldn’t be able to automatically check for violations of  [rules of Hooks](https://reactjs.org/docs/hooks-rules.html)  because we couldn’t tell if a certain function contains calls to Hooks inside of it.

**Do two components using the same Hook share state?**  No. Custom Hooks are a mechanism to reuse  _stateful logic_  (such as setting up a subscription and remembering the current value), but every time you use a custom Hook, all state and effects inside of it are fully isolated.

**How does a custom Hook get isolated state?**  Each  _call_  to a Hook gets isolated state. Because we call  `useFriendStatus`  directly, from React’s point of view our component just calls  `useState`  and  `useEffect`. And as we  [learned](https://reactjs.org/docs/hooks-state.html#tip-using-multiple-state-variables)  [earlier](https://reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns), we can call  `useState`  and  `useEffect`  many times in one component, and they will be completely independent.



### Tip: Pass Information Between Hooks

Since Hooks are functions, we can pass information between them.

To illustrate this, we’ll use another component from our hypothetical chat example. This is a chat message recipient picker that displays whether the currently selected friend is online:

```
const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={e => setRecipientID(Number(e.target.value))}
      >
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```

We keep the currently chosen friend ID in the  `recipientID`  state variable, and update it if the user chooses a different friend in the  `<select>`  picker.

Because the  `useState`  Hook call gives us the latest value of the  `recipientID`  state variable, we can pass it to our custom  `useFriendStatus`  Hook as an argument:

```
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
```

This lets us know whether the  _currently selected_  friend is online. If we pick a different friend and update the  `recipientID`  state variable, our  `useFriendStatus`  Hook will unsubscribe from the previously selected friend, and subscribe to the status of the newly selected one.


