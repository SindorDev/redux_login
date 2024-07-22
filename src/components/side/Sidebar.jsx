import { UserOutlined, ProductFilled } from "@ant-design/icons";
import { Layout, Menu, Avatar, Typography } from "antd";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const { Sider } = Layout;
const {Text} = Typography

// eslint-disable-next-line react/prop-types, no-unused-vars
const Sidebar = ({ collapsed }) => {

  const authData = useSelector(state => state)

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="py-[10px]">
      
      <div className="flex  items-center">
      <Avatar
      size={35}
      style={{
        marginInline: "20px",
        marginBlock: "15px",
        backgroundColor: '#87d068',
      }}
      icon={<UserOutlined />}
    />
      <Text className="text-white overflow-hidden whitespace-nowrap">
        <span>{authData?.state?.user?.username || "John Doe"}</span>
          <br/>
        <span className="text-[12px]">{authData?.state?.user?.username || "User"}</span>
      </Text>
      </div>
      <Menu
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
    </Sider>
  );
};

export default Sidebar;
