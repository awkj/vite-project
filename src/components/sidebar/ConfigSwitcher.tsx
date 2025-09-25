import { useLocation, useNavigate } from 'react-router-dom'
import type { Environment, Supplier } from '../../config/sidebarConfig'
import { envClass } from '../../utils/styleUtils'

interface ConfigSwitcherProps {
  currentSupplier: Supplier
  currentEnvironment: Environment
  onSupplierChange: (supplier: Supplier) => void
  onEnvironmentChange: (environment: Environment) => void
}

function ConfigSwitcher({ currentSupplier, currentEnvironment, onSupplierChange, onEnvironmentChange }: ConfigSwitcherProps) {
  // 简短别名
  const env = currentEnvironment
  const location = useLocation()
  const navigate = useNavigate()

  // 更新URL参数的辅助函数
  const updateUrlWithEnvironment = (environment: Environment) => {
    const searchParams = new URLSearchParams(location.search)

    if (environment === 'test') {
      // 测试环境添加env=osim参数
      searchParams.set('env', 'osim')
    } else {
      // 生产环境移除env参数
      searchParams.delete('env')
    }

    // 保持路径不变，只更新查询参数
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    }, {
      state: location.state,
      replace: true
    })
  }

  // 处理环境切换
  const handleEnvironmentToggle = () => {
    const newEnvironment = env === 'production' ? 'test' : 'production'
    onEnvironmentChange(newEnvironment)
    updateUrlWithEnvironment(newEnvironment)
  }

  return (
    <div className="px-4 py-3 border-t border-gray-100">
      <div className="space-y-3">
        <div>
          <label className="block text-xs mb-1.5 text-gray-600">切换业务线</label>
          <select
            value={currentSupplier}
            onChange={(e) => onSupplierChange(e.target.value as Supplier)}
            className="w-full px-2 py-1 rounded border border-gray-300 text-xs transition-all focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="wyc">网约车</option>
            <option value="kflower">花小猪</option>
            <option value="honghu">鸿鹄</option>
          </select>
        </div>

        <div>
          <div className="flex items-center justify-center space-x-2 w-full">
            <span className="text-xs text-gray-600">测试环境</span>
            <div
              className={`relative inline-block w-10 h-5 rounded-full transition-all cursor-pointer ${envClass(currentEnvironment, 'button')}`}
              onClick={handleEnvironmentToggle}
            >
              <div
                className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-all ${env === 'production' ? 'translate-x-5' : 'translate-x-0'}`}
              ></div>
            </div>
            <span className="text-xs text-gray-600">生产环境</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigSwitcher