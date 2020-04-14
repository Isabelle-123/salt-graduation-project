import React, { forwardRef } from 'react';
import OrderCard from './OrderCard';

const OrderHistoryCard = forwardRef(({ order }, ref) => (
  <div ref={ref}>
    <div className="order-card">
      <OrderCard order={order} hideHr hideItems />
    </div>
  </div>
));

function propsAreEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

export default React.memo(OrderHistoryCard, propsAreEqual);
