import {app} from "./web_modules/hyperapp.js";
import {withLayout} from "./shared/layout.js";
import {ReadUserFromStorage} from "./shared/user.js";
import {todoList} from "./todos/templates.js"

const state = {
  currentTodo: {
    name: "",
    description: "",
    status: ""
  },
  todos: []
};

app({
  init: () => [state, [ReadUserFromStorage]],
  view: withLayout(todoList),
  node: document.getElementById("app")
});
