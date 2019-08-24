import { html } from "../shared/html.js";
import { preventDefault, targetValue } from "../shared/events.js";
import { UpdateTodoName, UpdateTodoDescription, UpdateTodoStatus, AddTodo, statuses } from "./app.js";
import {memoized} from "../shared/memoized.js";

const todoItem = todo => html`
  <tr>
    <td>${todo.name}</td>
    <td>${todo.description}</td>
    <td>${todo.status}</td>
  </tr>
`;

const todoStatusItem = status => html`
  <option>${status}</option>
`;

const todoForm = state => html`
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
        <select class="form-control" id="status" onchange=${[UpdateTodoStatus, targetValue]}>
          <option hidden>Choose here</option>
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

export const todoPage = state => html`
         <div class="container">
           ${state.loggedInUser ? todoForm(state) : ""}
           ${todoList(state)}
         </div>
       `;
