import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {createStore,applyMiddleware,compose} from "redux";
import rootReducer from "./store/reducer/root_reducer";
import {watch} from "./store/saga/root_saga";
import createSagaMiddleware from "redux-saga";
import {HashRouter} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watch);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <CssBaseline />
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);