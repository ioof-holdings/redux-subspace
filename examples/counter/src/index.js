import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { subspace } from "redux-subspace";
import Counter from "./components/Counter";
import reducer from "./reducers";

const store = createStore(reducer);
const rootEl = document.getElementById("root");

const counter1Store = subspace(state => state.counter1, "counter1")(store);
const counter2Store = subspace(state => state.counter2, "counter2")(store);

const render = () => {
  ReactDOM.render(
    <div>
      <Counter
        value={counter1Store.getState()}
        onIncrement={() => counter1Store.dispatch({ type: "INCREMENT" })}
        onDecrement={() => counter1Store.dispatch({ type: "DECREMENT" })}
      />
      <Counter
        value={counter2Store.getState()}
        onIncrement={() => counter2Store.dispatch({ type: "INCREMENT" })}
        onDecrement={() => counter2Store.dispatch({ type: "DECREMENT" })}
      />
    </div>,
    rootEl
  );
};
render();
store.subscribe(render);
