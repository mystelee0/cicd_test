package com.simple.crud_server.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private String id;
    private String nickname;

    public UserDto(User user){
        this.id = user.getId();
        this.nickname = user.getNickname();
    }
}
