# Portals
Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

        ReactDOM.createPortal(child, container)

The first argument (child) is any renderable React child https://reactjs.org/docs/react-component.html#render, such as an element, string, or fragment. The second argument (container) is a DOM element.

Usage
Normally, when you return an element from a component’s render method, it’s mounted into the DOM as a child of the nearest parent node:

        render() {
            // React mounts a new div and renders the children into it
            return (
                <div>
                {this.props.children}
                </div>
            );
        }

However, sometimes it’s useful to insert a child into a different location in the DOM:

        render() {
            // React does *not* create a new div. It renders the children into `domNode`.
            // `domNode` is any valid DOM node, regardless of its location in the DOM.
            return ReactDOM.createPortal(
                this.props.children,
                domNode
            );
        }

A typical use case for portals is when a parent component has an overflow: hidden or z-index style, but you need the child to visually “break out” of its container. For example, dialogs, hovercards, and tooltips.

Note:

When working with portals, remember that managing keyboard focus https://reactjs.org/docs/accessibility.html#programmatically-managing-focus becomes very important.

For modal dialogs, ensure that everyone can interact with them by following the WAI-ARIA Modal Authoring Practices https://reactjs.org/docs/accessibility.html#programmatically-managing-focus.

## Event Bubbling Through Portals
Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way. Features like context work exactly the same regardless of whether the child is a portal, as the portal still exists in the React tree regardless of position in the DOM tree.

This includes event bubbling. An event fired from inside a portal will propagate to ancestors in the containing React tree, even if those elements are not ancestors in the DOM tree. Assuming the following HTML structure:

        <html>
            <body>
                <div id="app-root"></div>
                <div id="modal-root"></div>
            </body>
        </html>

A Parent component in #app-root would be able to catch an uncaught, bubbling event from the sibling node #modal-root.

        // These two containers are siblings in the DOM
        const appRoot = document.getElementById('app-root');
        const modalRoot = document.getElementById('modal-root');

        class Modal extends React.Component {
        constructor(props) {
            super(props);
            this.el = document.createElement('div');
        }

        componentDidMount() {
            // The portal element is inserted in the DOM tree after
            // the Modal's children are mounted, meaning that children
            // will be mounted on a detached DOM node. If a child
            // component requires to be attached to the DOM tree
            // immediately when mounted, for example to measure a
            // DOM node, or uses 'autoFocus' in a descendant, add
            // state to Modal and only render the children when Modal
            // is inserted in the DOM tree.
            modalRoot.appendChild(this.el);
        }

        componentWillUnmount() {
            modalRoot.removeChild(this.el);
        }

        render() {
            return ReactDOM.createPortal(
            this.props.children,
            this.el,
            );
        }
        }

        class Parent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {clicks: 0};
            this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
            // This will fire when the button in Child is clicked,
            // updating Parent's state, even though button
            // is not direct descendant in the DOM.
            this.setState(state => ({
            clicks: state.clicks + 1
            }));
        }

        render() {
            return (
            <div onClick={this.handleClick}>
                <p>Number of clicks: {this.state.clicks}</p>
                <p>
                Open up the browser DevTools
                to observe that the button
                is not a child of the div
                with the onClick handler.
                </p>
                <Modal>
                <Child />
                </Modal>
            </div>
            );
        }
        }

        function Child() {
        // The click event on this button will bubble up to parent,
        // because there is no 'onClick' attribute defined
        return (
            <div className="modal">
            <button>Click</button>
            </div>
        );
        }

        ReactDOM.render(<Parent />, appRoot);

Catching an event bubbling up from a portal in a parent component allows the development of more flexible abstractions that are not inherently reliant on portals. For example, if you render a <Modal /> component, the parent can capture its events regardless of whether it’s implemented using portals.

# Profiler API
The Profiler measures how often a React application renders and what the “cost” of rendering is. Its purpose is to help identify parts of an application that are slow and may benefit from optimizations such as memoization https://reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations.


Note:

Profiling adds some additional overhead, so it is disabled in the production build https://reactjs.org/docs/optimizing-performance.html#use-the-production-build.

To opt into production profiling, React provides a special production build with profiling enabled. Read more about how to use this build at fb.me/react-profiling https://fb.me/react-profiling


Usage
A Profiler can be added anywhere in a React tree to measure the cost of rendering that part of the tree. It requires two props: an id (string) and an onRender callback (function) which React calls any time a component within the tree “commits” an update.

For example, to profile a Navigation component and its descendants:

        render(
            <App>
                <Profiler id="Navigation" onRender={callback}>
                    <Navigation {...props} />
                </Profiler>
                <Main {...props} />
            </App>
        );

Multiple Profiler components can be used to measure different parts of an application:

        render(
            <App>
                <Profiler id="Navigation" onRender={callback}>
                    <Navigation {...props} />
                </Profiler>
                <Profiler id="Main" onRender={callback}>
                    <Main {...props} />
                </Profiler>
            </App>
        );

Profiler components can also be nested to measure different components within the same subtree.

    Note

    Although Profiler is a light-weight component, it should be used only when necessary; each use adds some CPU and memory overhead to an application.

## onRender Callback
The Profiler requires an onRender function as a prop. React calls this function any time a component within the profiled tree “commits” an update. It receives parameters describing what was rendered and how long it took.

        function onRenderCallback(
            id, // the "id" prop of the Profiler tree that has just committed
            phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
            actualDuration, // time spent rendering the committed update
            baseDuration, // estimated time to render the entire subtree without memoization
            startTime, // when React began rendering this update
            commitTime, // when React committed this update
            interactions // the Set of interactions belonging to this update
        ) {
            // Aggregate or log render timings...
        }

Let’s take a closer look at each of the props:

 - id: string - The id prop of the Profiler tree that has just committed. This can be used to identify which part of the tree was committed if you are using multiple profilers.
 - phase: "mount" | "update" - Identifies whether the tree has just been mounted for the first time or re-rendered due to a change in props, state, or hooks.
 - actualDuration: number - Time spent rendering the Profiler and its descendants for the current update. This indicates how well the subtree makes use of memoization (e.g. React.memo, useMemo, shouldComponentUpdate). Ideally this value should decrease significantly after the initial mount as many of the descendants will only need to re-render if their specific props change.
 - baseDuration: number - Duration of the most recent render time for each individual component within the Profiler tree. This value estimates a worst-case cost of rendering (e.g. the initial mount or a tree with no memoization).
 - startTime: number - Timestamp when React began rendering the current update.
 - commitTime: number - Timestamp when React committed the current update. This value is shared between all profilers in a commit, enabling them to be grouped if desirable.
 - interactions: Set - Set of “interactions” that were being traced the update was scheduled (e.g. when render or setState were called).


    Note

    Interactions can be used to identify the cause of an update, although the API for tracing them is still experimental.

    Learn more about it at fb.me/react-interaction-tracing