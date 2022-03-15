import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// style
import'./index.css'

// redux
import {Provider} from "react-redux";
import {myStore,persistor } from "./redux/store";

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);


