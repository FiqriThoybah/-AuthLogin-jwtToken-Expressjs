import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./App.css"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    // const {form} = Form.useForm();
    const handleFormInput = (event) => {
      setValues(event.target.name, event.target.value);
    };
    axios.defaults.withCredentials = true;
    const handleSubmit = async () => {
        // event.preventDefault();
        // form.resetFields();   
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/')
            }else{
                alert(res.data.Message)
                setValues({
                  email: '',
                  password: ''
                })
                
            }
        })
        .catch(err => console.log(err));
    };


//   const onFinish = (values) => {
//     console.log("Received values of form: ", values);
//   };

  return (
    <Form 
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: false,
        email: '',
        password: ''
      }}
    //   onFinish={onFinish}
      onFinish={handleSubmit}
      // form={form}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          onChange={e => setValues({...values, email: e.target.value})}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={e => setValues({...values, password: e.target.value})}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button"
        >
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};
