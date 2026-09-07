import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import store from "./Store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3500,
          }}
        />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
