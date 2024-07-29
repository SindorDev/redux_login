/* eslint-disable react/prop-types */
import { Button, Select, Form, Input, Modal } from "antd";
import { useEffect } from "react";
const { TextArea } = Input;

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const NotificationsModal = ({ open, setOpen, updateMessage, setUpdateMessage }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
       const response = await fetch(updateMessage ? `http://localhost:8000/notifications/update` : "http://localhost:8000/notifications/create", {
        method: updateMessage ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("x-auth-token"),
        },
        body: JSON.stringify(values),
      });
      const data = await response.json()
   setInterval(() => {
    if (data.paload) {
      setOpen(false);
      setUpdateMessage(null);
      window.location.reload()
    }
   }, 1000);
    }
    catch (error) {
      console.log(error);
    }
  };
  const handleChange = async (value) => {
    console.log(value);
  };

  useEffect(() => {
    form.setFieldsValue({
      ...updateMessage,
    });

    if (updateMessage === null) {
      form.resetFields();
    }
  }, [updateMessage]);

  const handleCancel = () => {
    setOpen(false);
    setUpdateMessage(null);
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
          initialValue={updateMessage ? updateMessage : null}
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
            
            {
              updateMessage &&
              <Form.Item
                label="Active"
                name="active"
                initialValue={updateMessage && updateMessage?.active}
                rules={[
                  {
                    required: true,
                    message: "Please input your active!",
                  },
                ]}
              >
                <Select
                  defaultValue="true"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: "true", label: "true" },
                    { value: "false", label: "false" },
                  ]}
                />
              </Form.Item>
            }

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
