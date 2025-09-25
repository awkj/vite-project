import { Link } from 'react-router-dom'
import type { SidebarItem as SidebarItemType } from '../../types/sidebar'

interface IconMenuItemProps {
  item: SidebarItemType
  isActive: boolean
}

function IconMenuItem({ item, isActive }: IconMenuItemProps) {
  // 默认图标
  const defaultIcon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="size-5" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1.586l-.293-.293a1 1 0 00-1.414 1.414L14.414 10H13a1 1 0 100 2h1.586l.293.293a1 1 0 001.414-1.414L16.414 12H17zm-5-5a1 1 0 011 1v3.586l.293.293a1 1 0 11-1.414 1.414L12 11.414V7a1 1 0 112 0v3.586l-.293.293a1 1 0 11-1.414-1.414L12.586 6H12a1 1 0 01-1-1zm-4 4a1 1 0 00-1 1v2.586l-.293.293a1 1 0 101.414 1.414L8 15.414V11a1 1 0 00-1-1zm0-4a1 1 0 112 0v3.586l.293.293a1 1 0 11-1.414 1.414L8 11.414V7a1 1 0 012 0v3.586l-.293.293a1 1 0 11-1.414-1.414L8.586 6H8a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  )

  const baseClasses = 'flex items-center justify-center w-10 h-10 rounded-lg mx-auto'
  const activeClasses = isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'

  if (item.href) {
    return (
      <li key={item.id} className="my-2">
        <Link
          to={item.href}
          className={`${baseClasses} ${activeClasses}`}
          onClick={(e) => {
            if (item.onClick) {
              e.preventDefault()
              item.onClick()
            }
          }}
          title={item.label}
        >
          {item.icon || defaultIcon}
        </Link>
      </li>
    )
  } else if (item.onClick) {
    return (
      <li key={item.id} className="my-2">
        <button
          className={`${baseClasses} ${activeClasses}`}
          onClick={item.onClick}
          title={item.label}
        >
          {item.icon || defaultIcon}
        </button>
      </li>
    )
  }

  return null
}

export default IconMenuItem