# Uncontrolled Components

In most cases, we recommend using  [controlled components](https://reactjs.org/docs/forms.html#controlled-components)  to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.

To write an uncontrolled component, instead of writing an event handler for every state update, you can  [use a ref](https://reactjs.org/docs/refs-and-the-dom.html)  to get form values from the DOM.

For example, this code accepts a single name in an uncontrolled component:

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```



Since an uncontrolled component keeps the source of truth in the DOM, it is sometimes easier to integrate React and non-React code when using uncontrolled components. It can also be slightly less code if you want to be quick and dirty. Otherwise, you should usually use controlled components.

If it’s still not clear which type of component you should use for a particular situation, you might find  [this article on controlled versus uncontrolled inputs](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)  to be helpful.

### [Default Values](https://reactjs.org/docs/uncontrolled-components.html#default-values)

In the React rendering lifecycle, the  `value`  attribute on form elements will override the value in the DOM. With an uncontrolled component, you often want React to specify the initial value, but leave subsequent updates uncontrolled. To handle this case, you can specify a  `defaultValue`  attribute instead of  `value`.

```
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

Likewise,  `<input type="checkbox">`  and  `<input type="radio">`  support  `defaultChecked`, and  `<select>`  and  `<textarea>`  supports  `defaultValue`.

## [The file input Tag](https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag)

In HTML, an  `<input type="file">`  lets the user choose one or more files from their device storage to be uploaded to a server or manipulated by JavaScript via the  [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications).

```
<input type="file" />
```

In React, an  `<input type="file" />`  is always an uncontrolled component because its value can only be set by a user, and not programmatically.

You should use the File API to interact with the files. The following example shows how to create a  [ref to the DOM node](https://reactjs.org/docs/refs-and-the-dom.html)  to access file(s) in a submit handler:

```
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${
        this.fileInput.current.files[0].name
      }`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
);
```


# Web Components

React and  [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)  are built to solve different problems. Web Components provide strong encapsulation for reusable components, while React provides a declarative library that keeps the DOM in sync with your data. The two goals are complementary. As a developer, you are free to use React in your Web Components, or to use Web Components in React, or both.

Most people who use React don’t use Web Components, but you may want to, especially if you are using third-party UI components that are written using Web Components.

## [Using Web Components in React](https://reactjs.org/docs/web-components.html#using-web-components-in-react)

```
class HelloMessage extends React.Component {
  render() {
    return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
  }
}
```

> Note:
> 
> Web Components often expose an imperative API. For instance, a  `video`  Web Component might expose  `play()`  and  `pause()`  functions. To access the imperative APIs of a Web Component, you will need to use a ref to interact with the DOM node directly. If you are using third-party Web Components, the best solution is to write a React component that behaves as a wrapper for your Web Component.
> 
> Events emitted by a Web Component may not properly propagate through a React render tree. You will need to manually attach event handlers to handle these events within your React components.

One common confusion is that Web Components use “class” instead of “className”.

```
function BrickFlipbox() {
  return (
    <brick-flipbox class="demo">
      <div>front</div>
      <div>back</div>
    </brick-flipbox>
  );
}
```

## [Using React in your Web Components](https://reactjs.org/docs/web-components.html#using-react-in-your-web-components)

```
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}
customElements.define('x-search', XSearch);
```

> Note:
> 
> This code  **will not**  work if you transform classes with Babel. See  [this issue](https://github.com/w3c/webcomponents/issues/587)  for the discussion. Include the  [custom-elements-es5-adapter](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#custom-elements-es5-adapterjs)  before you load your web components to fix this issue.