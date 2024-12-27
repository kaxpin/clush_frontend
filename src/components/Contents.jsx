import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CalendarApp from '../pages/calendar/CalendarApp';
import TodoApp from '../pages/todo/TodoApp';
import Login from '../auth/Login';
import Sidebar from './Sidebar';
import Register from '../auth/Register';
import useAuthStore from '../auth/auth';

export default function Contents(props) {


    const { isAuthenticated, login, logout } = useAuthStore();
    const { Content, Sider } = Layout;
    const location = useLocation();

    useEffect(() => {

    }, [location])

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content style={{ padding: '0 48px' }}>
            <>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                    <Breadcrumb.Item>{props.menuType}</Breadcrumb.Item>
                </Breadcrumb>
            </>
            <Layout
                style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
            >
                {isAuthenticated && <Sidebar />}
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <Routes>
                        <Route path='/' element={<CalendarApp onModal={props.onModal} />} />
                        <Route path='/Login' element={<Login />} />
                        <Route path='/Calendar' element={<CalendarApp onModal={props.onModal} />} />
                        <Route path='/Todo' element={< TodoApp />} />
                        <Route path='/Register' element={<Register />} />

                    </Routes>
                </Content>

            </Layout>
        </Content>
    )
}