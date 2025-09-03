package com.simple.crud_server.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class PostSummaryDto {
    private Long postid;
    private String title;
    private LocalDateTime date;
    private String id;
    private String nickname;
}
