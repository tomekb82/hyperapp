import {app, h} from "./web_modules/hyperapp.js";
import htm from "./web_modules/htm.js";

export const html = htm.bind(h);
const state = {
    currentTodo: "",
    todos: [{name: "clean room", description: "clean my room today", status: "undone"}]
};

const todoItem = todo => html`
    <tr>
        <td>${todo.name}</td>
        <td>${todo.description}</td>
        <td>${todo.status}</td>
    </tr>
`;

const todoList = ({todos}) => html`
<table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
     ${todos.map(todoItem)}
    </tbody>
  </table>
`;

app({
    init: () => [state],
    view: todoList,
    node: document.getElementById("app")
});
