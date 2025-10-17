// Info.tsx
import { type FC } from 'react'
import type { UserInfo } from '../types'

interface InfoProps {
    data: UserInfo | null
}

const Info: FC<InfoProps> = ({ data }) => {
    if (!data) {
        return <div className="empty-state">请输入用户ID并搜索</div>
    }

    return (
        <div className="info-container">
            <h3>用户身份信息</h3>
            <dl>
                <dt>用户ID</dt>
                <dd>{data.id}</dd>
                <dt>姓名</dt>
                <dd>{data.name}</dd>
                {data.age && (
                    <>
                        <dt>年龄</dt>
                        <dd>{data.age}</dd>
                    </>
                )}
                {/* 其他字段 */}
            </dl>
        </div>
    )
}

export default Info