import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

// 表单状态类型
interface FormState {
    user_id: string
    role: '' | 'passenger' | 'driver'
    start_time: string
    end_time: string
}

// 接口返回类型
interface ApiResponse {
    data: any[]
    total: number
}

const SearchFilter = () => {
    // 1️⃣ 初始化
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()

    // 2️⃣ 表单状态
    const [formState, setFormState] = useState<FormState>({
        user_id: '',
        role: '',
        start_time: '',
        end_time: ''
    })

    // 3️⃣ 接口请求状态
    const [data, setData] = useState<ApiResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // 4️⃣ 页面加载时从 URL 初始化表单
    useEffect(() => {
        const initial: FormState = {
            user_id: searchParams.get('user_id') || '',
            role: (searchParams.get('role') as FormState['role']) || '',
            start_time: searchParams.get('start_time') || '',
            end_time: searchParams.get('end_time') || ''
        }
        setFormState(initial)
    }, [searchParams])

    // 5️⃣ 发送请求
    const fetchData = async (params: FormState) => {
        if (loading) return
        setLoading(true)
        setError(null)

        try {
            const queryString = new URLSearchParams(
                Object.entries(params).filter(([_, v]) => v)
            ).toString()

            const url = `/api/xxx${queryString ? `?${queryString}` : ''}`
            const response = await fetch(url)

            if (!response.ok) throw new Error('请求失败')

            const result = await response.json()
            setData(result)
        } catch (err) {
            setError(err instanceof Error ? err.message : '未知错误')
        } finally {
            setLoading(false)
        }
    }

    // 6️⃣ 点击搜索时：更新 URL + 发请求
    const handleSearch = () => {
        const newParams = new URLSearchParams()
        Object.entries(formState).forEach(([key, value]) => {
            if (value) newParams.append(key, value)
        })

        navigate(
            {
                pathname: location.pathname,
                search: newParams.toString()
            },
            { replace: false } // false 代表可以保留历史记录
        )

        fetchData(formState)
    }

    // 7️⃣ 监听输入变化（只改 state，不改 URL）
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormState(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="container">
            {/* 搜索区域 */}
            <div className="search-container">
                {/* 用户ID */}
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

                {/* 角色 */}
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
                    <button type="button" onClick={handleSearch} disabled={loading}>
                        {loading ? '搜索中...' : '搜索'}
                    </button>
                </div>
            </div>

            {/* 结果展示 */}
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
