import { ReadFromStorage } from "../web_modules/hyperapp-fx.js";

export const SetUser = (state, { value }) => ({ ...state, ...value });

export const ReadUserFromStorage = ReadFromStorage({
  key: "hyperapp:user",
  action: SetUser
});
