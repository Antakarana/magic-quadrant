import React from "react";
import { Home } from "./pages/index";
import { Provider } from "react-redux";

import { createStore } from "redux";
import rootReducer from "./redux/reducer";

const App: React.FC = () => {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export { App };
