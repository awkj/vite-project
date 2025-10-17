// Order.tsx
import { type FC } from 'react';
import type { UserOrder } from '../types';

interface OrderProps {
  data: UserOrder | null;
}

const Order: FC<OrderProps> = ({ data }) => {
  if (!data) {
    return <div className="empty-state">暂无订单数据，请输入用户ID并搜索</div>;
  }

  return (
    <div className="order-container">
      <h3>用户订单信息</h3>
      <dl>
        <dt>订单ID</dt>
        <dd>{data.id}</dd>
        <dt>订单编号</dt>
        <dd>{data.orderNo}</dd>
        <dt>创建时间</dt>
        <dd>{new Date(data.createdAt).toLocaleString()}</dd>
        {/* 显示其他字段 */}
        {Object.entries(data)
          .filter(([key]) => !['id', 'orderNo', 'createdAt'].includes(key))
          .map(([key, value]) => (
            <>
              <dt>{key}</dt>
              <dd>{String(value)}</dd>
            </>
          ))}
      </dl>
    </div>
  );
};

export default Order;