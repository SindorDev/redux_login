/* eslint-disable react/prop-types */
import {
     MenuFoldOutlined,
     MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout,  } from 'antd';
import { Link } from 'react-router-dom';   
const { Header} = Layout;
const HeaderComponent = ({collapsed, setCollapsed}) => {
  return (
     <Header
     style={{
      display: "flex",
       justifyContent: "space-between",
       padding: 0,
       background: "#fff",
     }}
   >
     <Button
       type="text"
       icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
       onClick={() => setCollapsed(!collapsed)}
       style={{
         fontSize: '16px',
         width: 64,
         height: 64,
       }}

     />
     
     <Link className="mr-[80px]" to={"/"}>
       <Button className="bg-slate-400 text-white">
         Home
       </Button>
        </Link>
   </Header>
  )
}

export default HeaderComponent