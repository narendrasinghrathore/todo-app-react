## Higher-Order Components

A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.
Concretely, a higher-order component is a function that takes a component and returns a new component.

Whereas a component transforms props into UI, a higher-order component transforms a component into another component.

HOCs are common in third-party React libraries, such as Redux’s connect and Relay’s createFragmentContainer.

### Use HOCs For Cross-Cutting Concerns

Note

We previously recommended mixins as a way to handle cross-cutting concerns. We’ve since realized that mixins create more trouble than they are worth. Read more about why we’ve moved away from mixins and how you can transition your existing components https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html.

#### For example

We can write a function that creates components, like CommentList and BlogPost, that subscribe to DataSource. The function will accept as one of its arguments a child component that receives the subscribed data as a prop. Let’s call the function withSubscription:

    const CommentListWithSubscription = withSubscription(
      CommentList,
      (DataSource) => DataSource.getComments()
    );

    const BlogPostWithSubscription = withSubscription(
      BlogPost,
      (DataSource, props) => DataSource.getBlogPost(props.id)
    );

The first parameter is the wrapped component. The second parameter retrieves the data we’re interested in, given a DataSource and the current props.

When CommentListWithSubscription and BlogPostWithSubscription are rendered, CommentList and BlogPost will be passed a data prop with the most current data retrieved from DataSource:

    // This function takes a component...
    function withSubscription(WrappedComponent, selectData) {
      // ...and returns another component...
      return class extends React.Component {
        constructor(props) {
          super(props);
          this.handleChange = this.handleChange.bind(this);
          this.state = {
            data: selectData(DataSource, props)
          };
        }

        componentDidMount() {
          // ... that takes care of the subscription...
          DataSource.addChangeListener(this.handleChange);
        }

        componentWillUnmount() {
          DataSource.removeChangeListener(this.handleChange);
        }

        handleChange() {
          this.setState({
            data: selectData(DataSource, this.props)
          });
        }

        render() {
          // ... and renders the wrapped component with the fresh data!
          // Notice that we pass through any additional props
          return <WrappedComponent data={this.state.data} {...this.props} />;
        }
      };
    }

Note that a HOC doesn’t modify the input component, nor does it use inheritance to copy its behavior. Rather, a HOC composes the original component by wrapping it in a container component. A HOC is a pure function with zero side-effects.

And that’s it! The wrapped component receives all the props of the container, along with a new prop, data, which it uses to render its output. The HOC isn’t concerned with how or why the data is used, and the wrapped component isn’t concerned with where the data came from.

Because withSubscription is a normal function, you can add as many or as few arguments as you like. For example, you may want to make the name of the data prop configurable, to further isolate the HOC from the wrapped component. Or you could accept an argument that configures shouldComponentUpdate, or one that configures the data source. These are all possible because the HOC has full control over how the component is defined.

Like components, the contract between withSubscription and the wrapped component is entirely props-based. This makes it easy to swap one HOC for a different one, as long as they provide the same props to the wrapped component. This may be useful if you change data-fetching libraries, for example.

### Don’t Mutate the Original Component. Use Composition.

Resist the temptation to modify a component’s prototype (or otherwise mutate it) inside a HOC.

        function logProps(InputComponent) {
            InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
                console.log('Current props: ', this.props);
                console.log('Next props: ', nextProps);
            };
        // The fact that we're returning the original input is a hint that it has
        // been mutated.
            return InputComponent;
        }

        // EnhancedComponent will log whenever props are received
        const EnhancedComponent = logProps(InputComponent);

There are a few problems with this. One is that the input component cannot be reused separately from the enhanced component. More crucially, if you apply another HOC to EnhancedComponent that also mutates componentWillReceiveProps, the first HOC’s functionality will be overridden! This HOC also won’t work with function components, which do not have lifecycle methods.

Mutating HOCs are a leaky abstraction—the consumer must know how they are implemented in order to avoid conflicts with other HOCs.

