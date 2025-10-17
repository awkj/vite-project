// types.ts
export type TabKey = 'info' | 'order' | 'cart'

export interface TabConfig {
    key: TabKey
    label: string
}

export interface UserInfo {
    id: string
    name: string
    age?: number
    [key: string]: any // 允许其他字段
}

export interface UserOrder {
    id: string
    orderNo: string
    createdAt: string
    [key: string]: any
}

export interface UserCart {
    id: string
    items: { productId: string; name: string; quantity: number }[]
    [key: string]: any
}

export type TabData = {
    info: UserInfo | null
    order: UserOrder | null
    cart: UserCart | null
}

export interface UserSearchState {
    activeTab: TabKey
    userId: string
    data: TabData
    loading: Record<TabKey, boolean>
    error: Record<TabKey, string | null>
}

export type UserSearchAction =
    | { type: 'SET_ACTIVE_TAB'; payload: TabKey }
    | { type: 'SET_USER_ID'; payload: string }
    | { type: 'FETCH_START'; payload: TabKey }
    | { type: 'FETCH_SUCCESS'; payload: { tab: TabKey; data: any } }
    | { type: 'FETCH_ERROR'; payload: { tab: TabKey; error: string } }