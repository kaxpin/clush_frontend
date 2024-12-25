import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { LaptopOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import Sider from "antd/es/layout/Sider";

export default function Sidebar(props) {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const sideNavInfo = [
        {
            name: "내 캘린더",
            icon: UserOutlined,
            detail: ""
        },
        {
            name: "팀 캘린더",
            icon: LaptopOutlined,
            detail: ""
        },
        {
            name: "환경설정",
            icon: UsergroupAddOutlined,
            detail: ""
        },


    ];
    const items2 = sideNavInfo.map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `sub${key}`,
                icon: React.createElement(icon.icon),
                // label: `subnav ${key}`,
                label: icon.name,

                children:
                    new Array(1).fill(null).map((_, j) => {
                        const subKey = index * 4 + j + 1;
                        return {
                            key: subKey,
                            label: `일정추가`,
                        };
                    }),
            };
        },
    );

    function handleClick(key) {

    }

    return (
        <>
            <Sider style={{ background: colorBgContainer }} width={200}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                    items={items2}
                    onClick={(e) => { handleClick(e.key) }}
                />
            </Sider>

        </>
    )

}
