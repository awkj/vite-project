import type { SidebarConfig } from '../../types/sidebar'

interface SidebarUserInfoProps {
  userInfo: SidebarConfig['userInfo']
}

function SidebarUserInfo({ userInfo }: SidebarUserInfoProps) {
  if (!userInfo) {
    return null
  }

  return (
    <div className="border-t border-gray-100 bg-white">
      <div
        className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
        onClick={userInfo.onClick}
      >
        <img
          alt={userInfo.name}
          src={userInfo.avatarUrl}
          className="size-10 rounded-full object-cover border border-gray-200"
        />

        <div>
          <p className="text-xs">
            <strong className="block font-medium text-gray-900">{userInfo.name}</strong>
            <span className="text-gray-500">{userInfo.email}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SidebarUserInfo