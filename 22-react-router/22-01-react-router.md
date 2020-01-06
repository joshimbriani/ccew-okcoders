React Router
============

The final library we're going to talk about is React Router. This is the library that handles client side routing. It's definitely different than routing in Express so let's talk about it!

References
----------

[React Router](https://reacttraining.com/react-router/web/guides/philosophy)

Philosophy
----------

Express routing is static. You declare is once and then it can never change. You cna build in plenty of paramters and wildcards to handle any new data but once you declare the routes you can't add another once without redeploying the application.

React Router instead uses dynamic routes. What does that mean? It means that Routes are just tags and you can use them just like you use other components in React.

Basic setup
-----------

After you `npm install --save react-router`, all you need to do to add React router to your project is to import `import { BrowserRouter } from 'react-router-dom'` in your root component file and wrap your root component in `<BrowserRouter></BrowserRouter>` just like we did for Redux.

Now the most basic usage of React Router is to have a root component that's entire job is to render different components based on the Browser Route, like so:

```
import {
  Route,
  Link
} from 'react-router-dom'

const BasicExample = () => (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
)
```

So this component will render the appropriate component when each URL is hit.

Paramters look the same in React-Router except you access them via props.match.params.paramterName

Redirecting
-----------

Another important concept in React Router is redirecting. This is handled with the Redirect component. In order to redirect, you need to return this component in your render method. Generally speaking, a redirect will look something like:

```
render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}
```