Instead of mutation, HOCs should use composition, by wrapping the input component in a container component:

        function logProps(WrappedComponent) {
            return class extends React.Component {
                componentWillReceiveProps(nextProps) {
                console.log('Current props: ', this.props);
                console.log('Next props: ', nextProps);
                }
                render() {
                // Wraps the input component in a container, without mutating it. Good!
                return <WrappedComponent {...this.props} />;
                }
            }
        }

This HOC has the same functionality as the mutating version while avoiding the potential for clashes. It works equally well with class and function components. And because it’s a pure function, it’s composable with other HOCs, or even with itself.

You may have noticed similarities between HOCs and a pattern called container components. Container components are part of a strategy of separating responsibility between high-level and low-level concerns. Containers manage things like subscriptions and state, and pass props to components that handle things like rendering UI. HOCs use containers as part of their implementation. You can think of HOCs as parameterized container component definitions.

### Convention: Pass Unrelated Props Through to the Wrapped Component

HOCs add features to a component. They shouldn’t drastically alter its contract. It’s expected that the component returned from a HOC has a similar interface to the wrapped component.

HOCs should pass through props that are unrelated to its specific concern. Most HOCs contain a render method that looks something like this:

    render() {
        // Filter out extra props that are specific to this HOC and shouldn't be
        // passed through
        const { extraProp, ...passThroughProps } = this.props;

        // Inject props into the wrapped component. These are usually state values or
        // instance methods.
        const injectedProp = someStateOrInstanceMethod;

        // Pass props to wrapped component
        return (
            <WrappedComponent
            injectedProp={injectedProp}
            {...passThroughProps}
            />
        );
    }

This convention helps ensure that HOCs are as flexible and reusable as possible.

Convention: Wrap the Display Name for Easy Debugging
The container components created by HOCs show up in the React Developer Tools like any other component. To ease debugging, choose a display name that communicates that it’s the result of a HOC.

The most common technique is to wrap the display name of the wrapped component. So if your higher-order component is named withSubscription, and the wrapped component’s display name is CommentList, use the display name WithSubscription(CommentList):

    function withSubscription(WrappedComponent) {
        class WithSubscription extends React.Component {/* ... */}
        WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
        return WithSubscription;
    }

    function getDisplayName(WrappedComponent) {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }

### Caveats

Higher-order components come with a few caveats that aren’t immediately obvious if you’re new to React.

#### Don’t Use HOCs Inside the render Method

React’s diffing algorithm (called reconciliation) uses component identity to determine whether it should update the existing subtree or throw it away and mount a new one. If the component returned from render is identical (===) to the component from the previous render, React recursively updates the subtree by diffing it with the new one. If they’re not equal, the previous subtree is unmounted completely.

Normally, you shouldn’t need to think about this. But it matters for HOCs because it means you can’t apply a HOC to a component within the render method of a component:

        render() {
            // A new version of EnhancedComponent is created on every render
            // EnhancedComponent1 !== EnhancedComponent2
            const EnhancedComponent = enhance(MyComponent);
            // That causes the entire subtree to unmount/remount each time!
            return <EnhancedComponent />;
        }

The problem here isn’t just about performance — remounting a component causes the state of that component and all of its children to be lost.

Instead, apply HOCs outside the component definition so that the resulting component is created only once. Then, its identity will be consistent across renders. This is usually what you want, anyway.

In those rare cases where you need to apply a HOC dynamically, you can also do it inside a component’s lifecycle methods or its constructor.

Static Methods Must Be Copied Over
Sometimes it’s useful to define a static method on a React component. For example, Relay containers expose a static method getFragment to facilitate the composition of GraphQL fragments.

When you apply a HOC to a component, though, the original component is wrapped with a container component. That means the new component does not have any of the static methods of the original component.

        // Define a static method
        WrappedComponent.staticMethod = function() {/*...*/}
        // Now apply a HOC
        const EnhancedComponent = enhance(WrappedComponent);

        // The enhanced component has no static method
        typeof EnhancedComponent.staticMethod === 'undefined' // true

