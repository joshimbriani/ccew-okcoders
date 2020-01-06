Component Lifecycle
===================

You might be asking now about how we can detect when the component gets created. Putting important things in the constructor is not enough since when the constructor is called there's no guarantee that the item has finished rendering or is even fully loaded yet! Instead we use component lifecycle methods to know when it is a safe time to do some setup or tear down code.

componentDidMount
=================

This is the function you'll be using the most. This is the function that will be called when the component is done being created and is ready to display. Generally speaking, if you need to make any network calls they will go in here. 

```
componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

componentWillUnmount
====================

Just like it sounds like. This is the method that gets called whenever your component is being destroyed (aka usually when you navigate away from a page) This lifecycle method is perfect if you need to do any cleanup.

```
componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

componentDidUpdate
==================

This is a little trickier. This function gets called whenever the props to your component or your state change. Use this method when you want to listen for a certain prop being a certain value and do something accordingly. Be careful though because if you update state here, it will call the mehiod. You need to make sure you have some protection from an infinite loop!

```
componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```