### Conditional Rendering

In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.

Conditional rendering in React works the same way conditions work in JavaScript. Use JavaScript operators like if or the conditional operator to create elements representing the current state, and let React update the UI to match them.

    function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
    }

    function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
    }

We’ll create a Greeting component that displays either of these components depending on whether a user is logged in:

    function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
    return <UserGreeting />;
    }
    return <GuestGreeting />;
    }

    ReactDOM.render(
    // Try changing to isLoggedIn={true}:
    <Greeting isLoggedIn={false} />,
    document.getElementById('root')
    );

### Element Variables

You can use variables to store elements. This can help you conditionally render a part of the component while the rest of the output doesn’t change.

    let logo;

    switch (greetUser()) {
      case IDay.morning:
        logo = <Logo src="" />;
        break;
      case IDay.noon:
        logo = <LogoNoon src="" />;
        break;
      case IDay.evening:
        logo = <LogoNight src="" />;
        break;
      default:
        logo = <Logo src="" />;
    }

    return (
      <div>
        {logo}
        <h1>Hello there{message}</h1>
      </div>
    );


    While declaring a variable and using an if statement is a fine way to conditionally render a component, sometimes you might want to use a shorter syntax. There are a few ways to inline conditions in JSX, explained below.

Inline If with Logical && Operator
You may embed any expressions in JSX by wrapping them in curly braces. This includes the JavaScript logical && operator. It can be handy for conditionally including an element

    function Mailbox(props) {
      const unreadMessages = props.unreadMessages;
      return (
        <div>
          <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
          }
        </div>
      );
    }

    const messages = ['React', 'Re: React', 'Re:Re: React'];
    ReactDOM.render(
      <Mailbox unreadMessages={messages} />,
      document.getElementById('root')
    );

## It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false.

## Inline If-Else with Conditional Operator

Another method for conditionally rendering elements inline is to use the JavaScript conditional operator condition ? true : false.

## Preventing Component from Rendering

In rare cases you might want a component to hide itself even though it was rendered by another component. To do this return null instead of its render output.

### Returning null from a component’s render method does not affect the firing of the component’s lifecycle methods. For instance componentDidUpdate will still be called.

## Keys

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:

    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );

The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys

When you don’t have stable IDs for rendered items, you may use the item index as a key as a last resort:
    
    const todoItems = todos.map((todo, index) =>
      // Only do this if items have no stable IDs
      <li key={index}>
        {todo.text}
      </li>
    );

We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state.

If you choose not to assign an explicit key to list items then React will default to using indexes as keys.
