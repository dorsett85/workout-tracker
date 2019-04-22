import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../state/store';
import AppLoad from './UI/AppLoad';
import Layout from './UI/Layout';
import 'assets/css/vendor.css';


const App = () => (
  <Provider store={store}>
    <AppLoad>
      <Layout />
    </AppLoad>
  </Provider>
);

export default hot(App);
