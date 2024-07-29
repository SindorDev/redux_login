import { BiNotification } from "react-icons/bi"; 
import { BiCartAlt } from "react-icons/bi"; 
import { UserOutlined, ProductFilled } from "@ant-design/icons";
import { Layout, Button,  Modal, Menu, Avatar, Typography, Badge } from "antd";
import { NavLink } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch"
import { LiaDoorOpenSolid } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
const { Sider } = Layout;
const {Text} = Typography

// eslint-disable-next-line react/prop-types, no-unused-vars
const Sidebar = ({ collapsed }) => {
  const dispatch = useDispatch()
  const [data] = useFetch("/auth/profile")
  const userInfo = data.payload
  const role = userInfo?.role;

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Do you really want to log out?');
  const [{payload}] = useFetch("notifications/all")

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
      
    <NavLink  className="flex p-5  whitespace-nowrap overflow-hidden gap-5 items-center" to={"/dashboard/profile"}>
        
    <Badge count={payload?.length} overflowCount={9} size="small">
    <Avatar
     style={{
      fontSize: "16px",
      backgroundColor: '#87d068',
      color: '#fff',
    }} >
      {userInfo?.first_name[0]}
    </Avatar>
    </Badge>

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
        items={role === "admin" ? 
          [
            {
              key: "1",
              icon: <ProductFilled size={24} />,
              label: <NavLink to={""}>Products</NavLink>,
            },
            {
              key: "2",
              icon: <UserOutlined size={24} />,
              label: <NavLink to={"users"}>Users</NavLink>,
            },
            
            {
              key: "3",
              icon: <FaHeart size={17} />,
              label: <NavLink to={"liked-products"}>LikedProducts</NavLink>,
            },
            {
              key: "4",
              icon: <BiCartAlt size={20} />,
              label: <NavLink to={"productCart"}>Cart</NavLink>,
            },
            {
              key: "5",
              icon: <BiNotification size={20} />,
              label: <NavLink to={"notifications"}>Notifications</NavLink>,
            }
          ]
          :
          [
            
          {
            key: "1",
            icon: <FaHeart size={17} />,
            label:  <NavLink to={"liked-products"}>LikedProducts</NavLink>,
          },
          {
            key: "2",
            icon: <BiCartAlt size={20} />,
            label: <NavLink to={"productCart"}>Cart</NavLink>,
          },
          {
            key: "3",
            icon: <BiNotification size={20} />,
            label: <NavLink to={"notifications"}>Notifications</NavLink>,
          }
          ]
        }
      />
      <Button className="bg-red-500 w-full p-5 mb-[20px]" onClick={handleRemoveUser} type="primary"><LiaDoorOpenSolid size={"24px"} />{!collapsed && "Sign Out"}</Button>
    </Sider>
    </>
  )
}

export default Sidebar;
