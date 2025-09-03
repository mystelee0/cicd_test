package com.simple.crud_server.service;

import com.simple.crud_server.entity.User;
import com.simple.crud_server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl {

    private final UserRepository userRepository;

    public User login(User user){
        User foundUser = userRepository.findById(user.getId()).orElse(null);

        if(foundUser == null){
            return null;
        }else if(!foundUser.getPassword().equals(user.getPassword())) {
            return null;
        }

        return foundUser;
    }
}
