import React, { useState, useEffect, useContext, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { OrderContext } from '../../context/OrderContext';
import Header from './Header';
import Item from './Item';

const S = {};
S.ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

S.OrderCard = styled.div`
  border-radius: 10px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  margin-bottom: 10px;
  background-color: white;
  padding: 10px;
  font-size: 1rem;
  z-index: -1;
  transition: all 0.13s ease-in;
  &:hover {
    cursor: pointer;
    transform: scale(0.98);
  }
  ${(props) =>
    props.fullScreen &&
    css`
      box-shadow: none;
      position: relative;
      top: -40px;
      &:hover {
        transform: none;
        cursor: initial;
      }
    `};
`;

const OrderCard = forwardRef(
  ({ order, showOrderDetails, hideHr, hideItems }, ref) => {
    const { ordersActions } = useContext(OrderContext);
    const [itemsToRender, setItemsToRender] = useState([]);

    useEffect(() => {
      if (!showOrderDetails) {
        const limitItems = order.items.slice(-4);
        setItemsToRender(limitItems);
      } else {
        setItemsToRender(order.items);
      }
    }, [order.items, showOrderDetails]);

    return (
      <div ref={ref}>
        <S.OrderCard
          fullScreen={showOrderDetails}
          onClick={() => ordersActions.showOrderDetailsView(order.id)}
        >
          <Header order={order} hideHr={hideHr} fullScreen={showOrderDetails} />
          {!hideItems && (
            <S.ItemsContainer>
              {itemsToRender.map((item) => (
                <Item
                  key={item.gtin}
                  itemData={item}
                  fullScreen={showOrderDetails}
                />
              ))}
            </S.ItemsContainer>
          )}
        </S.OrderCard>
      </div>
    );
  }
);

function propsAreEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default React.memo(OrderCard, propsAreEqual);
