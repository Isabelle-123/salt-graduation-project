import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/OrderContainer';
import LoginContext from '../context/LoginContext';

describe('The <App /> component', () => {
  it('renders and doesnt crash', () => {
    const component = shallow(
      <LoginContext>
        <App />
      </LoginContext>
    );
    expect(component.length > 0).toBe(true);
  });
});
