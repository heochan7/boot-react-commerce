import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/join/Join";
import StoreJoin from "./pages/join/StoreJoin";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound"; // 404 컴포넌트 추가

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. 인증이 필요한 보호된 라우트 */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              {/* 여기에 인증 후 Layout이 필요한 페이지 추가 */}
            </Route>
            {/* 여기에 인증은 필요하지만 Layout은 필요 없는 페이지 추가 */}
          </Route>

          {/* 2. 공용 라우트 (Layout 포함) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* 3. 공용 라우트 (Layout 미포함) */}
          <Route path="/login" element={<Login />} />
          <Route path="/user/join" element={<Join />} />
          <Route path="/seller/join" element={<StoreJoin />} />

          {/* 4. 404 Not Found (가장 아래에 위치) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;