import { Link } from 'react-router-dom'
import type { SidebarItem as SidebarItemType } from '../../types/sidebar'

interface SidebarItemProps {
  item: SidebarItemType
  isActive: boolean
}

function SidebarItem({ item, isActive }: SidebarItemProps) {
  const baseClasses = 'flex items-center rounded-lg px-4 py-2 text-sm font-medium'
  const activeClasses = isActive
    ? 'bg-blue-100 text-blue-700'
    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'

  // 默认图标
  const defaultIcon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="size-4 mr-2 text-gray-400" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1.586l-.293-.293a1 1 0 00-1.414 1.414L14.414 10H13a1 1 0 100 2h1.586l.293.293a1 1 0 001.414-1.414L16.414 12H17zm-5-5a1 1 0 011 1v3.586l.293.293a1 1 0 11-1.414 1.414L12 11.414V7a1 1 0 112 0v3.586l-.293.293a1 1 0 11-1.414-1.414L12.586 6H12a1 1 0 01-1-1zm-4 4a1 1 0 00-1 1v2.586l-.293.293a1 1 0 101.414 1.414L8 15.414V11a1 1 0 00-1-1zm0-4a1 1 0 112 0v3.586l.293.293a1 1 0 11-1.414 1.414L8 11.414V7a1 1 0 012 0v3.586l-.293.293a1 1 0 11-1.414-1.414L8.586 6H8a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  )

  if (item.href) {
    return (
      <Link
        to={item.href}
        className={`${baseClasses} ${activeClasses}`}
        onClick={(e) => {
          if (item.onClick) {
            e.preventDefault()
            item.onClick()
          }
        }}
      >
        {item.icon || defaultIcon}
        {item.label}
      </Link>
    )
  } else if (item.onClick) {
    return (
      <button
        className={`w-full text-left ${baseClasses} ${activeClasses}`}
        onClick={item.onClick}
      >
        {item.icon || defaultIcon}
        {item.label}
      </button>
    )
  }

  return null
}

export default SidebarItem