# Hooks
_Hooks_ are a new addition in React 16.8. They let you use state and other React features without writing a class.

    
    import React, { useState } from 'react';
    
    function Example() {
      // Declare a new state variable, which we'll call "count"
      const [count, setCount] = useState(0);
    
      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      );
    }
    
    

> **Note**
> 
> React 16.8.0 is the first release to support Hooks. When upgrading,
> don’t forget to update all packages, including React DOM. React Native
> supports Hooks since  [the 0.59 release of React
> Native](https://facebook.github.io/react-native/blog/2019/03/12/releasing-react-native-059).



