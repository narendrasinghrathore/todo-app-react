# SyntheticEvent

This reference guide documents the  `SyntheticEvent`  wrapper that forms part of React’s Event System. See the  [Handling Events](https://reactjs.org/docs/handling-events.html)  guide to learn more.

## Overview

Your event handlers will be passed instances of  `SyntheticEvent`, a cross-browser wrapper around the browser’s native event. It has the same interface as the browser’s native event, including  `stopPropagation()`  and  `preventDefault()`, except the events work identically across all browsers.

If you find that you need the underlying browser event for some reason, simply use the  `nativeEvent`  attribute to get it. Every  `SyntheticEvent`  object has the following attributes:

```
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```


Note:

As of v0.14, returning  `false`  from an event handler will no longer stop event propagation. Instead,  `e.stopPropagation()`  or  `e.preventDefault()`  should be triggered manually, as appropriate.



### Event Pooling

The  `SyntheticEvent`  is pooled. This means that the  `SyntheticEvent`  object will be reused and all properties will be nullified after the event callback has been invoked. This is for performance reasons. As such, you cannot access the event in an asynchronous way.

```
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}
```


Note:

If you want to access the event properties in an asynchronous way, you should call  `event.persist()`  on the event, which will remove the synthetic event from the pool and allow references to the event to be retained by user code.

## Supported Events

React normalizes events so that they have consistent properties across different browsers.

The event handlers below are triggered by an event in the bubbling phase. To register an event handler for the capture phase, append  `Capture`  to the event name; for example, instead of using  `onClick`, you would use  `onClickCapture`  to handle the click event in the capture phase.

-   [Clipboard Events](https://reactjs.org/docs/events.html#clipboard-events)
-   [Composition Events](https://reactjs.org/docs/events.html#composition-events)
-   [Keyboard Events](https://reactjs.org/docs/events.html#keyboard-events)
-   [Focus Events](https://reactjs.org/docs/events.html#focus-events)
-   [Form Events](https://reactjs.org/docs/events.html#form-events)
-   [Mouse Events](https://reactjs.org/docs/events.html#mouse-events)
-   [Pointer Events](https://reactjs.org/docs/events.html#pointer-events)
-   [Selection Events](https://reactjs.org/docs/events.html#selection-events)
-   [Touch Events](https://reactjs.org/docs/events.html#touch-events)
-   [UI Events](https://reactjs.org/docs/events.html#ui-events)
-   [Wheel Events](https://reactjs.org/docs/events.html#wheel-events)
-   [Media Events](https://reactjs.org/docs/events.html#media-events)
-   [Image Events](https://reactjs.org/docs/events.html#image-events)
-   [Animation Events](https://reactjs.org/docs/events.html#animation-events)
-   [Transition Events](https://reactjs.org/docs/events.html#transition-events)
-   [Other Events](https://reactjs.org/docs/events.html#other-events)
