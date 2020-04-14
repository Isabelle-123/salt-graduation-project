/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import apiEndpoint from '../../config';

const S = {};
S.ItemDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
  flex: 0 0 49%;
  &:last-child {
    margin-bottom: 0;
  }
`;

S.Details = styled.div`
  font-size: 0.7rem;
  > * {
    margin: 0;
    padding: 0 0 0 10px;
  }
  ${(props) =>
    props.fullScreen &&
    css`
      font-size: 0.9rem;
    `};
`;

S.Image = styled.img`
  height: 40px;
  ${(props) =>
    props.fullScreen &&
    css`
      height: 60px;
    `};
`;

function Item({ itemData, fullScreen }) {
  const { price: total, quantity, gtin } = itemData;
  const { name, brand } = itemData.product;
  const [imagePath, setImagePath] = useState('');
  const [itemPrice, setItemprice] = useState(0);

  const getProductImage = async () => {
    const { data } = await axios.get(`${apiEndpoint}/api/products/${gtin}`);
    setImagePath(data.path);
  };

  useEffect(() => {
    getProductImage();
    setItemprice((Math.round(total * 100) / 100).toFixed(2));
  }, []);

  return (
    <S.ItemDiv>
      <S.Image src={imagePath} alt={name} fullScreen={fullScreen} />
      <S.Details fullScreen={fullScreen}>
        <p className="title">{name}</p>
        <p className="brand">{brand}</p>
        <p className="data">
          {quantity} st &bull; {itemPrice} kr
        </p>
      </S.Details>
    </S.ItemDiv>
  );
}

export default React.memo(Item);
