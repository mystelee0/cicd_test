package com.simple.crud_server;

import com.simple.crud_server.entity.User;
import com.simple.crud_server.repository.UserRepository;
import com.simple.crud_server.service.UserServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;


@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
@DisplayName("JPA 테스트")
public class RepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @DisplayName("유저 저장 테스트")
    @Test
    void test0(){
        //given
        User user = new User("testId1","1234","홍길동");

        //when
        User savedUser = userRepository.save(user);

        //then
        Assertions.assertThat(savedUser.getNickname()).isEqualTo("홍길동");
    }

    @DisplayName("유저 조회 테스트")
    @Test
    void test1(){
        //given
        User user = new User("testId1","1234","홍길동");

        //when
        User savedUser = userRepository.save(user);
        User foundUser = userRepository.findById("testId1").orElse(null);
        //then
        Assertions.assertThat(savedUser).isEqualTo(foundUser);
    }

    @DisplayName("유저 삭제 테스트")
    @Test
    void test2(){
        //given
        User user = new User("user1","1234","삭제할유저1");

        //when
        userRepository.save(user); //저장

        User foundUser = userRepository.findById("user1").orElse(null); //조회

        userRepository.deleteById("user1"); //삭제
        User afterDeleteUser = userRepository.findById("user1").orElse(null); //삭제 후 조회

        //then
        Assertions.assertThat(foundUser.getId()).isEqualTo("user1");
        Assertions.assertThat(afterDeleteUser).isNull();
    }
}
