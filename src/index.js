import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app";
import { setConfiguration } from "react-grid-system";
import { store} from "./reducers";
import { Provider } from "react-redux";
import "./styles.css";

setConfiguration({ maxScreenClass: "xl" });
const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
, rootElement);
  