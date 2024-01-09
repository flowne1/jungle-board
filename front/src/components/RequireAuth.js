import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import authStore from "../stores/authStore";

export default function RequireAuth(props) {
  const store = authStore();
  const location = useLocation();

  useEffect(() => {
    // 라우트가 변경될 때마다 인증 상태를 확인
    store.checkAuth();
  }, [location]); // location을 의존성 배열에 추가하여 라우트 변경 시마다 실행

  if (store.loggedIn === null) {
    return <div>Loading . . .</div>;
  }

  if (store.loggedIn === false) {
    return <Navigate to="/login"></Navigate>;
  }

  return <div>{props.children}</div>;
}
