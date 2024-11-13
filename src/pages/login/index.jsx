import React from 'react';
import './style.scss';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const respone = await login(values);
            console.log(respone)
            message.success('Đăng nhập thành công!');
            navigate('/dashboard')

        } catch (error) {
            console.error(error);
            message.error('Đăng nhập thất bại!');
        }
    };
    return (
        <>
            <div className="login-container">
                <div className="login-content">

                    <Form
                        className='form-login'
                        onFinish={onFinish}
                    >
                        <h2>LOGIN</h2>
                        <Form.Item
                            className='form-input'
                            label="email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className='form-input'
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item >
                            <Button className='button' type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        </>

    )
}

export default Login