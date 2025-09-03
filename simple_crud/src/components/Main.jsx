import { useEffect, useState } from "react";
import styled from "styled-components";
import InsertPopup from "./InsertPopup";
import axios from "axios";
import { useNavigate } from "react-router";

function Main({user, setUser}) {
    const blankForm = { title: "", nickname: "" , content: "" , id:""};
    const [posts, setPosts] = useState([
        //{ id: 1, title: "첫 번째 글", author: "홍길동", date: "2025-08-11", content: "hello"},
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [view, setView] = useState(true);
    const [form, setForm] = useState(blankForm);
    const navigate = useNavigate();

    const handlePostClick = (e, postId) => {
        
        setView(true);
        setIsModalOpen(true);
        axios.get(`http://localhost:8080/posts/${postId}`)
        .then((res)=>{
          console.log(res.data);
          setForm({
            postid:res.data.postid,
            title: res.data.title,
            nickname:res.data.nickname,
            id: res.data.id,
            content: res.data.content || ""
        })
        })
        
    };
    const openModal=()=>{
        setView(false);
        setIsModalOpen(true);
        setForm(blankForm);
    }
    const closeModal=()=>{
        setIsModalOpen(false);
    }
    useEffect(()=>{
      axios.get("http://localhost:8080/auth/me",{withCredentials:true})
      .then((res)=>{
        setUser(res.data);
        alert(`환영합니다. ${res.data.nickname}님`)
      }).catch((err)=>{
        alert("로그인 페이지로 이동합니다.");
        navigate("/auth/login");
    })
    },[])

    useEffect(()=>{
axios.get("http://localhost:8080/posts")
    .then((res)=>{
      console.log(res.data);
      setPosts(res.data);
    })
    },[isModalOpen])
    
    return (
        <>
            <Container>
                <ButtonArea>
                    <WriteButton onClick={openModal}>✏️ 글쓰기</WriteButton>
                </ButtonArea>

                <PostTable>
                    <thead>
                        <tr>
                            <Th>번호</Th>
                            <Th>제목</Th>
                            <Th>작성자</Th>
                            <Th>작성일</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <NoData colSpan="4">게시글이 없습니다.</NoData>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.postid}>
                                    <Td>{post.postid}</Td>
                                    <PostTitle onClick={e => handlePostClick(e, post.postid)}>{post.title}</PostTitle>
                                    <Td>{post.id}</Td>
                                    <Td>{post.date.replace("T"," ")}</Td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </PostTable>
            </Container>

            {/* 모달 */}
            {isModalOpen && (
                <InsertPopup closeModal={closeModal} user={user} view={view} setView={setView} form={form} setForm={setForm} posts={posts} setPosts={setPosts}/>
            )}
        </>
    )
}

export default Main;

const Container = styled.div`
  flex: 1;
  max-width: 1200px;
  min-width: 800px;
  margin: 20px auto;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const ButtonArea = styled.div`
  text-align: right;
  margin-bottom: 10px;
`;

const WriteButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #45a049;
  }
`;

const PostTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const Td = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const PostTitle = styled(Td)`
  text-align: left;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const NoData = styled.td`
  padding: 20px;
  color: #777;
  text-align: center;
`;