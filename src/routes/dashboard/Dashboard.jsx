import { Layout } from "antd"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import Sidebar from "../../components/side/Sidebar"
import  Header  from "../../components/header/Header"
const { Content } = Layout;
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false)
 
  return (
    <Layout className="h-screen">
        <Sidebar collapsed={collapsed}/>
        <Layout>
            <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
            <Content
         style={{
           margin: '24px 16px',
           padding: 24,
           minHeight: 280,
           background: "#fff",
         }}
       >
        <Outlet/>
       </Content>

        </Layout>
    </Layout>
  )
}

export default Dashboard