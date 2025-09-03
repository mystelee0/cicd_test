import styled from "styled-components";
import "react-quill-new/dist/quill.snow.css"; // 기본 스타일 임포트
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./components/loginPage";
import SignUpPage from "./components/SignUpPage";
import { useState } from "react";
import MainPage from "./components/MainPage";

export default function App() {

  const [user,setUser] = useState({id:"",nickname:""});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage user={user} setUser={setUser}/>} />

        <Route path="/auth/login"  element={<LoginPage setUser={setUser}/>} />
        <Route path="/auth/signup" element={<SignUpPage />} />
      </Routes>

    </BrowserRouter>

  );
}



