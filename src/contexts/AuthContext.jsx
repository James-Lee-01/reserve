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
  role: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(false);
  const [role, setRole] = useState("");
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
          setRole(tempPayload.role); // 設置 role
          console.log(role);
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
    setRole(""); // 重置 role
  }

  //針對登入的驗證
  async function login({ email, password }) {
    const { success, authToken, message, role } = await userLogin({
      email,
      password,
    });

    if (!success) {
      console.error("登入失敗:", message);
      return message;
    }

    try {
      const tempPayload = jwt_decode(authToken);
      if (tempPayload) {
        setIsAuthenticated(true);
        setPayload(tempPayload);
        setRole(tempPayload.role); // 設置 role

        localStorage.setItem("authToken", authToken);
        return { success: true, message, role };
      } else {
        // 返回 JWT 解碼失敗的錯誤訊息
        console.error("JWT 解碼錯誤");
        setIsAuthenticated(false);
        setPayload(null);
        setRole(""); // 重置 role
        return { success: false, message, role };
      }
    } catch (error) {
      // 返回 JWT 解碼異常的錯誤訊息
      console.error("JWT 解碼異常:", error);
      setIsAuthenticated(false);
      setPayload(null);
      setRole(""); // 重置 role
      return { success: false, message, role };
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
        role: role // 取得 role
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
