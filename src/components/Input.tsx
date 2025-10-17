// Input.tsx
import type { ChangeEvent, FC } from 'react'
import { useEffect, useState } from 'react'
import { useUserSearch } from '../context'

const Input: FC = () => {
  const { userId, updateUserId, fetchData } = useUserSearch()
  const [inputValue, setInputValue] = useState(userId)

  // 处理输入变化 - 实时更新URL
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    updateUserId(value) // 输入时就更新URL
  }

  // 处理搜索 - 点击搜索按钮时发起请求
  const handleSearch = () => {
    if (inputValue.trim()) {
      fetchData() // 只在点击搜索时发起请求
    }
  }

  // 处理回车
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 支持回车确认搜索
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // 从URL初始化输入框值
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const idParam = searchParams.get('id')
    if (idParam && idParam !== inputValue) {
      setInputValue(idParam)
    }
  }, [])

  return (
    <div className="search-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="请输入用户ID"
        className="search-input"
      />
      <button
        onClick={handleSearch}
        className="search-button"
        disabled={!inputValue.trim()}
      >
        搜索
      </button>
    </div>
  )
}

export default Input