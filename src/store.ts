type state<S> = S;
type action<T> = { type: string; payload?: T };
// type reducer<S, A> = (store: state<S>, action: action<A>) => state<S>;
type reducerFunction<S, A> = (store: state<S>, action: action<A>) => state<S>;

export function createStore<S extends any, A>(
  reducerFn: reducerFunction<S, A>
) {
  const listeners: Function[] = [];
  let currentState = reducerFn({} as S, { type: "" });

  const store = {
    addListener(listener: Function) {
      listeners.push(listener);
      //implement unsubscribe
    },
    dispatch(action: action<A>) {
      currentState = reducerFn(currentState, action);
      listeners.forEach((listener) => listener()); //update listeners
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

const myReducer = (state: stateType = { count: 0 }, action: action<number>) => {
  switch (action.type) {
    case actions.increment.type: {
      return { count: state.count + 1 };
    }
    case actions.decrement.type: {
      return { count: state.count - 1 };
    }
    case actions.addValue.type: {
      return { count: state.count + (action?.payload || 0) };
    }
    default:
      return state;
  }
};

export const store = createStore<stateType, number>(myReducer);
