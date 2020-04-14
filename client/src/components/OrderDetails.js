import React, { useState } from 'react';
import OrderCard from '../components/order/OrderCard';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components';
import closeIcon from '../assets/close.svg';

const S = {};
S.Card = styled.div`
  position: absolute;
  background: #fff;
  width: 700px;
  height: 80vh;
  bottom: 0;
  padding: 20px;
  border-radius: 10px 10px 0 0;

  div {
    div {
      div {
        div {
          /* Productdetails + time */
          width: 245px;
          margin-top: 2%;
        }
      }
    }
  }

  @media (max-width: 625px) {
    width: 100%;

    div {
      div {
        /* card, username, userimage, container */
        img {
          width: 80px;
          height: auto;
        }
        div {
          div {
            /* Productimage,  time */
            img {
              width: 30px;
              height: auto;
            }
            div {
              /* text product details */
              width: 145px;
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
`;

S.ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

S.OrderDetailsDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.3s linear;
  visibility: hidden;
  z-index: 5;
  ${(props) =>
    props.showBackground &&
    css`
      background-color: rgba(0, 0, 0, 0.6);
      visibility: visible;
    `};
`;

S.CloseDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  cursor: pointer;
`;

S.CloseBtn = styled.img`
  width: 30px;
`;

export default function OrderDetails({ data, close, show }) {
  const [showBackground, setShowBackground] = useState(false);

  return (
    <S.OrderDetailsDiv showBackground={showBackground}>
      <CSSTransition
        in={show}
        timeout={300}
        classNames="order-details"
        unmountOnExit
        onEntered={() => setShowBackground(true)}
        appear
      >
        <S.Card>
          <S.CloseDiv>
            <S.CloseBtn
              src={closeIcon}
              alt=""
              onClick={() => {
                setShowBackground(false);
                close();
              }}
            />
          </S.CloseDiv>
          <OrderCard order={data} showOrderDetails />
          <S.ItemsContainer />
        </S.Card>
      </CSSTransition>
    </S.OrderDetailsDiv>
  );
}
