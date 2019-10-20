## Note: If your component doesn't have to hold state, use function components, result in very less code. Try to compile below example code in babel compiler online and see major difference.

    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }

Class

    class Welcome extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }

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

## Keys Must Only Be Unique Among Siblings
Keys used within arrays should be unique among their siblings. However they don’t need to be globally unique.

Keys serve as a hint to React but they don’t get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name




JSX allows embedding any expression in curly braces so we could inline the map() result:


    function NumberList(props) {
      const numbers = props.numbers;
      return (
        <ul>
          {numbers.map((number) =>
            <ListItem key={number.toString()}
                      value={number} />

          )}
        </ul>
      );
    }



### Controlled Components
In HTML, form elements such as <input>, <textarea>, and <select> typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with setState().

We can combine the two by making the React state be the “single source of truth”. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”.

With a controlled component, every state mutation will have an associated handler function. This makes it straightforward to modify or validate user input. 

### The textarea Tag
In React, a <textarea> uses a value attribute instead. This way, a form using a <textarea> can be written very similarly to a form that uses a single-line input

### The select Tag
 React, instead of using this selected attribute, uses a value attribute on the root select tag. This is more convenient in a controlled component because you only need to update it in one place


### Handling Multiple Inputs
When you need to handle multiple controlled input elements, you can add a name attribute to each element and let the handler function choose what to do based on the value of event.target.name.


    class Reservation extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          isGoing: true,
          numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
      }

      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }

      render() {
        return (
          <form>
            <label>
              Is going:
              <input
                name="isGoing"
                type="checkbox"
                checked={this.state.isGoing}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Number of guests:
              <input
                name="numberOfGuests"
                type="number"
                value={this.state.numberOfGuests}
                onChange={this.handleInputChange} />
            </label>
          </form>
        );
      }
    }


Also, since setState() automatically merges a partial state into the current state, we only needed to call it with the changed parts.

### Controlled Input Null Value
Specifying the value prop on a controlled component prevents the user from changing the input unless you desire so. If you’ve specified a value but the input is still editable, you may have accidentally set value to undefined or null.

### Alternatives to Controlled Components
It can sometimes be tedious to use controlled components, because you need to write an event handler for every way your data can change and pipe all of the input state through a React component. This can become particularly annoying when you are converting a preexisting codebase to React, or integrating a React application with a non-React library. In these situations, you might want to check out uncontrolled components, an alternative technique for implementing input forms.

### The file input Tag
In HTML, an <input type="file"> lets the user choose one or more files from their device storage to be uploaded to a server or manipulated by JavaScript via the File API.

    <input type="file" />

Because its value is read-only, it is an uncontrolled component in React. 

### Controlled Input Null Value
Specifying the value prop on a controlled component prevents the user from changing the input unless you desire so. If you’ve specified a value but the input is still editable, you may have accidentally set value to undefined or null.

### Lifting State Up
In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it. This is called “lifting state up”. 
here should be a single “source of truth” for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the top-down data flow.

Lifting state involves writing more “boilerplate” code than two-way binding approaches, but as a benefit, it takes less work to find and isolate bugs. Since any state “lives” in some component and that component alone can change it, the surface area for bugs is greatly reduced. Additionally, you can implement any custom logic to reject or transform user input.

If something can be derived from either props or state, it probably shouldn’t be in the state. For example, instead of storing both celsiusValue and fahrenheitValue, we store just the last edited temperature and its scale. The value of the other input can always be calculated from them in the render() method. This lets us clear or apply rounding to the other field without losing any precision in the user input.

When you see something wrong in the UI, you can use React Developer Tools to inspect the props and move up the tree until you find the component responsible for updating the state. This lets you trace the bugs to their source.

### Composition vs Inheritance
React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.

## Containment
Some components don’t know their children ahead of time. This is especially common for components like Sidebar or Dialog that represent generic “boxes”.

We recommend that such components use the special children prop to pass children elements directly into their output:

    function FancyBorder(props) {
      return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
          {props.children}
        </div>
      );
    }

Anything inside the <FancyBorder> JSX tag gets passed into the FancyBorder component as a children prop. Since FancyBorder renders {props.children} inside a <div>, the passed elements appear in the final output.

