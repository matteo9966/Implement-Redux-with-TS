type state<S> = S;
type action<T> = { type: string; payload?: T };
type reducer<S, A> = (store: state<S>, action: action<A>) => state<S>;

export function createStore<S, A>(reducerFn: reducer<S, A>) {
  const listeners = [];

  const currentState = reducerFn(undefined, undefined);

  const store = {
    addListener(listener: Function) {
      listeners.push(listener);
    }
  };
  return store;
}

type stateType = { count: number };

const actions = {
  increment: { type: "increment" },
  decrement: { type: "decrement" },
  addValue: { type: "addvalue" }
};

function myReducer(state: stateType = { count: 0 }, action: action<number>) {
  switch (action.type) {
    case actions.increment.type: {
      return { count: state.count + 1 };
    }
    case actions.decrement.type: {
      return { count: state.count - 1 };
    }
    case actions.addValue.type: {
      return { count: state.count + action.payload };
    }
    default:
      return state;
  }
}

const store = createStore<stateType, number>(myReducer);
