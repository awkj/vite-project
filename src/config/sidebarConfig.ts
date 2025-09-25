import type { SidebarConfig } from '../types/sidebar'
import { PATHS } from './paths'

// 定义供应商类型
export type Supplier = 'wyc' | 'kflower' | 'honghu'
// 定义环境类型
export type Environment = 'production' | 'test'

// 阿里供应商配置
export const wycConfig: Omit<SidebarConfig, 'logo'> = {
  items: [
    {
      id: 'general',
      label: '阿里云设置',
      href: PATHS.HOME,
    },
    {
      id: 'teams',
      label: '团队管理',
      children: [
        {
          id: 'banned-users',
          label: '禁用用户',
          href: PATHS.BANNED_USERS,
        },
        {
          id: 'calendar',
          label: '团队日历',
          href: PATHS.CALENDAR,
        },
      ],
    },
    {
      id: 'billing',
      label: '账单管理',
      href: PATHS.BILLING,
    },
    {
      id: 'invoices',
      label: '发票管理',
      href: PATHS.INVOICES,
    },
    {
      id: 'account',
      label: '账户设置',
      children: [
        {
          id: 'account-details',
          label: '账户详情',
          href: PATHS.ACCOUNT_DETAILS,
        },
        {
          id: 'security',
          label: '安全设置',
          href: PATHS.SECURITY,
        },
      ],
    },
  ],
  userInfo: {
    name: '阿里云用户',
    email: 'wyc@example.com',
    avatarUrl: 'https://picsum.photos/id/1011/200',
    onClick: () => console.log('阿里云用户信息被点击'),
  },
}

// 腾讯供应商配置
export const kflowerConfig: Omit<SidebarConfig, 'logo'> = {
  items: [
    {
      id: 'general',
      label: '腾讯云设置',
      href: PATHS.HOME,
    },
    {
      id: 'teams',
      label: '团队管理',
      children: [
        {
          id: 'banned-users',
          label: '禁用用户',
          href: PATHS.BANNED_USERS,
        },
        {
          id: 'calendar',
          label: '团队日历',
          href: PATHS.CALENDAR,
        },
      ],
    },
    {
      id: 'billing',
      label: '财务中心',
      href: PATHS.BILLING,
    },
    {
      id: 'invoices',
      label: '发票申请',
      href: PATHS.INVOICES,
    },
    {
      id: 'account',
      label: '账户管理',
      children: [
        {
          id: 'account-details',
          label: '账户资料',
          href: PATHS.ACCOUNT_DETAILS,
        },
        {
          id: 'security',
          label: '安全中心',
          href: PATHS.SECURITY,
        },
      ],
    },
  ],
  userInfo: {
    name: '腾讯云用户',
    email: 'kflower@example.com',
    avatarUrl: 'https://picsum.photos/id/1012/200',
    onClick: () => console.log('腾讯云用户信息被点击'),
  },
}

// 字节供应商配置
export const honghuConfig: Omit<SidebarConfig, 'logo'> = {
  items: [
    {
      id: 'general',
      label: '字节云设置',
      href: PATHS.HOME,
    },
    {
      id: 'teams',
      label: '团队协作',
      children: [
        {
          id: 'banned-users',
          label: '限制用户',
          href: PATHS.BANNED_USERS,
        },
        {
          id: 'calendar',
          label: '项目日历',
          href: PATHS.CALENDAR,
        },
      ],
    },
    {
      id: 'billing',
      label: '费用管理',
      href: PATHS.BILLING,
    },
    {
      id: 'invoices',
      label: '发票管理',
      href: PATHS.INVOICES,
    },
    {
      id: 'account',
      label: '账户设置',
      children: [
        {
          id: 'account-details',
          label: '账户信息',
          href: PATHS.ACCOUNT_DETAILS,
        },
        {
          id: 'security',
          label: '安全设置',
          href: PATHS.SECURITY,
        },
      ],
    },
  ],
  userInfo: {
    name: '字节云用户',
    email: 'honghu@example.com',
    avatarUrl: 'https://picsum.photos/id/1013/200',
    onClick: () => console.log('字节云用户信息被点击'),
  },
}

// 生产环境配置
export const productionLogo = {
  text: '生产环境',
  onClick: () => console.log('生产环境logo被点击'),
}

// 测试环境配置
export const testLogo = {
  text: '测试环境',
  onClick: () => console.log('测试环境logo被点击'),
}

// 根据供应商和环境获取完整配置
export const getSidebarConfig = (supplier: Supplier, env: Environment): SidebarConfig => {
  const supplierConfig = {
    wyc: wycConfig,
    kflower: kflowerConfig,
    honghu: honghuConfig,
  }[supplier]

  const logo = env === 'production' ? productionLogo : testLogo

  return {
    logo,
    ...supplierConfig,
  }
}

// 默认导出以便向后兼容
export default {
  devSidebarConfig: getSidebarConfig('wyc', 'test'),
  prodSidebarConfig: getSidebarConfig('wyc', 'production'),
}