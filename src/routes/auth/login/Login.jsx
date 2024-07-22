import { Button, Checkbox, Form, Input, Typography, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
const { Title, Text } = Typography
import axios from "../../../api/data"
import { useDispatch, useSelector, } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const authData = useSelector(state => state)

  const onFinish = async (values) => {
    console.log('Success:', values);
    try{
      dispatch({type: "LOADING"})
    const response = await axios.post("/auth/login", values)
    console.log(response);
    if(response.status === 200 && response.data.payload.token) {
      dispatch({type: "LOGIN_USER", token: response.data.payload.token, user: response.data.payload.user})
      form.resetFields()
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
 
    <div className='shadow-cm rounded-[10px] w-full max-w-[500px]  py-[20px] flex-col flex items-center justify-center'>
      <Title>Login</Title>
<Form
  form={form}
    name="basic"
    layout='vertical'
    style={{
      maxWidth: 600,
    }}
    labelCol={{
      span: 8,
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
        span: 16,
      }}
      className='ml-[100px] mt-[35px]'
    >
      <Button type="primary" disabled={authData.loading} loading={authData.loading} htmlType="submit" className='w-full'>
        Submit
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
      password: decodedData.sub
    }
    try{
      dispatch({type: "LOADING"})
    const response = await axios.post("/auth/login", user)
    if(response.status === 200 && response.data.payload.token) {
      navigate("/")
      dispatch({type: "LOGIN_USER", token: response.data.payload.token, user: response.data.payload.user})
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
      <Text className='text-center block my-[20px]'> Dont have an account? <Link to={"/auth/register"} >Register</Link> </Text>
  </Form>
    </div>
  )
}
export default Login