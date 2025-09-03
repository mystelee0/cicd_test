import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// Styled Components (LoginPage와 동일한 스타일)
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
  margin-top: 10px;

  &:hover {
    background-color: #357ab8;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  text-align: center;
  color: ${(props) => (props.error ? 'red' : 'green')};
`;

function SignUpPage() {
  const [form, setForm] = useState({
    nickname: '',
    id: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:8080/auth/signup', form, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        setSuccessMessage('회원가입 성공! 로그인 페이지로 이동합니다.');
        setTimeout(() => navigate('/auth/login'), 1500); // 1.5초 후 이동
      }
    } catch (err) {
      setError('회원가입 실패: ' + (err.response?.data || '알 수 없는 오류'));
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          type="text"
          name="nickname"
          id="nickname"
          value={form.nickname}
          onChange={handleChange}
          required
        />

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

        <Button type="submit">회원가입</Button>
        <Button type="button" onClick={() => navigate('/auth/login')}>
          로그인으로 돌아가기
        </Button>
      </Form>

      {successMessage && <Message>{successMessage}</Message>}
      {error && <Message error>{error}</Message>}
    </Container>
  );
}

export default SignUpPage;