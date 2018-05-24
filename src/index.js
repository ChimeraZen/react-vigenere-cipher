import React from 'react';
import ReactDOM from 'react-dom';
import VigenereCipher from './VigenereCipher';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<VigenereCipher />, document.querySelector('#app'));
registerServiceWorker();
