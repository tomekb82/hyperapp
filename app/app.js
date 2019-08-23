import { app, h } from "./web_modules/hyperapp.js";
import htm from "./web_modules/htm.js";

export const html = htm.bind(h);
const state = {
  currentTodo: {
    name: "",
    description: "",
    status: ""
  },
  todos: [
    { name: "clean room", description: "clean my room today", status: "undone" }
  ]
};

const todoItem = todo => html`
  <tr>
    <td>${todo.name}</td>
    <td>${todo.description}</td>
    <td>${todo.status}</td>
  </tr>
`;

const SaveTodo = todo => {
  console.log(todo);
};

export const AddTodo = state => {
  if (
    state.currentTodo.name.trim() &&
    state.currentTodo.description.trim() &&
    state.currentTodo.status.trim()
  ) {
    const newState = { ...state, todos: [state.currentTodo, ...state.todos] };
    return [newState, SaveTodo(state.currentTodo)];
  } else {
    return state;
  }
};

function targetValue(event) {
  return event.target.value;
}

export const UpdateTodoName = (state, name) => ({
  ...state,
  currentTodo: { ...state.currentTodo, name }
});
export const UpdateTodoDescription = (state, description) => ({
  ...state,
  currentTodo: { ...state.currentTodo, description }
});
export const UpdateTodoStatus = (state, status) => ({
  ...state,
  currentTodo: { ...state.currentTodo, status }
});

const todoForm = html`
<form>
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input
            id="name"
            oninput=${[UpdateTodoName, targetValue]}
            class="form-control"
            autofocus
            value=${state.currentTodo.name}
          />
        </div>
        <label for="desc" class="col-sm-2 col-form-label">Description</label>
        <div class="col-sm-10">
          <input
            id="desc"
            oninput=${[UpdateTodoDescription, targetValue]}
            class="form-control"
            value=${state.currentTodo.description}
          />
        </div>
        <label for="status" class="col-sm-2 col-form-label">Status</label>
        <div class="col-sm-10">
          <input
            id="status"
            oninput=${[UpdateTodoStatus, targetValue]}
            class="form-control"
            value=${state.currentTodo.status}
          />
        </div>
        <button onclick=${AddTodo} class="btn btn-primary">Add Todo</button>
      </div>
    </form>
`;

const todoList = state => html`
  <div class="container">
    ${todoForm}
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${state.todos.map(todoItem)}
      </tbody>
    </table>
  </div>
`;

app({
  init: () => [state],
  view: todoList,
  node: document.getElementById("app")
});
