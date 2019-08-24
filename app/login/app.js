import { app } from "../web_modules/hyperapp.js";
import { html } from "../shared/html.js";
import { withLayout } from "../shared/layout.js";
import {WriteToStorage} from "../web_modules/hyperapp-fx.js";
import { targetValue, preventDefault } from "../shared/events.js";
import {Redirect} from "../shared/Redirect.js";
import {guid} from "../shared/guid.js";

const state = {
  user: "",
  passwd: ""
};

const UpdateUser = (state, user) => ({ ...state, user });
const UpdatePasswd = (state, passwd) => ({ ...state, passwd });

const LoginSubmit = state => {
    const user = {token: guid(), loggedInUser: state.user};
    return [{...state, ...user, user: "", passwd: ""}, [
        WriteToStorage({
            key: 'hyperapp:user',
            value: user
        }),
        Redirect({url: "/"})]]
};

const loginPage = state => html`
  <form class="container">
    <div class="form-group">
      <label>Username</label>
      <input
        oninput=${[UpdateUser, targetValue]}
        class="form-control"
        type="text"
        value=${state.user}
      />
    </div>
    <div class="form-group">
      <label>Password</label>
      <input
        oninput=${[UpdatePasswd, targetValue]}
        class="form-control"
        type="password"
        value=${state.passwd}
      />
    </div>
    <input
      class="btn btn-success btn-lg"
      onclick=${preventDefault(LoginSubmit)}
      type="submit"
      value="Login"
    />
  </form>
`;

app({
  init: () => [state],
  view: withLayout(loginPage),
  node: document.getElementById("app")
});
