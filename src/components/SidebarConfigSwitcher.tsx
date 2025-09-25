import React from 'react'

interface SidebarConfigSwitcherProps {
  currentSupplier: 'alibaba' | 'tencent' | 'bytedance'
  currentEnvironment: 'production' | 'test'
  onSupplierChange: (supplier: 'alibaba' | 'tencent' | 'bytedance') => void
  onEnvironmentChange: (environment: 'production' | 'test') => void
}

function SidebarConfigSwitcher({
  currentSupplier,
  currentEnvironment,
  onSupplierChange,
  onEnvironmentChange,
}: SidebarConfigSwitcherProps) {
  const handleSupplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSupplierChange(event.target.value as 'alibaba' | 'tencent' | 'bytedance')
  }

  const handleEnvironmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onEnvironmentChange(event.target.value as 'production' | 'test')
  }

  return (
    <div className="sidebar-config-switcher absolute top-5 right-5 flex gap-4 items-center z-50">
      <div className="flex flex-col items-center">
        <label className="text-xs mb-1.5 text-gray-600">切换供应商</label>
        <select
          value={currentSupplier}
          onChange={handleSupplierChange}
          className="px-2 py-1 rounded border border-gray-300 text-xs transition-all"
        >
          <option value="alibaba">阿里巴巴</option>
          <option value="tencent">腾讯</option>
          <option value="bytedance">字节</option>
        </select>
      </div>
      
      <div className="flex flex-col items-center">
        <label className="text-xs mb-1.5 text-gray-600">切换环境</label>
        <select
          value={currentEnvironment}
          onChange={handleEnvironmentChange}
          className="px-2 py-1 rounded border border-gray-300 text-xs transition-all"
        >
          <option value="production">生产环境</option>
          <option value="test">测试环境</option>
        </select>
      </div>
    </div>
  )
}

export default SidebarConfigSwitcher