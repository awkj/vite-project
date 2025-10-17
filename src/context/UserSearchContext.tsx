// UserSearchContext.tsx
import { createContext, type ReactNode, useCallback, useContext, useEffect, useReducer } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchUserDataWithCache } from '../services/api'
import type {
    TabKey,
    UserSearchAction,
    UserSearchState
} from '../types'

const initialState: UserSearchState = {
    activeTab: 'info',
    userId: '',
    data: { info: null, order: null, cart: null },
    loading: { info: false, order: false, cart: false },
    error: { info: null, order: null, cart: null }
}

function reducer(
    state: UserSearchState,
    action: UserSearchAction
): UserSearchState {
    switch (action.type) {
        case 'SET_ACTIVE_TAB':
            return { ...state, activeTab: action.payload }
        case 'SET_USER_ID':
            return { ...state, userId: action.payload }
        case 'FETCH_START':
            return {
                ...state,
                loading: { ...state.loading, [action.payload]: true }
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: { ...state.loading, [action.payload.tab]: false },
                data: { ...state.data, [action.payload.tab]: action.payload.data }
            }
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: { ...state.loading, [action.payload.tab]: false },
                error: { ...state.error, [action.payload.tab]: action.payload.error }
            }
        default:
            return state
    }
}

interface UserSearchContextType extends UserSearchState {
    switchTab: (tab: TabKey) => void
    updateUserId: (id: string) => void // 只更新URL，不发起请求
    fetchData: () => Promise<void> // 发起请求
    fetchTabData: (tab: TabKey) => Promise<void>
}

const UserSearchContext = createContext<UserSearchContextType | undefined>(undefined)

export function UserSearchProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const location = useLocation()
    const navigate = useNavigate()

    // 从路由同步状态
    useEffect(() => {
        const userId = new URLSearchParams(location.search).get('id') || ''
        const hashTab = location.hash.slice(1)
        let activeTab: TabKey = 'info'
        if (hashTab === 'info' || hashTab === 'order' || hashTab === 'cart') {
            activeTab = hashTab
        }

        dispatch({ type: 'SET_USER_ID', payload: userId })
        dispatch({ type: 'SET_ACTIVE_TAB', payload: activeTab })
    }, [location.search, location.hash])

    // 通用的数据获取方法 - 使用useCallback避免无限循环
    const fetchTabData = useCallback(async (tab: TabKey) => {
        if (!state.userId) return

        dispatch({ type: 'FETCH_START', payload: tab })
        try {
            const data = await fetchUserDataWithCache(tab, state.userId)

            if (data) {
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: { tab, data } as any
                })
            }
        } catch (err) {
            dispatch({
                type: 'FETCH_ERROR',
                payload: {
                    tab,
                    error: err instanceof Error ? err.message : '未知错误'
                }
            })
        }
    }, [state.userId])

    // 注意：现在不再在userId变化时自动发起请求，而是通过fetchData和fetchTabData方法手动控制请求

    // 切换Tab
    const switchTab = (tab: TabKey) => {
        // preserve pathname and search, set new hash
        navigate(`${location.pathname}${location.search}#${tab}`)
    }

    // 更新用户ID到URL - 只更新URL，不发起请求
    const updateUserId = (id: string) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set('id', id)
        // keep existing hash
        const search = searchParams.toString()
        const hash = location.hash ?? ''
        navigate(`${location.pathname}${search ? `?${search}` : ''}${hash}`)
    }

    // 发起数据请求
    const fetchData = async () => {
        if (!state.userId) return
        await fetchTabData(state.activeTab)
    }

    return (
        <UserSearchContext.Provider
            value={{
                ...state,
                switchTab,
                updateUserId,
                fetchData,
                fetchTabData
            }}
        >
            {children}
        </UserSearchContext.Provider>
    )
}

// useUserSearch Hook
export function useUserSearch() {
    const context = useContext(UserSearchContext)
    if (context === undefined) {
        throw new Error('useUserSearch must be used within a UserSearchProvider')
    }
    return context
}