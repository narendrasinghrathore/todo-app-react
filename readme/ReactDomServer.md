# ReactDOMServer

The  `ReactDOMServer`  object enables you to render components to static markup. Typically, it’s used on a Node server:

```
// ES modules
import ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## [Overview](https://reactjs.org/docs/react-dom-server.html#overview)

The following methods can be used in both the server and browser environments:

-   [`renderToString()`](https://reactjs.org/docs/react-dom-server.html#rendertostring)
-   [`renderToStaticMarkup()`](https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup)

These additional methods depend on a package (`stream`) that is  **only available on the server**, and won’t work in the browser.

-   [`renderToNodeStream()`](https://reactjs.org/docs/react-dom-server.html#rendertonodestream)
-   [`renderToStaticNodeStream()`](https://reactjs.org/docs/react-dom-server.html#rendertostaticnodestream)

----------

## [Reference](https://reactjs.org/docs/react-dom-server.html#reference)

### [`renderToString()`](https://reactjs.org/docs/react-dom-server.html#rendertostring)

```
ReactDOMServer.renderToString(element)
```

Render a React element to its initial HTML. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call  [`ReactDOM.hydrate()`](https://reactjs.org/docs/react-dom.html#hydrate)  on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

----------

### [`renderToStaticMarkup()`](https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup)

```
ReactDOMServer.renderToStaticMarkup(element)
```

Similar to  [`renderToString`](https://reactjs.org/docs/react-dom-server.html#rendertostring), except this doesn’t create extra DOM attributes that React uses internally, such as  `data-reactroot`. This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save some bytes.

If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use  [`renderToString`](https://reactjs.org/docs/react-dom-server.html#rendertostring)  on the server and  [`ReactDOM.hydrate()`](https://reactjs.org/docs/react-dom.html#hydrate)  on the client.

----------

### [`renderToNodeStream()`](https://reactjs.org/docs/react-dom-server.html#rendertonodestream)

```
ReactDOMServer.renderToNodeStream(element)
```

Render a React element to its initial HTML. Returns a  [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams)  that outputs an HTML string. The HTML output by this stream is exactly equal to what  [`ReactDOMServer.renderToString`](https://reactjs.org/docs/react-dom-server.html#rendertostring)  would return. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call  [`ReactDOM.hydrate()`](https://reactjs.org/docs/react-dom.html#hydrate)  on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note:
> 
> Server-only. This API is not available in the browser.
> 
> The stream returned from this method will return a byte stream encoded in utf-8. If you need a stream in another encoding, take a look at a project like  [iconv-lite](https://www.npmjs.com/package/iconv-lite), which provides transform streams for transcoding text.

----------

### [`renderToStaticNodeStream()`](https://reactjs.org/docs/react-dom-server.html#rendertostaticnodestream)

```
ReactDOMServer.renderToStaticNodeStream(element)
```

Similar to  [`renderToNodeStream`](https://reactjs.org/docs/react-dom-server.html#rendertonodestream), except this doesn’t create extra DOM attributes that React uses internally, such as  `data-reactroot`. This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save some bytes.

The HTML output by this stream is exactly equal to what  [`ReactDOMServer.renderToStaticMarkup`](https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup)  would return.

If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use  [`renderToNodeStream`](https://reactjs.org/docs/react-dom-server.html#rendertonodestream)  on the server and  [`ReactDOM.hydrate()`](https://reactjs.org/docs/react-dom.html#hydrate)  on the client.

> Note:
> 
> Server-only. This API is not available in the browser.
> 
> The stream returned from this method will return a byte stream encoded in utf-8. If you need a stream in another encoding, take a look at a project like  [iconv-lite](https://www.npmjs.com/package/iconv-lite), which provides transform streams for transcoding text.