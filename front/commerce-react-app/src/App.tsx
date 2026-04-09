import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Join from "./pages/Join";

import './App.css'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}></Route>
          </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/join" element={<Join/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
