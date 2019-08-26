import { app } from "./web_modules/hyperapp.js";
import { withLayout } from "./shared/layout.js";
import { ReadUserFromStorage } from "./shared/user.js";
import { todoPage } from "./todos/page.js";
import {LoadTodosFx} from './todos/app.js';

const state = {
  currentTodo: {
    name: "",
    description: "",
    status: ""
  },
  todos: []
};

app({
  init: () => [state, [ReadUserFromStorage, LoadTodosFx]],
  view: withLayout(todoPage),
  node: document.getElementById("app")
});
