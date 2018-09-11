React & React Components
================

So now that we've hyped React up, what is React and what can it do?

React is a client side Javascript framework. We've worked on server side Javscript up to this point, Express and Node. React allows you to build powerful client side applications. We've talked pretty extensively in the past how HTTP is stateless. From request to request, your server shouldn't persist any configuraiotn or state outside of your database. There have been plenty of hacks to get around this including cookies and flash messages but they're jsut that, hacks. React adds a layer on top of a traditional web page that provides persistent state.

Imagine this: you're creating a dashboard and have built some really powerful visualization tools. With that, you include some filters that allow users to filter data based on any number of attributes including date, users etc. Without a client side Javascript framework, every time your user changed the filter, you'd have to load the entire page from the server again. Caching does help speed this up but still, that's a lot of data transfer. React and otehr client side frameworks can make it so that we only need to reload the data that's changing. 

React cretes what's called "Single Page Applciations", in that the browser only requests the page from the server once. From that point your web page is a Javascript application that can operate independently from the server.

React uses a language called JSX to render HTML. Don't worry it's pretty much indistinguishable from HTML. Only three things you need to remember: you must only have one component at the top level and instead of class, use className and instead of dashes use camelCase instead.

Why React?
==========

So there are plenty of other client side frameworks including Backbone.js, Ember.js, Angular.js and Vue.js. So why do we choose React? Couple of reasons:

1. Easy Learning Curve

The API for React is pretty simple and piggybacks on the HTML syntax you already know! Once you wrap your head around the concept of state and props, then you pretty much know React!

2. Powerful State Management

State is one of the major benefits for using a client side framework. If your framework has a difficult concept of state management, it will make it a pain to use. Using Redux, which we'll talk about later, state management in React is really easy and intuitive.

3. Immutability

State can be either immutable or mutable. If a state is mutable, it means that individual properties can be changed. This is simpler probably but it's not as powerful as immutable state. Why?

- Keep track of past state.
- Easy to detect changes
- When to re-render

4. Community Support

React is a hugely popular library with tons of libraries. If you ever have a need, just Google for it and in most cases, someone has written a React library you can use!

Including React
===============

React is really easy to include! You only need to add a few thigns to an existing project to enable React.

1. Add a container

React needs to have a div with a unique ID so it knows where to attach to. So something like this!

`<div id="container"></div>`

You wnat this div to be empty because that's where React will put its content in.

2. Add the React and React-DOM libraries

We include these the same exact way we include any Javascript code into HTML, with the script tag. You also want to include a script tag to some cutom JAvscript file that contains your custom code you want to run.

```
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="app.js"></script>
```

3. Include some code into your app.js to load your starter component into the app

```
const domContainer = document.querySelector('#container');
ReactDOM.render(App, domContainer);
```

where App is your React component that you import

Components in React
===================

Components are the basic building block of your React applications. Components are basically just custom HTML elements that have some special properties. Lets talk about the most important parts of components: render, state and props.

We'll explore this by looking at an example of a component.

```
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => ...}
          />
        </div>
        <div className="game-info">
          <div>{...}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
```

Render
======

Every component should have a render method. This is the portion of the component that actually returns HTML that will get output in the page. Render doesn't take any parameters but it must return either null or some JSX expression. That JSX expression can contain any HTML element or any React element as long as you import it!

State
=====

State is some memory that each component persists. This is hugely useful in most applications. In our example in a minute, we'll be building a tic tac toe game. An easy way to architect this in a React-ful way is to make each square use its own memory to keep track of whether it's an X or O. State should be declared in the constructor.

In order to access state you call `this.state.property`. Setting state is a little trickier. Since our state is immutable, we can't just say `this.state.property = "value"` like seems intuitive. Instead we use `this.setState({property: "value"})`. This is a method that React gives us that will merge the two objects together and then set state to be that value.

Props
=====

So now that we know that we can include React components in other React components, can those components communicate with eachother? Absolutely! They do this with props. When you invoke another React component you write it like an HTML tag `<Component prop1={"Test"} />`. Just like an HTML tag you can pass in any number of properties. You access this in the component as `this.props.prop1`.

Tutorial
========

Go ahead and clone this repo https://github.com/joshimbriani/ccew-react-demo

1. We'll inspect the code and notice the same patterns that we just learned about.

2. Let's get some numbers!

So to start, let's make each square show the number square that it is. So in order to do this, we can just pass the value of our counter to our square and then include that value in our render.

So change Board's renderSquare to `return <Square value={i} />;` and replace `{/* TODO */}` with `{this.props.value}`

3. Add some behavior to our component

In order to react to a click event, we just need to add the onClick method to any component. So let's do that!

Add `onClick={function() { alert('click'); }}` to the render method in Square. It will give an alert right away. Why is that? Because if we pass a naked function to onClick it will run at page render. We need to wrap it in an anonymous function instead.

So actually change it to `onClick={() => alert('click')}`. Now if you click on a square it should give you an alert in your browser!

Now we want each square to remember whoc clicked it. We do this with state. So we need to add a constructor in order to initially define state.

Add 
```
constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
```

to your square. Now each square can keep track of who it was clicked by.

So now we just ned to show that! Replace `this.props.value` with `this.state.value` in Square, change your onClick to setState the value ot 'X' (for now) (`() => this.setState({value: 'X'})`)

4. Break state out

So how would we check a winner now? Each Square contains a piece of state but we need the whole picture. It's not reasonable to have your top level component ask each subcomponent what their state is so instead we just keep track of the state up top and pass down via props the value!

So we need to add some state to our Board component:

```
constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }
```

and instead of passing the value of out counter variable, instead we want to pass the value at that this.state.squares

So in the renderSquare function, change `value={i}` to `value={this.state.squares[i]}`

But how will we update the parent's state from the child? If we pass a function as a prop to a child component, it will execute in the parent's context. So let's do that!

Add an onClick prop to Square in the renderSquare function `onClick={() => this.handleClick(i)}`

Now change Square to replace `this.state.value` with `this.props.value` and change the setState call to `this.props.onClick()`

Now let's add that handleClick function we talked about to Board!

```
handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }
```

5. Taking Turns

So now how are we going to keep track of who's turn it is? With state of course! Let's add a state element to Board's constructor. `xIsNext: true,`

So now obviously every time there is a click, we just need to change the player. We do this in the handle Click method. We need to do two things: figure out whether to add an X or an O and actually set the state to that. So add `squares[i] = this.state.xIsNext ? 'X' : 'O';` to your handleClick method and set the user in the handleClick setState by adding the following line `xIsNext: !this.state.xIsNext,`

And let's not forget to update who's turn it is! Change the status in Board's render to the following `'Next player: ' + (this.state.xIsNext ? 'X' : 'O');`

6. Figuring out a winner

So now that all our state is in one place we can declare a winner!

We need to add this helper function to the end of our file outside of any component:

```
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

Now we can call this helper function in Board's render to check for a winner every time our state changes (aka someone moved)

```
const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
```

So now let's just add one real quick piece of helper code. Right now, if we click on a square that someone already has, it will overwrite their choice. We don't want that! So let's check for a value and if someone has won before we set a square!

Add 
```
if (calculateWinner(squares) || squares[i]) {
      return;
    }
```
to handleClick

Now check it out! You have a successful Tic Tac Toe game!