To solve this, you could copy the methods onto the container before returning it:

        function enhance(WrappedComponent) {
        class Enhance extends React.Component {/*...*/}
        // Must know exactly which method(s) to copy :(
        Enhance.staticMethod = WrappedComponent.staticMethod;
        return Enhance;
        }

However, this requires you to know exactly which methods need to be copied. You can use hoist-non-react-statics to automatically copy all non-React static methods:

        import hoistNonReactStatic from 'hoist-non-react-statics';
        function enhance(WrappedComponent) {
        class Enhance extends React.Component {/*...*/}
        hoistNonReactStatic(Enhance, WrappedComponent);
        return Enhance;
        }

Another possible solution is to export the static method separately from the component itself.

        // Instead of...
        MyComponent.someFunction = someFunction;
        export default MyComponent;

        // ...export the method separately...
        export { someFunction };

        // ...and in the consuming module, import both
        import MyComponent, { someFunction } from './MyComponent.js';

### Refs Aren’t Passed Through

While the convention for higher-order components is to pass through all props to the wrapped component, this does not work for refs. That’s because ref is not really a prop — like key, it’s handled specially by React. If you add a ref to an element whose component is the result of a HOC, the ref refers to an instance of the outermost container component, not the wrapped component.

The solution for this problem is to use the React.forwardRef API (introduced with React 16.3). Learn more about it in the forwarding refs section.



## Integrating with Other Libraries

React can be used in any web application. It can be embedded in other applications and, with a little care, other applications can be embedded in React. This guide will examine some of the more common use cases, focusing on integration with jQuery and Backbone, but the same ideas can be applied to integrating components with any existing code.

### Integrating with DOM Manipulation Plugins
React is unaware of changes made to the DOM outside of React. It determines updates based on its own internal representation, and if the same DOM nodes are manipulated by another library, React gets confused and has no way to recover.

This does not mean it is impossible or even necessarily difficult to combine React with other ways of affecting the DOM, you just have to be mindful of what each is doing.

The easiest way to avoid conflicts is to prevent the React component from updating. You can do this by rendering elements that React has no reason to update, like an empty <div />.

### How to Approach the Problem
To demonstrate this, let’s sketch out a wrapper for a generic jQuery plugin.

We will attach a ref to the root DOM element. Inside componentDidMount, we will get a reference to it so we can pass it to the jQuery plugin.

To prevent React from touching the DOM after mounting, we will return an empty <div /> from the render() method. The <div /> element has no properties or children, so React has no reason to update it, leaving the jQuery plugin free to manage that part of the DOM:

        class SomePlugin extends React.Component {
            componentDidMount() {
                this.$el = $(this.el);
                this.$el.somePlugin();
            }

            componentWillUnmount() {
                this.$el.somePlugin('destroy');
            }

            render() {
                return <div ref={el => this.el = el} />;
            }
        }


Note that we defined both componentDidMount and componentWillUnmount lifecycle methods. Many jQuery plugins attach event listeners to the DOM so it’s important to detach them in componentWillUnmount. If the plugin does not provide a method for cleanup, you will probably have to provide your own, remembering to remove any event listeners the plugin registered to prevent memory leaks.


### Integrating with jQuery Chosen Plugin
For a more concrete example of these concepts, let’s write a minimal wrapper for the plugin Chosen, which augments <select> inputs.

Note:

Just because it’s possible, doesn’t mean that it’s the best approach for React apps. We encourage you to use React components when you can. React components are easier to reuse in React applications, and often provide more control over their behavior and appearance.

First, let’s look at what Chosen does to the DOM.

If you call it on a <select> DOM node, it reads the attributes off of the original DOM node, hides it with an inline style, and then appends a separate DOM node with its own visual representation right after the <select>. Then it fires jQuery events to notify us about the changes.

