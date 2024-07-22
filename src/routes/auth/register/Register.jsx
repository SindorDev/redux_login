import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
const { Title, Text } = Typography
import axios from "../../../api/data"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authData = useSelector(state => state)
  const onFinish = async (values) => {
    try{
      dispatch({type: "LOADING"})
    const response = await axios.post("/auth", values)
    console.log(response);
    if(response.status === 200 && response.data.payload.token) {
      dispatch({type: "REGISTER_USER", token: response.data.payload.token, user: response.data.payload.user})
    }
    }
    catch(error) {
      dispatch({type: "ERROR", message: error.response.data.message  || error})
    }
  };
  
  useEffect(() => {
    if(authData.state.token) {
      navigate("/dashboard")
    }
  }, [authData])
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

 
  return (
 
    <div className='shadow-cm flex-col rounded-[10px] w-full max-w-[500px] p-[20px] flex items-center justify-center'>
      <Title>Register</Title>
<Form

    name="basic"
    layout='vertical'
    labelCol={{
      span: 12,
    }}
    style={{
      maxWidth: 600,
    }}
    wrapperCol={{
      span: 24,
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
      name="first_name"
      rules={[
        {
          required: true,
          message: 'Please input your FirstName!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item

    className='w-[350px]'
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your UserName!',
        },
      ]}
    >
      <Input />
    </Form.Item>

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
      <Input.Password />
    </Form.Item>

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
      <Button type="primary" disabled={authData.loading} loading={authData.loading} htmlType="submit" className='w-full'>
        Register
      </Button>
    </Form.Item>
      <Divider>
        Or
      </Divider>
      <div className='ml-[50px] '>
      <GoogleLogin
  onSuccess={async credentialResponse => {
    const decodedData = JSON.parse(atob(credentialResponse.credential.split(".")[1]));
    const user = {
      username: decodedData.email,
      first_name: decodedData.name,
      password: decodedData.sub
    }
    try{
      dispatch({type: "LOADING"})
    const response = await axios.post("/auth", user)
    if(response.status === 200 && response.data.payload.token) {
      dispatch({type: "REGISTER_USER", token: response.data.payload.token, user: response.data.payload.user})
    }
    }
    catch(error) {
      dispatch({type: "ERROR", message: error.response.data.message  || error})
    }
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
      </div>
    <Text className='text-center block my-[20px]'> Already have an account? <Link to='/auth'>Login</Link> </Text>
  </Form>
    </div>
  )
}
export default Register