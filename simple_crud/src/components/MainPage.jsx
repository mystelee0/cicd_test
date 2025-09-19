import styled from "styled-components";
import Main from "./Main";
import axios from "axios";
import { useNavigate } from "react-router";

function MainPage({ user,setUser }) {
    const navigate = useNavigate();
    const serverIp = import.meta.env.VITE_SERVER_IP;
    return (
        <Page>
            <Header>
                <HeaderContent>
                    <span>{`안녕하세요 ${user.nickname}님.`}</span>
                    <Title>📋 React CRUD 게시판 v09050919</Title>
                    <button onClick={()=>{
                        axios.get(`https://${serverIp}/auth/signout`,{withCredentials:true})
                        .then((res)=>{
                            alert(res.data);
                            navigate("/auth/login");
                        })
                    }}>로그아웃</button>
                </HeaderContent>

            </Header>

            <Main user={user} setUser={setUser}/>

                <Footer>
                    <p>© 2025 My Board App</p>
                </Footer>
        </Page>
    )
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
  font-family: "Noto Sans KR", sans-serif;
`;

const Header = styled.header`
  background-color: #4caf50;
  padding: 15px;
  text-align: center;
  color: white;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Title = styled.h1`
  margin: 0;
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 14px;
`;

export default MainPage;