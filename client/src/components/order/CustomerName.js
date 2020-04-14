import React from 'react';
import styled from 'styled-components';

const S = {};
S.Headline = styled.h4`
  margin: 0;
`;

export default function CustomerName({ customerData }) {
  if (customerData !== undefined) {
    return (
      <S.Headline>
        {customerData.customer && customerData.customer.name}
      </S.Headline>
    );
  } else {
    return null;
  }
}
