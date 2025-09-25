import type { Environment } from '../../config/sidebarConfig'
import { envClass } from '../../utils/styleUtils'

interface SidebarCollapseToggleProps {
  isCollapsed: boolean
  onToggle: () => void
  currentEnvironment: Environment
}

function SidebarCollapseToggle({
  isCollapsed,
  onToggle,
  currentEnvironment
}: SidebarCollapseToggleProps) {
  // 简短别名
  const env = currentEnvironment
  return (
    <button
      onClick={onToggle}
      className={`absolute top-4 right-0 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all z-30 ${envClass(env, 'background')}`}
      aria-label={isCollapsed ? "展开侧边栏" : "折叠侧边栏"}
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`size-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}

export default SidebarCollapseToggle