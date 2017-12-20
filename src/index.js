import React from 'react';
import ReactDOM from 'react-dom';

import { init } from './auth';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

init().then(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
});
