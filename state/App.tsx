import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

// 定义表单状态类型
interface FormState {
    user_id: string
    role: '' | 'passenger' | 'driver'
    start_time: string
    end_time: string
}

// 定义接口返回数据类型（根据实际接口调整）
interface ApiResponse {
    data: any[] // 假设返回数组数据
    total: number
}

const SearchFilter = () => {
    // 1. 表单状态管理
    const [formState, setFormState] = useState<FormState>({
        user_id: '',
        role: '',
        start_time: '',
        end_time: ''
    })

    // 2. 接口请求相关状态
    const [data, setData] = useState<ApiResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // 3. 路由相关工具
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()

    // 4. 从 URL 初始化表单状态（首次加载或 URL 变化时）
    useEffect(() => {
        const initialState: FormState = {
            user_id: searchParams.get('user_id') || '',
            role: (searchParams.get('role') as FormState['role']) || '',
            start_time: searchParams.get('start_time') || '',
            end_time: searchParams.get('end_time') || ''
        }
        setFormState(initialState)
    }, [searchParams])

    // 5. 表单状态同步到 URL（输入变化时自动更新 URL）
    useEffect(() => {
        const newParams = new URLSearchParams()
        Object.entries(formState).forEach(([key, value]) => {
            if (value) newParams.append(key, value)
        })
        navigate(
            {
                pathname: location.pathname,
                search: newParams.toString()
            },
            { replace: true }
        )
    }, [formState, location.pathname, navigate])

    // 6. 发送请求的核心函数（基于当前 URL 参数）
    const fetchData = async () => {
        // 避免重复请求
        if (loading) return

        setLoading(true)
        setError(null)
        try {
            // 从 URL 参数获取查询条件（也可以直接用 formState）
            const queryString = searchParams.toString()
            const url = `/api/xxx${queryString ? `?${queryString}` : ''}`

            const response = await fetch(url)
            if (!response.ok) throw new Error('请求失败')

            const result = await response.json()
            setData(result) // 存储接口返回数据
        } catch (err) {
            setError(err instanceof Error ? err.message : '未知错误')
        } finally {
            setLoading(false)
        }
    }

    // 7. 处理输入变化
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormState(prev => ({ ...prev, [name]: value }))
    }

    // 8. 处理时间组件变化
    const handleTimeChange = (name: 'start_time' | 'end_time', value: string) => {
        setFormState(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="container">
            {/* 搜索区域 */}
            <div className="search-container">
                {/* 用户ID输入框 */}
                <div className="form-item">
                    <label htmlFor="user_id">用户ID：</label>
                    <input
                        id="user_id"
                        name="user_id"
                        type="text"
                        value={formState.user_id}
                        onChange={handleInputChange}
                        placeholder="请输入用户ID"
                    />
                </div>

                {/* 角色选择框 */}
                <div className="form-item">
                    <label htmlFor="role">角色：</label>
                    <select
                        id="role"
                        name="role"
                        value={formState.role}
                        onChange={handleInputChange}
                    >
                        <option value="">请选择角色</option>
                        <option value="passenger">乘客</option>
                        <option value="driver">司机</option>
                    </select>
                </div>

                {/* 开始时间 */}
                <div className="form-item">
                    <label htmlFor="start_time">开始时间：</label>
                    <input
                        id="start_time"
                        name="start_time"
                        type="datetime-local"
                        value={formState.start_time}
                        onChange={handleInputChange}
                    />
                </div>

                {/* 结束时间 */}
                <div className="form-item">
                    <label htmlFor="end_time">结束时间：</label>
                    <input
                        id="end_time"
                        name="end_time"
                        type="datetime-local"
                        value={formState.end_time}
                        onChange={handleInputChange}
                    />
                </div>

                {/* 搜索按钮 */}
                <div className="form-item">
                    <button
                        type="button"
                        onClick={fetchData}
                        disabled={loading}
                    >
                        {loading ? '搜索中...' : '搜索'}
                    </button>
                </div>
            </div>

            {/* 内容展示区域 */}
            <div className="content-area">
                {error && <div className="error">错误：{error}</div>}

                {loading ? (
                    <div className="loading">加载中...</div>
                ) : data ? (
                    <div>
                        <p>共 {data.total} 条数据</p>
                        <ul>
                            {data.data.map((item, index) => (
                                <li key={index}>{JSON.stringify(item)}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="empty">请点击搜索按钮获取数据</div>
                )}
            </div>
        </div>
    )
}

export default SearchFilter