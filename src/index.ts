import "./styles.css";
import "./style.scss";
import { store, actions } from "./store";

const count = document.getElementById("count");
const buttonAdd = document.getElementById("add-btn")!;
const buttonSub = document.getElementById("sub-btn")!;
const form: HTMLFormElement = document.querySelector("form")!;
const input: HTMLInputElement = form.querySelector("#input-value")!;
count!.innerHTML = store.getValue().count.toString();
buttonAdd.addEventListener("click", () => store.dispatch(actions.increment));
buttonSub.addEventListener("click", () => {
  store.dispatch(actions.decrement);
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  store.dispatch({ type: actions.addValue.type, payload: Number(input.value) });
  input.value = "";
});
function countdisplay(val: number) {
  count!.innerHTML = `<p>${val}</p>`;
}

store.addListener(() => {
  countdisplay(store.getValue().count);
});
