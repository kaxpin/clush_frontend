import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../auth/auth";

export default Headers = (props) => {

  const { isAuthenticated, logout } = useAuthStore();

  const items1 = ['Calendar', 'Todo', (!isAuthenticated ? 'Login' : 'Logout')].map((key) => ({
    key,
    label: `${key}`,
  }))
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickMenu = (param) => {

    if (!isAuthenticated) {

      if (location.pathname === "/Login") {
        props.onModal({
          message: "알림",
          description: "로그인을 해주세요"
        });
      }

      navigate('/Login')
      return
    }

    if (param === "Logout") {
      props.setMenuType(param)
      logout()
      navigate('/Login')
      return
    }

    props.setMenuType(() => {
      navigate('/' + param)
      return param
    })
  }

  useEffect(() => {

  }, [props.menuType])

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        // defaultSelectedKeys={['Calendar']}
        items={items1}
        style={{
          flex: 1,
          minWidth: 0,
        }}
        onClick={(e) => { handleClickMenu(e.key) }}
        selectedKeys={[props.menuType ? `${props.menuType[0].toUpperCase()}${props.menuType.slice(1)}` : '']}
      />
    </Header>
  )
}