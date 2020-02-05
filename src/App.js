import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout'
import {createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import rootReducer from './redux/rootReducer'

const middleware = store => next => action => {
    const result = next(action)
    console.log('Middleware', store.getState())
    return result
}

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(middleware)
));

const layout = (
    <Provider store={store}>
        <Layout/>
    </Provider>
)

class App extends Component{

  render() {
      return layout
  }
}

export default App;
