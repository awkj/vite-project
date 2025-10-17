// TabSwitch.tsx
import { type FC } from 'react'
import { useUserSearch } from '../context'
import type { TabConfig } from '../types'

const tabs: TabConfig[] = [
    { key: 'info', label: '身份信息' },
    { key: 'order', label: '订单' },
    { key: 'cart', label: '购物车' }
]

const TabSwitch: FC = () => {
    const { activeTab, switchTab, fetchTabData } = useUserSearch()

    const handleTabSwitch = async (tabKey: TabConfig['key']) => {
        // 切换tab
        switchTab(tabKey)
        // 获取该tab对应的数据
        await fetchTabData(tabKey)
    }

    return (
        <div className="tab-switch">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => handleTabSwitch(tab.key)}
                    className={activeTab === tab.key ? 'active' : ''}
                    aria-current={activeTab === tab.key ? 'page' : undefined}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

export default TabSwitch