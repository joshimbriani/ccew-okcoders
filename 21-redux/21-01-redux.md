Redux
=====

So now that we've gone over React proper, let's talk about some other libraries you'll probably want to have. The first of these is Redux

The problem
===========

So now that you know how state works in React you may see that in complex applications the flow of state->props can get kind of ugly. Let's imagine that we have some piece of data (say a user) that we want the entire application to access. Imagine our application is also a massive one with tons of features and a huge tree (if you think about it like an HTML tree). So what if the leaf at the bottom right and the bottom left of the tree both want access to the user? Well, like we've learned, the top level component needs to be the one to control the state (like our Board vs Square example) so instead we need to pass the state as well as a function to modify that state all the way from the top. That's pretty ugly, especially considering in our hypothetical our tree is large which means we're passing it down a lot.

The solution
============

Redux! Redux is a global state store that behaves similarly to React in that it is also immutable. After you set up a Redux store, you'll be able to read and write to your store from any component.

Installing Redux
================

You already know! `npm install --save redux` But in this case we also want to add a helper library to our package.json. Go ahead and install `npm install --save react-redux`. This contains bindings that binds redux to react. And lets add `npm install --save redux-persist`. This will actually save our state from page load to page load.

Concepts in Redux
=================

Actions
-------

Actions are how you will communicate with your Redux store. You should set up actions for every modification that you can think of. These are functions that you will dispatch that always contain some sort of action identifier (usually a string describing what the action will do) and then any other optional payloads. Actions are usually used for saving some item to the state, clearing the state entirely or removing one item from the state.

For example
```
import * as types from './actionTypes';

export function saveUser(user) {
    return {
        type: types.SAVE_USER,
        user: user
    };
}

export function purgeUser() {
    return {
        type: types.PURGE_USER
    }
}
```

So as you can see, actions are really just objects with a type and any number of optional extra pieces. These extra pieces will be the thing you want to save or the thing you want to delete

Action Types
------------

It's usually best practice to separate out the types for actions into another file. Your action types file might look like:

```
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const PURGE_TOKEN = 'PURGE_TOKEN';

export const SAVE_USER = 'SAVE_USER';
export const PURGE_USER = 'PURGE_USER';
```

Reducer
-------

A reducer in React is just a state machine that writes to memory. Reducer is the piece of code that listens to incoming actions and process them accordingly. So you might be underwhelmed since a reducer is just a big switch case but it's where the magic happens! Let's take a look at one!

```
import initialState from './initialState';
import { SAVE_USER, PURGE_USER } from '../actions/actionTypes';

export default function tokenReducer(state = initialState.user, action) {
    let newState;
    switch (action.type) {
        case SAVE_USER:
            newState = {user: action.user};
            return newState;
        case PURGE_USER:
            return initialState.user;
        default:
            return state;
    }
}
```

Default State
-------------

If your default state for a reducer is at all complicated, it's best to split it out into its own file. That might look like the below:

```
export default {
    token: {
        token: '',
    },
    user: {
        user: {}
    }
}
```

Tutorial
========

So now that we've learned about Redux, let's put it into practice by applying it to our trusty tic tac toe game!

7. Initial setup and file creation

So let's layout our file structure! Generally, it's good practice to separate your redux components from your main application. So create a folder named redux inside of the src folder. Then create folders named actions, reducers and store inside your redux folder. The first two we've explained already and the store folder will just contain the file that will glue together our components.

So now that we have our folder structure set up, let's figure out what actions we want. So let's say that we want our redux store to keep track of board state so that we can eventually save it from refresh to refresh. So we want a boardReducer.js in the reducers folder, a boardActions.js in the actions folder as well as actionTypes.js in the actions folder, initialState.js in the reducers folder, rootReducer.js in the reducers folder and configureStore.js in the store folder.

There you go! Those files might be empty but you have your structure set up!

8. Setting up actions

So let's start with our actions. This will define how we want to interact with the store. In our case we probably want two activities, save board and clear board. So let's first define our type identifiers in actionTypes.js

```
export const SAVE_BOARD = 'SAVE_BOARD';
export const PURGE_BOARD = 'PURGE_BOARD';
```

so now we can define our actions file in boardActions.js

```
import * as types from './actionTypes';

export function saveBoard(board) {
    return {
        type: types.SAVE_BOARD,
        board: board
    };
}

export function purgeBoard() {
    return {
        type: types.PURGE_BOARD
    }
}
```

9. Setting up the reducer

So now that we have our actions set up, let's go ahead and set up the reducer. When you're using Redux also make sure to take time and think about what you want your default state to be. In our case, we want it to be an empty board, so add the following to initialState.js

```
export default {
    board: {
        board: [null, null, null, null, null, null, null, null, null],
    }
}
```

And now we can define our reducer in boardReducer.js

```
import initialState from './initialState';
import { SAVE_BOARD, PURGE_BOARD } from '../actions/actionTypes';

export default function boardReducer(state = initialState.board, action) {
    let newState;
    switch (action.type) {
        case SAVE_BOARD:
            newState = {board: action.board};
            return newState;
        case PURGE_BOARD:
            return initialState.board;
        default:
            return state;
    }
}
```

Now go ahead and add the following to your rootReducers. RootReducers combines any number of reducers you have. In our case, it's just one but it's good practice to put this here so that it's easy to expand later!

```
import { combineReducers } from 'redux';
import boardReducer from './boardReducer';

const rootReducer = combineReducers({
    boardReducer,
})

export default rootReducer;
```

And now we can glue it all together in our configureStore.js. The persist lines are setting up the redux persist library so that our state gets saved into browser memory so that we can access it from page load to page load:

```
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from '../reducers/rootReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage,
}

const pReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    pReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export const persistor = persistStore(store)
```

10. Adding in Redux to our application

So now that we have our Redux all set up how do we add it to our app that we currently have?

So first, in order to use Redux, we need to wrap our root application tag (ours currently is index) in a couple of tags. So let's do that!

Add the following imports to the top of index.js

```
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './redux/store/configureStore';
```

This is importing our redux components that we need. Now wrap the Game component in render with the following tags:

```
<Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
```

Cool! Now that's all set up! So how do we actually use the state? Well first let's take a second to think about where it should be used? Instead of initially setting the board to an empty one in our board constructor, instead we need to set it equal to whatever Redux tells us the board state is. In order to do that, we need to "connect" Board. Connecting a component gives it access to redux. There are a few methods you need to connect a component: `mapStateToProps` and `mapDispatchToProps`. In mapState, redux reducers appear as attributes of the state object. We map those objects to props on our components, which is how we access them. Map Dispatch allows us to give dispatch (how Redux sends actions to the reducer) to our actions. Whenever we need an action, we must include it in this function. So now let's add these to our Board. After we define board, add the following lines (as well as this import at the top):

```
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as boardActions from './redux/actions/boardActions';

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        boardActions: bindActionCreators(boardActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardComponent); <-- Notice that we rename our Board Component
```

And now we can set our board to be equal to `props.board` when declare our initial state.

All good now? Well try reloading the page after you make some moves? It's not working, is it? Well that makes sense if you think about it because we're never actually modifying the Redux state, only the local state. So let's do that! Add the following line to handleClick: `this.props.boardActions.saveBoard(squares);`

So now we have a working app! I leave the following challenge to you: add another key to your board reducer that keeps track of whos turn it is so that persists on reload too!