While this is less common, sometimes you might need multiple “holes” in a component. In such cases you may come up with your own convention instead of using children:


    function SplitPane(props) {
      return (
        <div className="SplitPane">
          <div className="SplitPane-left">
            {props.left}
          </div>
          <div className="SplitPane-right">
            {props.right}
          </div>
        </div>
      );
    }

    function App() {
      return (
        <SplitPane
          left={
            <Contacts />
          }
          right={
            <Chat />
          } />
      );
    }

React elements like <Contacts /> and <Chat /> are just objects, so you can passthem as props like any other data. This approach may remind you of “slots” in other libraries but there are no limitations on what you can pass as props in React.

Specialization
Sometimes we think about components as being “special cases” of other components. For example, we might say that a WelcomeDialog is a special case of Dialog.

In React, this is also achieved by composition, where a more “specific” component renders a more “generic” one and configures it with props:


    function Dialog(props) {
      return (
        <FancyBorder color="blue">
          <h1 className="Dialog-title">
            {props.title}
          </h1>
          <p className="Dialog-message">
            {props.message}
          </p>
        </FancyBorder>
      );
    }

    function WelcomeDialog() {
      return (
        <Dialog
          title="Welcome"
          message="Thank you for visiting our spacecraft!" />

      );
    }


Composition works equally well for components defined as classes:

    function Dialog(props) {
      return (
        <FancyBorder color="blue">
          <h1 className="Dialog-title">
            {props.title}
          </h1>
          <p className="Dialog-message">
            {props.message}
          </p>
          {props.children}
        </FancyBorder>
      );
    }

    class SignUpDialog extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
      }

      render() {
        return (
          <Dialog title="Mars Exploration Program"
                  message="How should we refer to you?">
            <input value={this.state.login}
                  onChange={this.handleChange} />

            <button onClick={this.handleSignUp}>
              Sign Me Up!
            </button>
          </Dialog>
        );
      }

      handleChange(e) {
        this.setState({login: e.target.value});
      }

      handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
      }
    }

So What About Inheritance?

Props and composition give you all the flexibility you need to customize a component’s look and behavior in an explicit and safe way. Remember that components may accept arbitrary props, including primitive values, React elements, or functions.

If you want to reuse non-UI functionality between components, we suggest extracting it into a separate JavaScript module. The components may import it and use that function, object, or a class, without extending it.

# Accessibility
Web accessibility (also referred to as a11y) is the design and creation of websites that can be used by everyone. Accessibility support is necessary to allow assistive technology to interpret web pages.

## WAI-ARIA
The Web Accessibility Initiative - Accessible Rich Internet Applications document contains techniques for building fully accessible JavaScript widgets.

Note that all aria-* HTML attributes are fully supported in JSX. Whereas most DOM properties and attributes in React are camelCased, these attributes should be hyphen-cased (also known as kebab-case, lisp-case, etc) as they are in plain HTML:

    <input
      type="text"
      aria-label={labelText}
      aria-required="true"
      onChange={onchangeHandler}
      value={inputValue}
      name="name"
    />

## Fragments
A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

    render() {
      return (
        <React.Fragment>
          <ChildA />
          <ChildB />
          <ChildC />
        </React.Fragment>
      );
    }

## Semantic HTML
Semantic HTML is the foundation of accessibility in a web application. Using the various HTML elements to reinforce the meaning of information in our websites will often give us accessibility for free.

MDN HTML elements reference
Sometimes we break HTML semantics when we add <div> elements to our JSX to make our React code work, especially when working with lists (<ol>, <ul> and <dl>) and the HTML <table>. In these cases we should rather use React Fragments to group together multiple elements.

For example

    import React, { Fragment } from 'react';

    function ListItem({ item }) {
      return (
        <Fragment>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      );
    }

    function Glossary(props) {
      return (
        <dl>
          {props.items.map(item => (
            <ListItem item={item} key={item.id} />
          ))}
        </dl>
      );
    }

You can map a collection of items to an array of fragments as you would any other type of element as well:

    function Glossary(props) {
      return (
        <dl>
          {props.items.map(item => (
            // Fragments should also have a `key` prop when mapping collections
            <Fragment key={item.id}>
              <dt>{item.term}</dt>
              <dd>{item.description}</dd>
            </Fragment>
          ))}
        </dl>
      );
    }

When you don’t need any props on the Fragment tag you can use the short syntax, if your tooling supports it:

    function ListItem({ item }) {
      return (
        <>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </>
      );
    }

## Accessible Forms
### Labeling
Every HTML form control, such as <input> and <textarea>, needs to be labeled accessibly. We need to provide descriptive labels that are also exposed to screen readers.

