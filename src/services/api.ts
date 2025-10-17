// src/services/api.ts
import type { TabKey, UserInfo, UserOrder, UserCart } from '../types';
import { getMockUserData, simulateDelay } from './mockData';

// 检测是否为开发环境
const isDevelopment = import.meta.env.DEV;

interface FetchOptions {
  maxRetries?: number;
  retryDelay?: number;
}

/**
 * 通用的API请求函数，支持重试机制
 */
async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  { maxRetries = 3, retryDelay = 1000 }: FetchOptions = {}
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error as Error;
      
      // 如果是最后一次尝试，直接抛出错误
      if (attempt === maxRetries) {
        throw lastError;
      }

      // 等待一段时间后重试
      await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
    }
  }

  throw lastError!;
}

/**
 * 获取用户数据
 */
export async function fetchUserData(
  type: TabKey,
  id: string
): Promise<UserInfo | UserOrder | UserCart | null> {
  if (!id) return null;

  // 开发环境使用模拟数据
  if (isDevelopment) {
    await simulateDelay(); // 模拟网络延迟
    const mockData = getMockUserData(type, id);
    
    if (!mockData) {
      throw new Error('User not found');
    }
    
    return mockData;
  }

  // 生产环境调用真实API
  try {
    return await fetchWithRetry(`/api/user?type=${type}&id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(`Failed to fetch ${type} data for user ${id}:`, error);
    throw error;
  }
}

/**
 * 缓存管理（简单实现）
 */
class CacheManager {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private maxAge = 5 * 60 * 1000; // 5分钟缓存

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    // 检查缓存是否过期
    if (Date.now() - cached.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

// 导出全局缓存实例
export const cacheManager = new CacheManager();

/**
 * 获取带缓存的用户数据
 */
export async function fetchUserDataWithCache(
  type: TabKey,
  id: string
): Promise<UserInfo | UserOrder | UserCart | null> {
  const cacheKey = `${type}:${id}`;
  const cachedData = cacheManager.get(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  const data = await fetchUserData(type, id);
  if (data) {
    cacheManager.set(cacheKey, data);
  }
  
  return data;
}