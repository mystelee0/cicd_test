package com.simple.crud_server;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.simple.crud_server.entity.User;
import com.simple.crud_server.repository.UserRepository;
import com.simple.crud_server.service.AuthServiceImpl;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*; // get, post, put, delete 등
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;    // status, content, jsonPath 등

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@DisplayName("인증 컨트롤러 테스트")
public class LoginTest {

    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthServiceImpl authService;
    @Autowired
    MockMvc mockMvc;

    @BeforeEach
    void setUp(){
        User user = new User("user1","1234","usernickname");
        userRepository.save(user);
    }

    @Test
    @DisplayName("로그인 테스트")
    void TestLogin() throws Exception {
        //유저정보 생성 및 json변환
        User user = new User("user1","1234","");
        ObjectMapper objectMapper = new ObjectMapper();
        String loginRequestJson = objectMapper.writeValueAsString(user);

        // 컨트롤러 테스트
        mockMvc.perform(
                post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginRequestJson)
        ).andExpect(status().isOk());

    }

    @Test
    @DisplayName("로그인 후 세션을 통해 사용자 정보 조회")
    void loginAndCheckSession() throws Exception {

        User loginUser = new User("user1", "1234", "");
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(loginUser);

        // 로그인 요청
        MvcResult result = mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andReturn();

        // 세션 꺼내기
        MockHttpSession session = (MockHttpSession) result.getRequest().getSession();

        // 로그인 세션 존재여부 테스트
        mockMvc.perform(get("/auth/me").session(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("user1"))
                .andExpect(jsonPath("$.nickname").value("usernickname"));
    }

}
