import { UserOutlined, ProductFilled } from "@ant-design/icons";
import { Layout, Button,  Modal, Menu, Avatar, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch"
import { LiaDoorOpenSolid } from "react-icons/lia";
import { useState } from "react";
import { useDispatch } from "react-redux";
const { Sider } = Layout;
const {Text} = Typography

// eslint-disable-next-line react/prop-types, no-unused-vars
const Sidebar = ({ collapsed }) => {
  const dispatch = useDispatch()
  const [data] = useFetch("/auth/profile")

  const userInfo = data.payload


  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Do you really want to log out?');
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('Checkout completed successfully');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      dispatch({type: "SIGN_OUT"})

    }, 1500)
  };


  const handleCancel = () => {
    setOpen(false);
  };

  const handleRemoveUser =  () => {
    showModal()
  }
  return (
    <>
      <Modal
        title="Logout"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    <Sider trigger={null} collapsible collapsed={collapsed} className="px-[5px] py-[10px] flex flex-col justify-between ">
      
    <NavLink  className="flex p-5  whitespace-nowrap overflow-hidden gap-2 items-center" to={"/dashboard/profile"}>
        
    <Avatar
     style={{
      fontSize: "16px",
      backgroundColor: '#87d068',
      color: '#fff',
    }} >
      {userInfo?.first_name[0]}
    </Avatar>
          {!collapsed && 
      <Text className="text-white  flex flex-col">
        
              <span>{userInfo?.first_name}</span>
              <span className="text-[12px]">{userInfo?.role}</span>
      </Text>}
    </NavLink>
      <Menu
      className="flex-1"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <ProductFilled />,
            label: <NavLink to={""}>Products</NavLink>,
          },
          {
            key: "2",
            icon: <UserOutlined />,
            label: <NavLink to={"users"}>Users</NavLink>,
          },
        ]}
      />
      <Button className="bg-red-500 w-full p-5 mb-[20px]" onClick={handleRemoveUser} type="primary"><LiaDoorOpenSolid size={"24px"} />{!collapsed && "Sign Out"}</Button>
    </Sider>    
    </>
  )
}

export default Sidebar;
