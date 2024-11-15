import React from 'react';
import './style.scss';
import { Button, Form, Input, message } from 'antd';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();


    const onFinish = async () => {
        try {
            const values = form.getFieldValue();
            const response = await login(values);
            console.log(response)
            if (response) {
                message.success('Đăng nhập thành công!');
                navigate('/dashboard');
            } else {
                // Nếu không có token, hiển thị thông báo lỗi từ response.message
                message.error(response?.message || 'Đăng nhập thất bại!');
            }


        } catch (error) {
            console.error(error);
            message.error('Đăng nhập thất bại! Hãy thử lại sau.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <Form
                    form={form}
                    className='form-login'
                    onFinish={onFinish}
                >
                    <h2>LOGIN</h2>
                    <Form.Item
                        className='form-input'
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className='form-input'
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item >
                        <Button className='button' type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login;
