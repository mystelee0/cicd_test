package com.simple.crud_server.controller;

import com.simple.crud_server.entity.User;
import com.simple.crud_server.entity.UserDto;
import com.simple.crud_server.service.AuthServiceImpl;
import com.simple.crud_server.service.UserServiceImpl;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthServiceImpl authService;

    // 로그인
    @PostMapping("/auth/login")
    ResponseEntity login(HttpSession session, @RequestBody User user){
        System.out.println("로그인 컨트롤러");
        System.out.println(user.getId());
        System.out.println(user.getPassword());
        User result = authService.login(user);

        if(result==null){
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("로그인 실패");
        }else{
            UserDto userDto = new UserDto(result);
            session.setAttribute("loginUser",userDto);
        }

        return ResponseEntity.ok("로그인 성공");
    }
    // 로그인여부 세션확인
    @GetMapping("/auth/me")
    ResponseEntity isLogin(HttpSession session){
        UserDto user = (UserDto) session.getAttribute("loginUser");
        if(user==null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요합니다.");
        }

        return ResponseEntity.ok(user);
    }
    // 로그아웃
    @GetMapping("/auth/signout")
    ResponseEntity signout(HttpSession session){

        if(session.getAttribute("loginUser")!=null){
            session.removeAttribute("loginUser");
            return ResponseEntity.ok("로그아웃 성공");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 요청");

    }
}
