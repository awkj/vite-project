// 定义侧边栏项目的基础接口
export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  icon?: React.ReactNode;
  children?: SidebarItem[];
}

// 侧边栏配置接口
export interface SidebarConfig {
  logo?: {
    text: string;
    onClick?: () => void;
  };
  items: SidebarItem[];
  userInfo?: {
    name: string;
    email: string;
    avatarUrl: string;
    onClick?: () => void;
  };
}