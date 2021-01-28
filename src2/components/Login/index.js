import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import "./index.css"
import data from "./data.json"


export default class Login extends Component {
    render() {
        const layout = {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          };
          const tailLayout = {
            wrapperCol: {
              offset: 8,
              span: 16,
            },
          };
          
          const Demo = () => {
            const onFinish = (values) => {
              console.log('Success:', values);
            };
          
            const onFinishFailed = (errorInfo) => {
              console.log('Failed:', errorInfo);
            };
        }

        const onFinish = (e)=>{
          if(e.username ==="admin" && e.password ==="admin"){
            let data = {
              login:1
            }
            var content = JSON.stringify(data);
            
            window.location.href = '/home'
          }
        }
        return (
          <div className="wrapper">
          <div className = "inner">
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
      
            <Form.Item
              label="密码"
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
      
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
      
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          </div>
          </div>
        );
      };
}
