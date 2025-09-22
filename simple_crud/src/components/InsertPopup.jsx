import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill-new";
import QuillResizeImage from 'quill-resize-image';
import axios from "axios";

if (typeof window !== 'undefined' && window.Quill) {
    window.Quill = Quill;
}

const blankForm = { title: "", nickname: "", content: "" ,id:""};
Quill.register("modules/resize", QuillResizeImage);

function InsertPopup({user, closeModal, view, setView, form, setForm, posts, setPosts}) {
    
    const quillRef = useRef();
    const [update,setUpdate] = useState(false);

    const serverIp = import.meta.env.VITE_SERVER_NAME;

    // 입력 값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    // 글쓰기 제출
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.content.trim()) {
            alert("제목과 작성자 내용을 모두 입력하세요!");
            return;
        }
        const newPost = {
            postid: form.postid,
            title: form.title,
            id: user.id,
            content: form.content,
            nickname:user.nickname,
            date: new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0,19)//.replace("T"," ")
        };
        setForm(blankForm);
        console.log(newPost.date);
        if(update){
            axios.put(`https://${serverIp}/posts`,JSON.stringify(newPost),{headers:{"Content-Type":"application/json"}})
            .then((res)=>{
                alert(res.data);
                closeModal();
            })
            return;
        }
        axios.post(`https://${serverIp}/posts`,JSON.stringify(newPost),{headers:{"Content-Type":"application/json"}})
        .then((res)=>{
            if(res.status===200){
                axios.get(`https://${serverIp}/posts`)
                .then((res)=>{
                    setPosts(res.data);
                })
            }
        }).catch((err)=>{
            alert(err.data);
        })
        closeModal();
    };

    const customImageHandler = () => {
        const quill = quillRef.current.getEditor();

        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            console.log(file);
            // 현재 커서 위치 저장
            const range = quill.getSelection(true);

            // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
            //quill.insertEmbed(range.index, "image", `/짱구.jpeg`);

            try {
                // 필자는 파이어 스토어에 저장하기 때문에 이런식으로 유틸함수를 따로 만들어줬다 
                // 이런식으로 서버에 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현하면 된다 
                const filePath = `contents/temp/${Date.now()}`;
                //const url = await uploadImage(file, filePath); 
                let url = URL.createObjectURL(file);

                // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
                //quill.deleteText(range.index, 1);
                // 받아온 url을 이미지 태그에 삽입
                console.log(range.index);
                console.log(url);

                // 이 설정을 해줘야 url형식이 들어가진다.
                const Image = Quill.import("formats/image");
                Image.sanitize = (url) => url;

                // 에디터에 이미지 삽입
                quill.insertEmbed(range.index, "image", url);

                // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
                quill.setSelection(range.index + 1);
            } catch (e) {
                quill.deleteText(range.index, 1);
            }
        };

    }
    let modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['link', 'image'],
                ],
                handlers: {
                    image: customImageHandler
                },

            },
            resize: {
                locale: {}
            }
        }
    }, [])


    let formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'link', 'image',
    ]
    return (
        <ModalOverlay >
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h2>글 작성</h2>
                    <CloseButton onClick={closeModal}>&times;</CloseButton>
                </ModalHeader>

                <Form onSubmit={handleSubmit}>
                    <Label>
                        제목
                        <Input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            readOnly={view}
                            autoFocus
                        />
                    </Label>

                    <Label>
                        작성자
                        <Input name="nickname" value={form.nickname} onChange={handleChange} readOnly/>
                    </Label>

                    <Label>
                        내용
                    </Label>
                    <StyledQuill
                        ref={quillRef}
                        theme="snow"
                        modules={modules}
                        value={form.content}
                        onChange={(content) => setForm((f) => ({ ...f, ["content"]: content }))}
                        formats={formats}
                        placeholder="내용을 입력하세요..."
                        readOnly={view}
                        preserveWhitespace
                    />


                    <SubmitButton type="submit">등록</SubmitButton>
                    
                </Form>
                {
                        form.id===user.id?<Button type="button" onClick={()=>{
                            axios.delete(`https://${serverIp}/posts/${form.postid}`)
                            .then((res)=>{
                                alert(res.data);
                                closeModal();
                            }).catch((err)=>alert(err));
                        }}>삭제</Button>:null
                    }
                    {
                        form.id===user.id?<Button type="button" onClick={()=>{
                            setView(false);
                            setUpdate(true);
                        }}>수정</Button>:null
                    }
            </ModalContent>
        </ModalOverlay>
    )
}

export default InsertPopup;

/* 모달 스타일 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 400px;
  border-radius: 10px;
  padding: 20px;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CloseButton = styled.button`
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #4caf50;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  width:60px;
`;

const Input = styled.input`
  margin-top: 5px;
  padding: 8px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const StyledQuill = styled(ReactQuill)`
.ql-editor { 
  min-height:200px;
  width:100%;
  height:300px;
}
`;

const Button = styled.button`
    width:50%;
`