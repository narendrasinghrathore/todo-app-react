
[![Build Status](https://travis-ci.org/narendrasinghrathore/todo-app-react.svg?branch=master)](https://travis-ci.org/narendrasinghrathore/todo-app-react)

## Desktop Performance:

<img  src="https://github.com/narendrasinghrathore/todo-app-react/blob/master/Performance.PNG" />


## Email module:

<img  src="https://github.com/narendrasinghrathore/todo-app-react/blob/master/email-module-2.gif" />


## Music Player module:

<img  src="https://github.com/narendrasinghrathore/todo-app-react/blob/master/music-player-module.gif" />


  

## Mobile View:

<img  src="https://github.com/narendrasinghrathore/todo-app-react/blob/master/Mobile%20device.PNG"/>

## Application covers:

1. Lazy loading components
2. Nested routing
3. Re-Usability of components
4. Stateful and Stateless component architecture
5. Async call using axios
6. Accessibility
7. Best practices
8. Performance
9. Suspense
10. React-Redux
11. Parameter based routing i.e. parameter and query based
12. React hooks i.e. useState and useEffect
13. Function based components using react hooks
14. Intersection Observer API

## Implementations
This section contains the scenario we require and how we achieve them.

1. Dynamic background color in `<Login/>` component, based on color selection from `<ThemeWidget/>` component
2. Snackbar notification using redux-store, `<NotificationSnackbar/>`. We can dispatch action that contains message, auto-hide in millisecond, status to show Snackbar. It can be used to display application related notification i.e success, error, warning etc.
3. If route not match, redirect to `<PageNotFound />` component.
4. Implementation of EMAIL module [here](https://apptodoreact.firebaseapp.com/email). It contains nested routing example using react-router-dom. Uses async call to update emails list in store (i.e. redux state management).
5. Using Intersection Observer API, we have implemented infinite scrolling feature in image module

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.<br>

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
  
### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting
### Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size
### Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
### Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration
### Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
### `npm run build` fails to minify
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
