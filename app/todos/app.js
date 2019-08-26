import { WriteToStorage, Http } from "../web_modules/hyperapp-fx.js";

export const statuses = ["ready", "in_progress", "not_started"];

export const AddTodo = state => {
  if (state.currentTodo.name.trim() && state.currentTodo.description.trim() && state.currentTodo.status) {
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

export const SetTodos = (state, data) => ({...state, data});

export const LoadTodosFx = Http({
  url: "https://limitless-crag-5779.herokuapp.com/todos",
  options: {
    headers: {
      "Content-Type": "application/json"
    }
  },
  action: SetTodos
});
