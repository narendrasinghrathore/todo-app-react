import React from 'react';
import ReactDOM from 'react-dom';

import Logo from './Logo';

let div = null;

beforeEach(() => {
  div = document.createElement('div');
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(div);
  div = null;
});

describe('Logo Component ###', () => {
  it('renders without crashing', () => {
    ReactDOM.render(<Logo />, div);
  });

  it('should render morning logo in morning', () => {});

  it('should render noon logo in noon', () => {});
  it('should render night logo in night', () => {});
});
