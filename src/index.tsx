import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

// Uygulamayı Redux Provider ile sarıyoruz ve store'u sağlıyoruz
ReactDOM.render(
  <Provider store={store}>
    <MantineProvider>
      <App />
    </MantineProvider>
  </Provider>,
  document.getElementById("root")
);
