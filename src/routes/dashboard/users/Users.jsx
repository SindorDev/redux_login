import { useState } from "react";
import { Button, Modal } from "antd";
import { ContentTitle } from "../../../utils/index";
import Table from "../../../components/table/Table"
const Users = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
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
        <Table/>
      </div>


      <Modal title="Add a new User" open={open} onCancel={handleCancel}  footer={false}>

      </Modal>
    </>
  );
};

export default Users;
