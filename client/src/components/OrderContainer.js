/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { OrderContext } from '../context/OrderContext';
import OrderCard from './order/OrderCard';
import OrderHistoryCard from './order/OrderHistoryCard';
import OrderDetailsCard from './OrderDetails';
import Contols from './helpers/Controls';
import Loading from './helpers/Loading';
import Button from './helpers/Button';
import FlipMove from 'react-flip-move';

const S = {};
S.Container = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 625px) {
    flex-direction: column;
    align-items: center;
  }
`;

S.Headline = styled.h4`
  margin: 5px;
`;

S.Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10px;
  @media (max-width: 625px) {
    padding-top: 0;
    max-width: 600px;
    width: 100%;
    ${(props) =>
      props.hide &&
      css`
        display: none;
      `};
  }
`;

S.Recent = styled(S.Section)`
  max-height: calc(100vh - 110px);
  flex: 0 0 55%;
  max-width: 550px;
  min-width: 300px;
  > h4 {
    margin-bottom: 15px;
  }
`;

S.HistoryContainer = styled(S.Section)`
  display: flex;
  justify-content: column;
  flex: 0 0 40%;
  max-width: 430px;
  min-width: 250px;
`;

S.History = styled(S.Section)`
  top: 0;
  height: calc(100vh - 120px);
  overflow: scroll;
  .header {
    margin-bottom: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function OrderContainer() {
  const { state, dispatch, ordersActions } = useContext(OrderContext);
  const [recentOrders, setRecentOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const sortRecentOrders = () => {
    const recent = state.orders
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(0, 3);
    setRecentOrders(recent);
  };

  const sortHistoryOrders = () => {
    const history = state.orders
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(3, 14);
    setHistoryOrders(history);
  };

  useEffect(() => {
    sortRecentOrders();
    sortHistoryOrders();
  }, [state.orders]);

  const setMobileView = (state) => {
    setShowHistory(state);
  };

  if (recentOrders.length < 1) {
    return <Loading />;
  }

  return (
    <>
      {!showHistory && (
        <Button onClick={ordersActions.addNewOrder} addNew>
          + Add
        </Button>
      )}
      <S.Container>
        {state.showOrderDetails && (
          <OrderDetailsCard
            close={() => dispatch({ type: 'TOGGLE_ORDER_DETAILS' })}
            data={state.currentOrderDetails}
            show={state.showOrderDetails}
          />
        )}

        <Contols setMobileView={setMobileView} />

        <S.Recent hide={showHistory}>
          <S.Headline>Orders</S.Headline>
          <FlipMove
            leaveAnimation="fade"
            enterAnimation={{
              from: {
                opacity: 0.1,
                transform: 'scale(0.5)',
              },
              to: {
                opacity: 1,
                transform: 'scale(1)',
              },
            }}
          >
            {recentOrders.map((order) => (
              <OrderCard key={order.id.toString()} order={order} />
            ))}
          </FlipMove>
        </S.Recent>
        <S.HistoryContainer hide={!showHistory}>
          <S.Headline>History</S.Headline>
          <S.History>
            <FlipMove enterAnimation="accordionVertical">
              {historyOrders.map((order) => (
                <OrderHistoryCard key={order.id.toString()} order={order} />
              ))}
            </FlipMove>
          </S.History>
        </S.HistoryContainer>
      </S.Container>
    </>
  );
}
