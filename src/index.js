import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import styles from "./App.module.css";

ReactDOM.render(
  <React.StrictMode>
    <App classname={styles.App} />
  </React.StrictMode>,
  document.getElementById("root")
);
