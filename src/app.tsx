import React from "react";
import { Home } from "./pages/index";
import { Provider } from "react-redux";
import store from "./redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export { App };
