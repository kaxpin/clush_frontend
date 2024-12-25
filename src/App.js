import React, { useEffect, useState } from 'react';
import { App as AntdApp } from 'antd';
import { Layout } from 'antd';
import { BrowserRouter, Routes, useLocation } from 'react-router-dom';
import Headers from './components/Headers';
import Contents from './components/Contents';

const App = () => {
  const { Footer } = Layout;
  const [menuType, setMenuType] = useState('');


  const { message, modal, notification } = AntdApp.useApp();

  const showMessage = (msg) => {
    message.success(msg);
  };

  const showModal = () => {
    modal.centeredwarning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
      centered: true,
      duration: 0.9
    });
  };

  const showNotification = (item) => {
    notification.info({
      message: item?.message || "message",
      description: item?.description || "description",
      placement: 'bottomLeft',
      duration: 1.2
    });
  };


  return (
    <Layout>
      <BrowserRouter>
        <SideEffectComp menuType={menuType} setMenuType={setMenuType} />
        <Headers menuType={menuType} setMenuType={setMenuType} onModal={showNotification} />
        <Contents menuType={menuType} setMenuType={setMenuType} onModal={showNotification} />
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </BrowserRouter>
    </Layout>
  );
};

const SideEffectComp = (props) => {
  const location = useLocation();

  useEffect(() => {
    props.setMenuType(location.pathname.replace("/", ""))
  }, [location]);



  return null;
}

export default App;
