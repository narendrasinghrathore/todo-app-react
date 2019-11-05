# Optimizing Performance

Internally, React uses several clever techniques to minimize the number of costly DOM operations required to update the UI. For many applications, using React will lead to a fast user interface without doing much work to specifically optimize for performance. Nevertheless, there are several ways you can speed up your React application.

## Use the Production Build
If you’re benchmarking or experiencing performance problems in your React apps, make sure you’re testing with the minified production build.

## Brunch
For the most efficient Brunch production build, install the terser-brunch plugin:

        # If you use npm
        npm install --save-dev terser-brunch

        # If you use Yarn
        yarn add --dev terser-brunch

Then, to create a production build, add the -p flag to the build command:

        brunch build -p

Remember that you only need to do this for production builds. You shouldn’t pass the -p flag or apply this plugin in development, because it will hide useful React warnings and make the builds much slower.

## Browserify
For the most efficient Browserify production build, install a few plugins:

        # If you use npm
        npm install --save-dev envify terser uglifyify 

        # If you use Yarn
        yarn add --dev envify terser uglifyify 

To create a production build, make sure that you add these transforms (the order matters):

The envify transform ensures the right build environment is set. Make it global (-g).
The uglifyify transform removes development imports. Make it global too (-g).
Finally, the resulting bundle is piped to terser for mangling (read why) https://github.com/hughsk/uglifyify#motivationusage.


For example:

        browserify ./index.js \
            -g [ envify --NODE_ENV production ] \
            -g uglifyify \
            | terser --compress --mangle > ./bundle.js

Remember that you only need to do this for production builds. You shouldn’t apply these plugins in development because they will hide useful React warnings, and make the builds much slower.

## Rollup
For the most efficient Rollup production build, install a few plugins:

#### If you use npm
                npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser

#### If you use Yarn
                yarn add --dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser
To create a production build, make sure that you add these plugins (the order matters):

        The replace plugin ensures the right build environment is set.
        The commonjs plugin provides support for CommonJS in Rollup.
        The terser plugin compresses and mangles the final bundle.

                plugins: [
                        // ...
                        require('rollup-plugin-replace')({
                        'process.env.NODE_ENV': JSON.stringify('production')
                        }),
                        require('rollup-plugin-commonjs')(),
                        require('rollup-plugin-terser')(),
                        // ...
                ]

For a complete setup example see this gist https://gist.github.com/Rich-Harris/cb14f4bc0670c47d00d191565be36bf0.

Remember that you only need to do this for production builds. You shouldn’t apply the terser plugin or the replace plugin with 'production' value in development because they will hide useful React warnings, and make the builds much slower.

## webpack

Webpack v4+ will minify your code by default in production mode.

                const TerserPlugin = require('terser-webpack-plugin');

                module.exports = {
                        mode: 'production',
                        optimization: {
                        minimizer: [new TerserPlugin({ /* additional options here */ })],
                        },
                };

https://webpack.js.org/guides/production/
Remember that you only need to do this for production builds. You shouldn’t apply TerserPlugin in development because it will hide useful React warnings, and make the builds much slower.

## Profiling Components with the Chrome Performance Tab
In the development mode, you can visualize how components mount, update, and unmount,using the performance tools in supported browsers.

To do this in Chrome:

Temporarily disable all Chrome extensions, especially React DevTools. They can significantly skew the results!

Make sure you’re running the application in the development mode.

Open the Chrome DevTools Performance tab and press Record.

Perform the actions you want to profile. Don’t record more than 20 seconds or Chrome might hang.

Stop recording.

React events will be grouped under the User Timing label.

Note that the numbers are relative so components will render faster in production. Still, this should help you realize when unrelated UI gets updated by mistake, and how deep and how often your UI updates occur.

Currently Chrome, Edge, and IE are the only browsers supporting this feature, but we use the standard User Timing API https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API so we expect more browsers to add support for it.

https://calibreapp.com/blog/2017-11-28-debugging-react/



## Profiling Components with the DevTools Profiler
react-dom 16.5+ and react-native 0.57+ provide enhanced profiling capabilities in DEV mode with the React DevTools Profiler. An overview of the Profiler can be found in the blog post “Introducing the React Profiler” https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html. A video walkthrough of the profiler is also available on YouTube https://www.youtube.com/watch?v=nySib7ipZdk.


Note

A production profiling bundle of react-dom is also available as react-dom/profiling. Read more about how to use this bundle at fb.me/react-profiling https://fb.me/react-profiling



## Virtualize Long Lists
If your application renders long lists of data (hundreds or thousands of rows), we recommended using a technique known as “windowing”. This technique only renders a small subset of your rows at any given time, and can dramatically reduce the time it takes to re-render the components as well as the number of DOM nodes created.

react-window https://react-window.now.sh/ and react-virtualized https://bvaughn.github.io/react-virtualized/ are popular windowing libraries. They provide several reusable components for displaying lists, grids, and tabular data. You can also create your own windowing component, like Twitter did https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3, if you want something more tailored to your application’s specific use case.

## Avoid Reconciliation
React builds and maintains an internal representation of the rendered UI. It includes the React elements you return from your components. This representation lets React avoid creating DOM nodes and accessing existing ones beyond necessity, as that can be slower than operations on JavaScript objects. Sometimes it is referred to as a “virtual DOM”, but it works the same way on React Native.

When a component’s props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM.

Even though React only updates the changed DOM nodes, re-rendering still takes some time. In many cases it’s not a problem, but if the slowdown is noticeable, you can speed all of this up by overriding the lifecycle function shouldComponentUpdate, which is triggered before the re-rendering process starts. The default implementation of this function returns true, leaving React to perform the update:

                shouldComponentUpdate(nextProps, nextState) {
                        return true;
                }


If you know that in some situations your component doesn’t need to update, you can return false from shouldComponentUpdate instead, to skip the whole rendering process, including calling render() on this component and below.

In most cases, instead of writing shouldComponentUpdate() by hand, you can inherit from React.PureComponent https://reactjs.org/docs/react-api.html#reactpurecomponent. It is equivalent to implementing shouldComponentUpdate() with a shallow comparison of current and previous props and state.


## shouldComponentUpdate In Action
Here’s a subtree of components. For each one, SCU indicates what shouldComponentUpdate returned, and vDOMEq indicates whether the rendered React elements were equivalent. Finally, the circle’s color indicates whether the component had to be reconciled or not.

Please find example, how mutation degrade the performance https://reactjs.org/docs/optimizing-performance.html#examples