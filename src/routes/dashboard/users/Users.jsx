import { useState } from "react";
import { Button, Modal } from "antd";
import { ContentTitle } from "../../../utils/index";
import TableComponent from "../../../components/table/Table";
import axios from "../../../api/data";
const Users = () => {
  const [open, setOpen] = useState(false);
  const [promoteUserName, setPromoteUserName] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('Are you sure you want to delete the user admin?');

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const handlePromoteUser = (user) => {
    setModalOpen(true)
    setPromoteUserName(user.username);
  }
  const handleOk = async () => {

    try {
      const response = await axios.post("/admin/add-admin",{
        username: promoteUserName
      } )
      console.log(response);
      setModalText('The user was promoted successfully');
      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 1100);
      
    }
    catch(error) {
      console.log(error);
    }
  };



  const columns = [



    {
      count: 1,
      title: 'No',
      key: "id",
      render: (data, current, index) => tableParams.pagination.current * tableParams.pagination.pageSize - tableParams.pagination.pageSize + (index + 1),
    },
    {
      key: "id",
      title: 'ID',
      dataIndex: '_id',
      render: (id) => `${id}`,
      sorter: true,
    },
    {
      key: "name",
      title: 'Name',
      dataIndex: 'first_name',
      render: (first_name) => `${first_name}`,
      sorter: true,
    },
    
    {
      key: "username",
      title: 'UserName',
      dataIndex: 'username',
      render: (UserName) => `${UserName}`,
      sorter: true,
    },
    
    {
      key: "role",
      title: 'Role',
      dataIndex: 'role',
      render: (role) => `${role}`,
      sorter: true,
    },
    
    {
      key: "registeredAt",
      title: 'Created At',
      dataIndex: 'registeredAt',
      render: (data) => new Date(data).toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
      sorter: true,
    },
    {
    key: "Action",
    title: 'Action',
    render: (product) => (
      <div className="flex items-center gap-2 ">
        <Button type="primary" onClick={() => handlePromoteUser(product)}>Promote</Button>
      </div>
    ),
    }
  ]

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setModalOpen(false)
    setModalText('user failed to downgrade to admin')
  };



  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <ContentTitle>Users</ContentTitle>
          <Button type="primary" onClick={showModal}>
            Add a new user
          </Button>
        </div>
      </div>

      <div>
          <TableComponent tableParams={tableParams} setTableParams={setTableParams} columns={columns} url="/admin/registered-users"/>
      </div>


      <Modal title="Add a new User" open={open} onCancel={handleCancel}  footer={false} />



      <Modal
        title="Title"
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default Users;
