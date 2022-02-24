import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { clientCtx, getSavedClient } from "./features/client/client";

ReactDOM.render(
  <React.StrictMode>
    <clientCtx.Provider value={getSavedClient()}>
      <Provider store={store}>
        <App />
      </Provider>
    </clientCtx.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
