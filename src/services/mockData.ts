// src/services/mockData.ts
import type { UserInfo, UserOrder, UserCart } from '../types';

// 模拟用户数据
const mockUsers: Record<string, { info: UserInfo; order: UserOrder; cart: UserCart }> = {
  '1': {
    info: {
      id: '1',
      name: '张三',
      age: 28,
      email: 'zhangsan@example.com',
      phone: '13800138000',
      address: '北京市朝阳区'
    },
    order: {
      id: 'order-001',
      orderNo: 'ORD20240101001',
      createdAt: '2024-01-01T10:30:00Z',
      totalAmount: 999,
      status: '已完成',
      items: 3
    },
    cart: {
      id: 'cart-001',
      items: [
        { productId: 'p001', name: '笔记本电脑', quantity: 1 },
        { productId: 'p002', name: '无线鼠标', quantity: 2 },
        { productId: 'p003', name: '机械键盘', quantity: 1 }
      ],
      totalItems: 4,
      totalPrice: 1599
    }
  },
  '2': {
    info: {
      id: '2',
      name: '李四',
      age: 32,
      email: 'lisi@example.com',
      phone: '13900139000',
      address: '上海市浦东新区'
    },
    order: {
      id: 'order-002',
      orderNo: 'ORD20240102002',
      createdAt: '2024-01-02T14:20:00Z',
      totalAmount: 1599,
      status: '处理中',
      items: 2
    },
    cart: {
      id: 'cart-002',
      items: [
        { productId: 'p004', name: '智能手机', quantity: 1 },
        { productId: 'p005', name: '手机保护壳', quantity: 3 }
      ],
      totalItems: 4,
      totalPrice: 3599
    }
  },
  '3': {
    info: {
      id: '3',
      name: '王五',
      age: 25,
      email: 'wangwu@example.com',
      phone: '13700137000',
      address: '广州市天河区'
    },
    order: {
      id: 'order-003',
      orderNo: 'ORD20240103003',
      createdAt: '2024-01-03T09:15:00Z',
      totalAmount: 599,
      status: '已发货',
      items: 1
    },
    cart: {
      id: 'cart-003',
      items: [],
      totalItems: 0,
      totalPrice: 0
    }
  }
};

/**
 * 获取模拟用户数据
 */
export function getMockUserData(type: 'info' | 'order' | 'cart', id: string) {
  const user = mockUsers[id];
  return user ? user[type] : null;
}

/**
 * 模拟API延迟
 */
export function simulateDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}