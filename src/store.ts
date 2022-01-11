type state<S> = S;
type action<T> = { type: string; payload?: T };
// type reducer<S, A> = (store: state<S>, action: action<A>) => state<S>;
type reducerFunction<S, A> = (store: state<S>, action: action<A>) => state<S>;

export function createStore<S extends any, A>(
  reducerFn: reducerFunction<S, A>
) {
  const listeners: Function[] = [];
  let currentState = reducerFn({} as S, { type: "" });
  console.log(currentState);

  const store = {
    addListener(listener: Function) {
      listeners.push(listener);
      //implement unsubscribe
    },
    dispatch(action: action<A>) {
      currentState = reducerFn(currentState, action);
      listeners.forEach((listener) => listener()); //update listeners
    },
    getValue() {
      return currentState;
    }
  };
  return store;
}

type stateType = { count: number };

export const actions = {
  increment: { type: "increment" },
  decrement: { type: "decrement" },
  addValue: { type: "addvalue" }
};

const myReducer = (state: stateType, action: action<number>) => {
  if (Object.keys(state).length === 0 && state.constructor === Object) {
    state = { count: 0 };
  }
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
