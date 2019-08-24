import { RemoveFromStorage } from "../web_modules/hyperapp-fx.js";
import { html } from "./html.js";
import {Redirect} from "./Redirect.js"

const Logout = state => {
  return [
    { ...state, token: "", loggedInUser: "" },
    [
        RemoveFromStorage({ key: "hyperapp:user" }),
        Redirect({url: "/login"})
    ]
  ];
};

const loggedInUserView = name => html`
  <p class="navbar-text navbar-right">
    User logged in: ${name}
    <button onclick=${Logout} class="btn btn-secondary">Logout</button> 
  </p>
`;

const layout = state => html`
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/">Todos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
        </li>
      </ul>
      ${state.loggedInUser ? loggedInUserView(state.loggedInUser) : ""}
    </div>
  </nav>
`;

export const withLayout = page => state => html`
  <div>
    ${layout(state)} ${page(state)}
  </div>
`;
