import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import styled, { css } from 'styled-components';
import CustomerName from './CustomerName';
import Image from './Image';

const S = {};
S.HeaderDiv = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
  flex: 0 0 49%;
  font-size: 0.7rem;
  ${(props) =>
    props.fullScreen &&
    css`
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 1rem;
    `};
`;

S.Line = styled.hr`
  border: 0.5px solid #e1e1e1;
  width: 90%;
  margin: 0 2;
`;

S.Text = styled.p`
  margin: 0;
  padding: 0;
`;

function Header({ order, hideHr, fullScreen }) {
  const [orderTotal, setOrderTotal] = useState(0);
  const [itemPrice, setItemprice] = useState(0);

  useEffect(() => {
    const orderTotal = order.items.reduce(
      (acc, current) => acc + current.quantity,
      0
    );
    setOrderTotal(orderTotal);
    setItemprice((Math.round(order.price * 100) / 100).toFixed(2));
  }, [order.items, order.price]);

  return (
    <>
      <S.HeaderDiv fullScreen={fullScreen}>
        <Image imageData={order.customer} fullScreen={fullScreen} />
        <div className="details">
          <CustomerName customerData={order} />
          <div className="data">
            <S.Text>
              {orderTotal} items &bull; {itemPrice} kr
            </S.Text>
            <Moment fromNow>{order.timeCreated}</Moment>
          </div>
        </div>
      </S.HeaderDiv>
      {hideHr ? '' : <S.Line />}
    </>
  );
}

export default React.memo(Header);
