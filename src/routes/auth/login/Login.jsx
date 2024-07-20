import { Button, Checkbox, Form, Input } from 'antd';

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

 
  return (
 
    <div className='shadow-cm rounded-[10px] w-full max-w-[450px] min-h-[400px] flex items-center justify-center'>
<Form

    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="FirstName"
      name="firstName"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
    </Form.Item>
      <Input />

    <Form.Item
    className='w-[350px]'
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
    </Form.Item>
      <Input />

      <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
    </Form.Item>
      <Input.Password />

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
      className='my-[15px]'
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
      className='ml-[100px] mt-[35px]'
    >
      <Button type="primary" htmlType="submit" className='w-full'>
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}
export default Login