Let’s say that this is the API we’re striving for with our <Chosen> wrapper React component:

    function Example() {
        return (
            <Chosen onChange={value => console.log(value)}>
            <option>vanilla</option>
            <option>chocolate</option>
            <option>strawberry</option>
            </Chosen>
        );
    }

We will implement it as an uncontrolled component for simplicity.

First, we will create an empty component with a render() method where we return <select> wrapped in a <div>:

    class Chosen extends React.Component {
        render() {
            return (
            <div>
                <select className="Chosen-select" ref={el => this.el = el}>
                {this.props.children}
                </select>
            </div>
            );
        }
    }

Notice how we wrapped <select> in an extra <div>. This is necessary because Chosen will append another DOM element right after the <select> node we passed to it. However, as far as React is concerned, <div> always only has a single child. This is how we ensure that React updates won’t conflict with the extra DOM node appended by Chosen. It is important that if you modify the DOM outside of React flow, you must ensure React doesn’t have a reason to touch those DOM nodes.

Next, we will implement the lifecycle methods. We need to initialize Chosen with the ref to the <select> node in componentDidMount, and tear it down in componentWillUnmount:

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.chosen();
    }

    componentWillUnmount() {
        this.$el.chosen('destroy');
    }


Note that React assigns no special meaning to the this.el field. It only works because we have previously assigned this field from a ref in the render() method:

<select className="Chosen-select" ref={el => this.el = el}>
This is enough to get our component to render, but we also want to be notified about the value changes. To do this, we will subscribe to the jQuery change event on the <select> managed by Chosen.

We won’t pass this.props.onChange directly to Chosen because component’s props might change over time, and that includes event handlers. Instead, we will declare a handleChange() method that calls this.props.onChange, and subscribe it to the jQuery change event:


        componentDidMount() {
            this.$el = $(this.el);
            this.$el.chosen();

            this.handleChange = this.handleChange.bind(this);
            this.$el.on('change', this.handleChange);
        }

        componentWillUnmount() {
            this.$el.off('change', this.handleChange);
            this.$el.chosen('destroy');
        }

        handleChange(e) {
            this.props.onChange(e.target.value);
        }


Finally, there is one more thing left to do. In React, props can change over time. For example, the <Chosen> component can get different children if parent component’s state changes. This means that at integration points it is important that we manually update the DOM in response to prop updates, since we no longer let React manage the DOM for us.

Chosen’s documentation suggests that we can use jQuery trigger() API to notify it about changes to the original DOM element. We will let React take care of updating this.props.children inside <select>, but we will also add a componentDidUpdate() lifecycle method that notifies Chosen about changes in the children list:


    componentDidUpdate(prevProps) {
        if (prevProps.children !== this.props.children) {
            this.$el.trigger("chosen:updated");
        }
    }

This way, Chosen will know to update its DOM element when the <select> children managed by React change.

The complete implementation of the Chosen component looks like this:

    class Chosen extends React.Component {
        componentDidMount() {
            this.$el = $(this.el);
            this.$el.chosen();

            this.handleChange = this.handleChange.bind(this);
            this.$el.on('change', this.handleChange);
        }
        
        componentDidUpdate(prevProps) {
            if (prevProps.children !== this.props.children) {
            this.$el.trigger("chosen:updated");
            }
        }

        componentWillUnmount() {
            this.$el.off('change', this.handleChange);
            this.$el.chosen('destroy');
        }
        
        handleChange(e) {
            this.props.onChange(e.target.value);
        }

        render() {
            return (
            <div>
                <select className="Chosen-select" ref={el => this.el = el}>
                {this.props.children}
                </select>
            </div>
            );
        }
    }

For more scenario's refer to link: https://reactjs.org/docs/integrating-with-other-libraries.html


## JSX In Depth

Fundamentally, JSX just provides syntactic sugar for the React.createElement(component, props, ...children) function. The JSX code:

        <MyButton color="blue" shadowSize={2}>
            Click Me
        </MyButton>

compiles into:

        React.createElement(
            MyButton,
            {color: 'blue', shadowSize: 2},
            'Click Me'
        )

