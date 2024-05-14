import { Provider } from "react-redux";
import { App } from "./app/app";
import TestApp from "./app/TestApp";
import { store } from "./app/store/store";

export default function ExpoApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
