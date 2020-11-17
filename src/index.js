import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'store/store';
import { AppRouter } from 'utils/routes';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} />
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
