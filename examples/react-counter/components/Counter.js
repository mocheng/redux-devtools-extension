import React, { Component, PropTypes } from 'react';
import {createStore, compose} from 'redux';

const withDevTools = (
  // process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' && window.devToolsExtension
);

const reducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { counter: state.counter + 1 };
    case 'DECREMENT':
      return { counter: state.counter - 1 };
    default:
      return state;
  }
};

class Counter extends Component {
  constructor(props) {
    super(props);

    const storeEnhancers = compose(
      (withDevTools) ? withDevTools({name: this.constructor.name}) : f => f,
    );

    this._store = createStore(reducer, {counter: 0}, storeEnhancers);
    this._store.subscribe(() => { this.setState(this._store.getState()); });
    this.state = this._store.getState();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  dispatch(action) {
    this._store.dispatch(action);
  }

  increment() {
    this.dispatch({ type: 'INCREMENT' });
  }

  decrement() {
    this.dispatch({ type: 'DECREMENT' });
  }

  render() {
    const { counter } = this.state;
    return (
      <p>
        Clicked: {counter} times
        {' '}
        <button onClick={this.increment}>+</button>
        {' '}
        <button onClick={this.decrement}>-</button>
      </p>
    );
  }
}

export default Counter;
