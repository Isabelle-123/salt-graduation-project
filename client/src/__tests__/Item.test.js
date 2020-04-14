import React from 'react';
import { mount } from 'enzyme';
import Item from '../components/order/Item';

const testData = {
  gtin: '5712840020043',
  price: '24.9',
  quantity: 1,
  product: {
    name: 'Rawbite Lime',
    brand: 'Biofood',
    unit: 'Kr/Förp',
    quantity: '50g',
    sku: '5712840020043',
  },
  productPrice: '24.9',
};

const testData2 = {
  productPrice: '12.9',
  gtin: '5000112637939',
  price: '12.9',
  quantity: 1,
  product: {
    unit: 'Kr/Förp',
    quantity: '33cl',
    sku: '5000112637939',
    name: 'Cola Zero',
    brand: 'Coca-Cola',
  },
  timeCreated: {},
};

describe('The <Item /> component', () => {
  it('renders as expected', () => {
    const component = mount(<Item itemData={testData} />);
    expect(component.exists('.data')).toBe(true);
    expect(component.find('.title').text().length).toBeGreaterThanOrEqual(0);
    expect(component.html()).toMatch(/•\s\d*.\d{2}\skr/gm);
  });

  it('renders as expected', () => {
    const component = mount(<Item itemData={testData2} />);
    expect(component.exists('.data')).toBe(true);
    expect(component.find('.title').text().length).toBeGreaterThanOrEqual(0);
    expect(component.html()).toMatch(/•\s\d*.\d{2}\skr/gm);
  });
});
