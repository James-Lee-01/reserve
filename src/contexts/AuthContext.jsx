import jwt_decode from "jwt-decode";
import { userLogin } from "../api/auth";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";


//先設定default狀態
const defaultAuthContext = {
  login: null,
  logout: null,
  currentUser: null,
  isAuthenticated: false,
  role: null,
  isUserChange: false,
  setIsUserChange: () => {},
  identified: false,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const [role, setRole] = useState("");
  const [isUserChange, setIsUserChange] = useState();
  const [identified, setIdentified] = useState(false)

  const isAuthenticatedRef = useRef(isAuthenticated);
  const roleRef = useRef(role);

  const { pathname } = useLocation();

  //換路由時驗證token攜帶正確與否
  useEffect(() => {
    console.log("isUserChange value:", isUserChange);
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem("authToken");

      //確認是否有token
      //若沒有
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        setIdentified(true);
        return;
      }

      try {
        const tempPayload = await jwt_decode(authToken);

        if (tempPayload && tempPayload.role) {
          setIsAuthenticated(true);
          setPayload(tempPayload);
          setRole(tempPayload.role);
          isAuthenticatedRef.current = true;
          roleRef.current = tempPayload.role;
          setIdentified(true);
        } else {
          setIsAuthenticated(false);
          setPayload(null);
          setRole("");
          isAuthenticatedRef.current = false;
          roleRef.current = "";
          setIdentified(true);
        }
      } catch (error) {
        console.error("JWT 解碼異常:", error);
        setIsAuthenticated(false);
        setPayload(null);
        setRole("");
        isAuthenticatedRef.current = false;
        roleRef.current = "";
        setIdentified(true);
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

    setIsUserChange(true); //設置 isUserChange

    try {
      const tempPayload = jwt_decode(authToken);
      if (tempPayload && tempPayload.role) {
        setIsAuthenticated(true);
        setPayload(tempPayload);
        setRole(tempPayload.role); // 設置 role
        isAuthenticatedRef.current = true;
        roleRef.current = tempPayload.role;


        localStorage.setItem("authToken", authToken);
        return { success: true, message, role };
      } else {
        // 返回 JWT 解碼失敗的錯誤訊息
        console.error("JWT 解碼錯誤");
        setIsAuthenticated(false);
        setPayload(null);
        setRole(""); // 重置 role
        isAuthenticatedRef.current = false;
        roleRef.current = "";
        return { success: false, message, role };
      }
    } catch (error) {
      // 返回 JWT 解碼異常的錯誤訊息
      console.error("JWT 解碼異常:", error);
      setIsAuthenticated(false);
      setPayload(null);
      setRole(""); // 重置 role
      isAuthenticatedRef.current = false;
      roleRef.current = "";
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
        role: role, // 取得 role
        isUserChange,
        setIsUserChange,
        identified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
