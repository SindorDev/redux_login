/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from "antd";
import axios from "../../api/data"
const { TextArea } = Input;

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const NotificationsModal = ({ open, setOpen,  }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("/notifications/create", values);
  
       setInterval(() => {
    if (response.status === 200) {
      setOpen(false);
      window.location.reload()
    }
   }, 1000);
    }
    catch (error) {
      console.log(error);
    }
  };


  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Create Notification"
        open={open}
        onCancel={handleCancel}
        footer={false}
        forceRender={true}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          labelCol={{
            span: 16,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Message"
            name="message"
            rules={[
              {
                required: true,
                message: "Please input your Message!",
              },
            ]}
          >
            <TextArea rows={4} style={{ resize: "none" }} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 24,
              span: 24,
            }}
            style={{
              width: "100% ",
            }}
          >
            <Button
              style={{ width: "100%", marginTop: "10px" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NotificationsModal;
