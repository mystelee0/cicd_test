package com.simple.crud_server.service;

import com.simple.crud_server.entity.Post;
import com.simple.crud_server.entity.PostSummaryDto;
import com.simple.crud_server.repository.PostRepository;
import jakarta.transaction.Transactional;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    // 포스트 저장
    public Post savePost(Post post){
        return postRepository.save(post);
    }

    // 포스트 목록 검색
    public List<PostSummaryDto> findPostSummaries(){
        return postRepository.findAllPostsummaries();
    }

    // 포스트 내용 조회
    public Post findPostbyPostid(Long postid){
        return postRepository.findById(postid).orElse(null);
    }
    // 포스트 삭제
    public boolean deletePost(Long postid){
        try{
            postRepository.deleteById(postid);
        } catch (EmptyResultDataAccessException e) {
            return false;
        }
        return true;

    }

    // 포스트 업데이트
    @Transactional
    public boolean updatePost(Post updatedPost) {
        Post post;
        try{
            if(updatedPost!=null){
                System.out.println(updatedPost.getPostid());
                post = postRepository.findById(updatedPost.getPostid())
                        .orElseThrow(() -> new RuntimeException("Post not found"));
                post.setTitle(updatedPost.getTitle());
                post.setContent(updatedPost.getContent());
                return true;
            }
        } catch (Exception e) {

            return false;
        }
        return false;

    }
}
