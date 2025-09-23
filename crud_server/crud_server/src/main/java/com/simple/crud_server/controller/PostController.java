package com.simple.crud_server.controller;

import com.simple.crud_server.entity.Post;
import com.simple.crud_server.entity.PostSummaryDto;
import com.simple.crud_server.service.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostServiceImpl postService;

    // get posts
    @GetMapping("/posts")
    List<PostSummaryDto> getPosts(){
        return postService.findPostSummaries();
    }

    // get post
    @GetMapping("/posts/{postid}")
    ResponseEntity getPost(@PathVariable Long postid){
        System.out.println("포스트 컨트롤러");
        Post post = postService.findPostbyPostid(postid);
        if(post==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("요청한 포스트를 찾지 못하였음");
        }
        return ResponseEntity.ok(post);
    }

    //post post
    @PostMapping("/posts")
    ResponseEntity savePost(@RequestBody Post post){
        System.out.println("포스트 저장 컨트롤러");
        System.out.println(post.getContent());
        System.out.println(post.getDate());
        Post savedPost = postService.savePost(post);
        if(savedPost==null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("포스트 저장 실패");
        }

        return ResponseEntity.ok("포스트 저장 완료");

    }
    //delete post
    @DeleteMapping("/posts/{postid}")
    ResponseEntity deletePost(@PathVariable Long postid){
        boolean result = postService.deletePost(postid);

        if(!result){
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 실패");
        }

        return ResponseEntity.ok("삭제 성공");
    }

    //put post
    @PutMapping("/posts")
    ResponseEntity updatePost(@RequestBody Post post){
        System.out.println("포스트 업데이트");
        System.out.println(post.getTitle());
        boolean bool = postService.updatePost(post);

        if(bool) return ResponseEntity.ok("수정 완료");
        else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("업데이트 실패");
    }

}
