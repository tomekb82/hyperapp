import { app } from "./web_modules/hyperapp.js";
import { targetValue, preventDefault } from "./shared/events.js";
import { withLayout } from "./shared/layout.js";
import { html } from "./shared/html.js";
import { ReadUserFromStorage } from "./shared/user.js";
import { ReadFromStorage, WriteToStorage } from "./web_modules/hyperapp-fx.js";

const state = {
  currentTodo: {
    name: "",
    description: "",
    status: ""
  },
  todos: []
};

const todoItem = todo => html`
  <tr>
    <td>${todo.name}</td>
    <td>${todo.description}</td>
    <td>${todo.status}</td>
  </tr>
`;

export const AddTodo = state => {
  if (
    state.currentTodo.name.trim() &&
    state.currentTodo.description.trim() &&
    state.currentTodo.status
  ) {
    const newState = { ...state, todos: [state.currentTodo, ...state.todos] };
    return [
      newState,
      WriteToStorage({
        key: "hyperapp:user",
        value: newState
      })
    ];
  } else {
    return state;
  }
};

export const UpdateTodoName = (state, name) => ({
  ...state,
  currentTodo: { ...state.currentTodo, name }
});
export const UpdateTodoDescription = (state, description) => ({
  ...state,
  currentTodo: { ...state.currentTodo, description }
});
export const UpdateTodoStatus = (state, status) => {
  return {
    ...state,
    currentTodo: { ...state.currentTodo, status }
  };
};

const statuses = ["ready", "in_progress", "not_started"];

const todoStatusItem = status => html`
  <option>${status}</option>
`;

const todoForm = html`
  <form>
    <div class="form-group row">
      <label for="name" class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <input
          id="name"
          type="text"
          required
          oninput=${[UpdateTodoName, targetValue]}
          class="form-control"
          autofocus
          value=${state.currentTodo.name}
        />
      </div>
    </div>
    <div class="form-group row">
      <label for="desc" class="col-sm-2 col-form-label">Description</label>
      <div class="col-sm-10">
        <input
          id="desc"
          type="text"
          required
          oninput=${[UpdateTodoDescription, targetValue]}
          class="form-control"
          value=${state.currentTodo.description}
        />
      </div>
    </div>
    <div class="form-group row">
      <label for="status" class="col-sm-2 col-form-label">Example select</label>
      <div class="col-sm-10">
        <select
          class="form-control"
          id="status"
          required
          onchange=${[UpdateTodoStatus, targetValue]}
        >
          <option selected hidden>Choose here</option>
          ${statuses.map(todoStatusItem)}
        </select>
      </div>
      <button onclick=${preventDefault(AddTodo)} class="btn btn-primary">
        Add Todo
      </button>
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
export const SetTodos = (state, { value }) => {
  if (value) {
    return { ...state, todos: [...state.todos, ...value] };
  } else {
    return state;
  }
};

app({
  init: () => [state, [ReadUserFromStorage]],
  view: withLayout(todoList),
  node: document.getElementById("app")
});
