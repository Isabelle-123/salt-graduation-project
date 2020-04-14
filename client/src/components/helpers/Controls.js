import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const S = {};
S.ControlsDiv = styled.div`
  display: none;
  @media (max-width: 625px) {
    display: flex;
    margin: 10px auto;
    button {
      margin-right: 10px;
      color: #202129;
      background-color: #ffffff;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
      display: flex;
      text-align: center;
      margin: 5px;
      font-size: 0.7rem;

      &:hover {
        color: #202129;
        background-color: #e1e2e2;
        opacity: 1;
      }

      &:active {
        background-color: #d5d6d6;
        opacity: 1;
      }
    }
  }
`;

function Controls({ setMobileView }) {
  return (
    <S.ControlsDiv>
      <Button onClick={() => setMobileView(false)}>Orders</Button>
      <Button onClick={() => setMobileView(true)}>History</Button>
    </S.ControlsDiv>
  );
}

export default React.memo(Controls);
