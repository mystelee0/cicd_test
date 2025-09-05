import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #bbb;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4a90e2;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top:10px;
  &:hover {
    background-color: #357ab8;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  text-align: center;
  color: ${(props) => (props.error ? 'red' : 'green')};
`;

// Component
function LoginPage({setUser}) {
  const [form, setForm] = useState({
    id: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const serverIp = import.meta.env.VITE_SERVER_IP;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    try {
      const response = await axios.post(`http://${serverIp}/auth/login`, form, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setSuccessMessage('로그인 성공!');
        navigate('/');
      }
    } catch (err) {
      setError('로그인 실패: ' + (err.response?.data || '알 수 없는 오류'));
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="id">아이디</Label>
        <Input
          type="text"
          name="id"
          id="id"
          value={form.id}
          onChange={handleChange}
          required
        />

        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Button type="submit">로그인</Button>
        <Button type="button" onClick={()=>navigate("/auth/signup")}>회원가입</Button>
      </Form>

      {successMessage && <Message>{successMessage}</Message>}
      {error && <Message error>{error}</Message>}
    </Container>
  );
}

export default LoginPage;