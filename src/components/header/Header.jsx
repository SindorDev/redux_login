/* eslint-disable react/prop-types */
import {
     MenuFoldOutlined,
     MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout,  } from 'antd';   
const { Header} = Layout;
const HeaderComponent = ({collapsed, setCollapsed}) => {
  return (
     <Header
     style={{
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
   </Header>
  )
}

export default HeaderComponent