The following resources show us how to do this:

The W3C shows us how to label elements https://www.w3.org/WAI/tutorials/forms/labels/
WebAIM shows us how to label elements https://webaim.org/techniques/forms/controls
The Paciello Group explains accessible nameshttps://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/

Although these standard HTML practices can be directly used in React, note that the for attribute is written as htmlFor in JSX:

    <label htmlFor="namedInput">Name:</label>
    <input id="namedInput" type="text" name="name"/>

## Notifying the user of errors
Error situations need to be understood by all users. The following link shows us how to expose error texts to screen readers as well:

The W3C demonstrates user notifications https://www.w3.org/WAI/tutorials/forms/notifications/
WebAIM looks at form validation https://webaim.org/techniques/formvalidation/

## Focus Control
Ensure that your web application can be fully operated with the keyboard only:
WebAIM talks about keyboard accessibility https://webaim.org/techniques/keyboard/

### Keyboard focus and focus outline
Keyboard focus refers to the current element in the DOM that is selected to accept input from the keyboard. We see it everywhere as a focus outline similar to that shown in the following image:

Blue keyboard focus outline around a selected link.
Only ever use CSS that removes this outline, for example by setting outline: 0, if you are replacing it with another focus outline implementation.

### Mechanisms to skip to desired content
Provide a mechanism to allow users to skip past navigation sections in your application as this assists and speeds up keyboard navigation.

Skiplinks or Skip Navigation Links are hidden navigation links that only become visible when keyboard users interact with the page. They are very easy to implement with internal page anchors and some styling:

WebAIM - Skip Navigation Links https://webaim.org/techniques/skipnav/
Also use landmark elements and roles, such as <main> and <aside>, to demarcate page regions as assistive technology allow the user to quickly navigate to these sections.

Read more about the use of these elements to enhance accessibility here:

Accessible Landmarks https://www.scottohara.me/blog/2018/03/03/landmarks.html

### Programmatically managing focus
Our React applications continuously modify the HTML DOM during runtime, sometimes leading to keyboard focus being lost or set to an unexpected element. In order to repair this, we need to programmatically nudge the keyboard focus in the right direction. For example, by resetting keyboard focus to a button that opened a modal window after that modal window is closed.

MDN Web Docs takes a look at this and describes how we can build keyboard-navigable JavaScript widgets https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets.

To set focus in React, we can use Refs to DOM elements https://reactjs.org/docs/refs-and-the-dom.html.

Using this, we first create a ref to an element in the JSX of a component class:

    class CustomTextInput extends React.Component {
      constructor(props) {
        super(props);
        // Create a ref to store the textInput DOM element
        this.textInput = React.createRef();
      }
      render() {
      // Use the `ref` callback to store a reference to the text input DOM
      // element in an instance field (for example, this.textInput).
        return (
          <input
            type="text"
            ref={this.textInput}
          />
        );
      }
    }

Then we can focus it elsewhere in our component when needed:

    focus() {
      // Explicitly focus the text input using the raw DOM API
      // Note: we're accessing "current" to get the DOM node
      this.textInput.current.focus();
    }

Sometimes a parent component needs to set focus to an element in a child component. We can do this by exposing DOM refs to parent components through a special prop on the child component that forwards the parent’s ref to the child’s DOM node.

    function CustomTextInput(props) {
      return (
        <div>
          <input ref={props.inputRef} />
        </div>
      );
    }

    class Parent extends React.Component {
      constructor(props) {
        super(props);
        this.inputElement = React.createRef();
      }
      render() {
        return (
          <CustomTextInput inputRef={this.inputElement} />
        );
      }
    }

    // Now you can set focus when required.
    this.inputElement.current.focus();

When using a HOC to extend components, it is recommended to forward the ref to the wrapped component using the forwardRef function of React. If a third party HOC does not implement ref forwarding, the above pattern can still be used as a fallback.

A great focus management example is the react-aria-modal. This is a relatively rare example of a fully accessible modal window. Not only does it set initial focus on the cancel button (preventing the keyboard user from accidentally activating the success action) and trap keyboard focus inside the modal, it also resets focus back to the element that initially triggered the modal.

Note:

While this is a very important accessibility feature, it is also a technique that should be used judiciously. Use it to repair the keyboard focus flow when it is disturbed, not to try and anticipate how users want to use applications.


