import React, { useState } from 'react';
import { Typography, Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { onLogin } from './authApiService';
import useAuthStore from './auth';

export default function Login() {

    const { isAuthenticated, login, logout } = useAuthStore();

    const navigate = useNavigate();
    const { Title } = Typography;

    const clickLogin = (values) => {

        onLogin(values)
            .then((res) => {
                console.log(res)
                if (!res.data.data) {
                    alert("아이디와 비밀번호를 확인해 주세요.")
                    return
                }

                login(values.userId)
                navigate('/Calendar')
            })

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (<>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 17 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={clickLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item>
                <Title level={3} style={{ textAlign: 'right' }}>
                    로그인
                </Title>
            </Form.Item>


            <Form.Item
                label="Id"
                name="userId"
                rules={[{ required: true, message: 'Please input your Id!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="userPw"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null} style={{ marginTop: '50px' }}>
                <Button type="primary" htmlType="submit">
                    로그인
                </Button>
                <Button type="default" htmlType="button" style={{ marginLeft: '10px' }}
                    onClick={() => { navigate('/Register') }} >
                    회원이 아니신가요? 회원가입
                </Button>




            </Form.Item>
        </Form>
    </>
    )
}