import { hot } from 'react-hot-loader/root';
import React, { memo } from 'react';
import AppLoad from './UI/AppLoad';
import Layout from './UI/Layout';


const App = () => (
  <AppLoad>
    <Layout />
  </AppLoad>
);

export default hot((memo(App)));
