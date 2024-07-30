import { useState } from "react";
import { Button } from "antd";
import { ContentTitle } from "../../../utils/index";
import TableComponent from "../../../components/table/Table";
import NotificationsModal from "../../../components/notifactionsModal/NotificationsModal";
import axios from "../../../api/data";

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const handleUpdateMessage = async (id) => {
 
    try {
      const response = await axios.patch("/notifications/update", {
        id,
        active: false
      }, trigger );

      console.log(response);
      window.location.reload()
      setTrigger(!trigger)
    }
    catch(error) {
      console.log(error);
    }
 
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`notifications/delete/${id}`, trigger);
      setTrigger(!trigger)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
    console.log(trigger);
  };


  const columns = [


    {
      count: 1,
      title: 'No',
      key: "id",
      render: (data, current, index) =>
        tableParams.pagination.current * tableParams.pagination.pageSize -
        tableParams.pagination.pageSize + (index + 1),
    },
    {
      key: "name",
      title: 'Name',
      dataIndex: 'message',
      render: (message) => `${message}`,
    },
    {
      key: "active",
      title: 'Active',
      dataIndex: 'active',
      render: (active) => `${active}`,
    },
    
    {
      key: "Created At",
      title: 'Created At',
      dataIndex: 'announcedDate',
      render: (data) => new Date(data).toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
    },
    {
      key: "Action",
      title: "Action",
      render: (product) => (
        <div className="flex items-center gap-2 ">
          <Button
            className="bg-yellow-400 text-white"
            onClick={() => handleUpdateMessage(product._id)}
          >
            Read
          </Button>
          <Button
            danger
            onClick={() => handleDeleteMessage(product._id)}
            type="primary"
          >
            Delete
          </Button>
        </div>
      ),
      with: "10%",
    },
  ];

  const handleAddMessage = () => {
    showModal();
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <ContentTitle>Notifications</ContentTitle>
          <Button type="primary" onClick={handleAddMessage}>
            Add a new Message
          </Button>
        </div>
      </div>

      <div>
        <TableComponent
          tableParams={tableParams}
          setTableParams={setTableParams}
          columns={columns}
          url="/notifications/all"
        />
      </div>

      <NotificationsModal
        open={open}
        setOpen={setOpen}
        forceRender={true}
        showModal={showModal}
      />
    </>
  );
};

export default Notifications;
