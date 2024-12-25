import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TodoApp() {

  const location = useLocation();

  useEffect(() => {
  }, [location])

  return <div>개발 미시작</div>

}