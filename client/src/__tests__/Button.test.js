import React from 'react';
import { mount } from 'enzyme';
import Button from '../components/helpers/Button';

describe('The <Button /> component', () => {
  it('renders as expected', () => {
    const testText = 'Button Testing';
    const component = mount(<Button>{testText}</Button>);
    expect(component.text()).toBe(testText);
  });
});
