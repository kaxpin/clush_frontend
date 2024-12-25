import { App as  AntdApp} from 'antd';

export default function Modal(){
    
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

  const showNotification = () => {
      notification.info({
        message: 'Notification topLeft',
        description: 'Hello, Ant Design!!',
        placement: 'bottomRight',
        duration: 1.2
      });
  };

   

}

 