You can also use the self-closing form of the tag if there are no children. So:

        <div className="sidebar" />

compiles into:

        React.createElement(
            'div',
            {className: 'sidebar'},
            null
        )

### Specifying The React Element Type
The first part of a JSX tag determines the type of the React element.

Capitalized types indicate that the JSX tag is referring to a React component. These tags get compiled into a direct reference to the named variable, so if you use the JSX <Foo /> expression, Foo must be in scope.

### React Must Be in Scope
Since JSX compiles into calls to React.createElement, the React library must also always be in scope from your JSX code.

For example, both of the imports are necessary in this code, even though React and CustomButton are not directly referenced from JavaScript:

    import React from 'react';
    import CustomButton from './CustomButton';

    function WarningButton() {
        // return React.createElement(CustomButton, {color: 'red'}, null);
        return <CustomButton color="red" />;
    }


If you don’t use a JavaScript bundler and loaded React from a <script> tag, it is already in scope as the React global.



### Using Dot Notation for JSX Type
You can also refer to a React component using dot-notation from within JSX. This is convenient if you have a single module that exports many React components. For example, if MyComponents.DatePicker is a component, you can use it directly from JSX with:

        import React from 'react';

        const MyComponents = {
            DatePicker: function DatePicker(props) {
                return <div>Imagine a {props.color} datepicker here.</div>;
            }
        }

        function BlueDatePicker() {
            return <MyComponents.DatePicker color="blue" />;
        }



### User-Defined Components Must Be Capitalized
When an element type starts with a lowercase letter, it refers to a built-in component like <div> or <span> and results in a string 'div' or 'span' passed to React.createElement. Types that start with a capital letter like <Foo /> compile to React.createElement(Foo) and correspond to a component defined or imported in your JavaScript file.


### Choosing the Type at Runtime
You cannot use a general expression as the React element type. If you do want to use a general expression to indicate the type of the element, just assign it to a capitalized variable first. This often comes up when you want to render a different component based on a prop:

        import React from 'react';
        import { PhotoStory, VideoStory } from './stories';

        const components = {
            photo: PhotoStory,
            video: VideoStory
        };

        function Story(props) {
            // Wrong! JSX type can't be an expression.
            return <components[props.storyType] story={props.story} />;
        }


To fix this, we will assign the type to a capitalized variable first:

        import React from 'react';
        import { PhotoStory, VideoStory } from './stories';

        const components = {
            photo: PhotoStory,
            video: VideoStory
        };

        function Story(props) {
            // Correct! JSX type can be a capitalized variable.
            const SpecificStory = components[props.storyType];
            return <SpecificStory story={props.story} />;
        }

### String Literals
You can pass a string literal as a prop. These two JSX expressions are equivalent:

        <MyComponent message="hello world" />

        <MyComponent message={'hello world'} />

When you pass a string literal, its value is HTML-unescaped. So these two JSX expressions are equivalent:

        <MyComponent message="&lt;3" />

        <MyComponent message={'<3'} />

This behavior is usually not relevant. It’s only mentioned here for completeness.


### Props Default to “True”
If you pass no value for a prop, it defaults to true. These two JSX expressions are equivalent:

        <MyTextBox autocomplete />

        <MyTextBox autocomplete={true} />

In general, we don’t recommend using this because it can be confused with the ES6 object shorthand {foo} which is short for {foo: foo} rather than {foo: true}. This behavior is just there so that it matches the behavior of HTML.

### Spread Attributes
If you already have props as an object, and you want to pass it in JSX, you can use ... as a “spread” operator to pass the whole props object. These two components are equivalent:

        function App1() {
        return <Greeting firstName="Ben" lastName="Hector" />;
        }

        function App2() {
        const props = {firstName: 'Ben', lastName: 'Hector'};
        return <Greeting {...props} />;
        }

