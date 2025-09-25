import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConfigurableSidebar } from './components/ConfigurableSidebar'
import routes from './config/routes'
import type { Environment, Supplier } from './config/sidebarConfig'
import { getSidebarConfig } from './config/sidebarConfig'

export default function App() {
  // 状态管理当前使用的供应商
  const [currentSupplier, setCurrentSupplier] = useState<Supplier>('wyc')

  // 状态管理当前使用的环境
  const [currentEnvironment, setCurrentEnvironment] = useState<Environment>('production')

  // 根据当前供应商和环境获取对应的侧边栏配置
  const sidebarConfig = getSidebarConfig(currentSupplier, currentEnvironment)

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <ConfigurableSidebar
          config={sidebarConfig}
          currentSupplier={currentSupplier}
          currentEnvironment={currentEnvironment}
          onSupplierChange={setCurrentSupplier}
          onEnvironmentChange={setCurrentEnvironment}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}




