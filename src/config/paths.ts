// 集中管理所有应用路由路径
export const PATHS = {
  HOME: '/',
  BANNED_USERS: '/banned-users',
  CALENDAR: '/calendar',
  BILLING: '/billing',
  INVOICES: '/invoices',
  ACCOUNT_DETAILS: '/account-details',
  SECURITY: '/security',
} as const;

// 导出类型供TypeScript使用
export type PathKey = keyof typeof PATHS;
export type PathValue = typeof PATHS[PathKey];