You can also pick specific props that your component will consume while passing all other props using the spread operator.

        const Button = props => {
            const { kind, ...other } = props;
            const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
            return <button className={className} {...other} />;
        };

        const App = () => {
            return (
                <div>
                <Button kind="primary" onClick={() => console.log("clicked!")}>
                    Hello World!
                </Button>
                </div>
            );
        };


### Children in JSX
In JSX expressions that contain both an opening tag and a closing tag, the content between those tags is passed as a special prop: props.children. There are several different ways to pass children:

#### String Literals
You can put a string between the opening and closing tags and props.children will just be that string. This is useful for many of the built-in HTML elements. For example:

        <MyComponent>Hello world!</MyComponent>


This is valid JSX, and props.children in MyComponent will simply be the string "Hello world!". HTML is unescaped, so you can generally write JSX just like you would write HTML in this way:

        <div>This is valid HTML &amp; JSX at the same time.</div>



JSX removes whitespace at the beginning and ending of a line. It also removes blank lines. New lines adjacent to tags are removed; new lines that occur in the middle of string literals are condensed into a single space. So these all render to the same thing:

        <div>Hello World</div>

        <div>
            Hello World
        </div>

        <div>
            Hello
            World
        </div>

        <div>

            Hello World
        </div>



#### JSX Children
You can provide more JSX elements as the children. This is useful for displaying nested components:

        <MyContainer>
        <MyFirstComponent />
        <MySecondComponent />
        </MyContainer>

You can mix together different types of children, so you can use string literals together with JSX children. This is another way in which JSX is like HTML, so that this is both valid JSX and valid HTML:

        <div>
            Here is a list:
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
            </ul>
        </div>


A React component can also return an array of elements:

        render() {
            // No need to wrap list items in an extra element!
            return [
                // Don't forget the keys :)
                <li key="A">First item</li>,
                <li key="B">Second item</li>,
                <li key="C">Third item</li>,
            ];
        }

### JavaScript Expressions as Children
You can pass any JavaScript expression as children, by enclosing it within {}. For example, these expressions are equivalent:

        <MyComponent>foo</MyComponent>

        <MyComponent>{'foo'}</MyComponent>


This is often useful for rendering a list of JSX expressions of arbitrary length. For example, this renders an HTML list:

        function Item(props) {
        return <li>{props.message}</li>;
        }

        function TodoList() {
        const todos = ['finish doc', 'submit pr', 'nag dan to review'];
        return (
            <ul>
            {todos.map((message) => <Item key={message} message={message} />)}
            </ul>
        );
        }

### Functions as Children
Normally, JavaScript expressions inserted in JSX will evaluate to a string, a React element, or a list of those things. However, props.children works just like any other prop in that it can pass any sort of data, not just the sorts that React knows how to render. For example, if you have a custom component, you could have it take a callback as props.children:

        // Calls the children callback numTimes to produce a repeated component
        function Repeat(props) {
        let items = [];
        for (let i = 0; i < props.numTimes; i++) {
            items.push(props.children(i));
        }
        return <div>{items}</div>;
        }

        function ListOfTenThings() {
        return (
            <Repeat numTimes={10}>
            {(index) => <div key={index}>This is item {index} in the list</div>}
            </Repeat>
        );
        }

Children passed to a custom component can be anything, as long as that component transforms them into something React can understand before rendering. This usage is not common, but it works if you want to stretch what JSX is capable of.





### Booleans, Null, and Undefined Are Ignored
false, null, undefined, and true are valid children. They simply don’t render. These JSX expressions will all render to the same thing:

        <div />

        <div></div>

        <div>{false}</div>

        <div>{null}</div>

        <div>{undefined}</div>

        <div>{true}</div>

This can be useful to conditionally render React elements. This JSX renders the <Header /> component only if showHeader is true:

        <div>
            {showHeader && <Header />}
            <Content />
        </div>

Conversely, if you want a value like false, true, null, or undefined to appear in the output, you have to convert it to a string first https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion:

        <div>
            My JavaScript variable is {String(myVariable)}.
        </div>



