package com.simple.crud_server.service;

import com.simple.crud_server.entity.User;
import com.simple.crud_server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    // 유저 저장
    public User saveUser(User user){
        return userRepository.save(user);
    }

    // 유저 검색
    public Optional<User> findUserById(String id){
        return userRepository.findById(id);
    }

    // 유저 삭제
    public void deleteUser(User user){
        //Optional<User> found = userRepository.findById(user.getId());
        userRepository.deleteById(user.getId());
    }
}
