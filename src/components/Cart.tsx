// Cart.tsx
import { type FC } from 'react';
import type { UserCart } from '../types';

interface CartProps {
  data: UserCart | null;
}

const Cart: FC<CartProps> = ({ data }) => {
  if (!data) {
    return <div className="empty-state">暂无购物车数据，请输入用户ID并搜索</div>;
  }

  return (
    <div className="cart-container">
      <h3>用户购物车</h3>
      <p>购物车ID: {data.id}</p>
      
      {data.items && data.items.length > 0 ? (
        <table className="cart-items">
          <thead>
            <tr>
              <th>商品ID</th>
              <th>商品名称</th>
              <th>数量</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td>{item.productId}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>购物车为空</p>
      )}
      
      {/* 显示其他字段 */}
      {Object.entries(data)
        .filter(([key]) => !['id', 'items'].includes(key))
        .map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {String(value)}
          </div>
        ))}
    </div>
  );
};

export default Cart;