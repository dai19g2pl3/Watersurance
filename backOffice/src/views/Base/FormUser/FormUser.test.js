import React from 'react';
import ReactDOM from 'react-dom';
import FormUser from './FormUser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});
