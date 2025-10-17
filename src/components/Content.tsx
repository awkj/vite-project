// Content.tsx
import { type FC } from 'react'
import Info from './Info'
import Order from './Order'
import Cart from './Cart'
import { useUserSearch } from '../context'

const Content: FC = () => {
    const { activeTab, data, loading, error } = useUserSearch()

    if (loading[activeTab]) {
        return <div className="loading" > 加载中...</div>
    }

    if (error[activeTab]) {
        return <div className="error" > 错误：{error[activeTab]} </div>
    }

    switch (activeTab) {
        case 'info':
            return <Info data={data.info} />
        case 'order':
            return <Order data={data.order} />
        case 'cart':
            return <Cart data={data.cart} />
        default:
            return <div>未知内容 </div>
    }
}

export default Content