import Content from "./components/Content"
import Input from "./components/Input"
import TabSwitch from "./components/TabSwitch"
import { UserSearchProvider } from "./context"

export default function App() {
    return (
        <UserSearchProvider>
            <div className="main-container">
                <Input />
                <TabSwitch />
                <Content />
            </div>
        </UserSearchProvider>
    )
}