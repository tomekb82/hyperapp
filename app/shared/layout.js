import { RemoveFromStorage } from "../web_modules/hyperapp-fx.js";
import { html } from "./html.js";
import { Redirect } from "./Redirect.js";

const Logout = state => {
  return [
    { ...state, token: "", loggedInUser: "" },
    [RemoveFromStorage({ key: "hyperapp:user" }), Redirect({ url: "/login" })]
  ];
};

const loggedInUserView = name => html`
  <form class="form-inline my-2 my-lg-0">
    <p class="navbar-text mr-sm-2">User logged in: ${name}</p>
    <button class="btn btn-secondary my-2 my-sm-0" onclick=${Logout}>Logout</>
  </form>
`;

const layout = state => html`
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <a class="navbar-brand" href="#">Hyperapp</a>
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
