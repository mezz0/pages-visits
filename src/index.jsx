import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ScrollToTop from './components/scrollToTop';
import { homepage } from '../package.json';
import { parse } from 'url';

// IE classList polyfill
if ('classList' in HTMLElement.prototype && !('classList' in Element.prototype)) {
  const desc = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList');
  Object.defineProperty(Element.prototype, 'classList', desc);
}

const basename = parse(homepage).pathname;

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrate(
    <Router basename={basename}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>,
    rootElement
  );
} else {
  render(
    <Router basename={basename}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>,
    rootElement
  );
}
