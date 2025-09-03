package com.simple.crud_server.controller;

import com.simple.crud_server.entity.User;
import com.simple.crud_server.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserServiceImpl userService;
    // get 유저정보

    // post 유저정보 회원가입
    @PostMapping("/auth/signup")
    ResponseEntity signup(@RequestBody User user){

        User savedUser = userService.saveUser(user);
        if(savedUser==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 성공");
    }
}
