import jwt_decode from "jwt-decode";
import { userLogin } from "../api/auth";
import { useState, useEffect, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";


//先設定default狀態
const defaultAuthContext = {
  login: null,
  logout: null,
  currentUser: null,
  isAuthenticated: false,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(false);
  const { pathname } = useLocation();

  //換路由時驗證token攜帶正確與否
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem("authToken");

      //確認是否有token
      //若沒有
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }

      //若有，確認攜帶的token是否許可
      if (authToken) {
        const tempPayload = jwt_decode(authToken);
        //解碼token檢查
        //若不許可，返回設定值
        if (!tempPayload) {
          setIsAuthenticated(false);
          setPayload(null);
          return;
        }
        //若許可，認證
        if (tempPayload) {
          setIsAuthenticated(true);
          setPayload(tempPayload);
        }
      }
    };
    checkTokenIsValid();
  }, [pathname]);

  //針對登出的狀態
  function logout() {
    //remove token
    localStorage.removeItem("authToken");
    //reset state
    setIsAuthenticated(false);
    setPayload(null);
  }

  //針對登入的驗證（判斷是否為前台或後台人員）
  async function login({ email, password }) {
    const { success, authToken } = await userLogin({
      email,
      password,
    });

    const tempPayload = jwt_decode(authToken);
    if (tempPayload) {
      setIsAuthenticated(true);
      setPayload(tempPayload);

      localStorage.setItem("authToken", authToken);
      return success;
    } else {
      setIsAuthenticated(false);
      setPayload(null);
    }
  }

  //畫面輸出相關
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser: payload,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
