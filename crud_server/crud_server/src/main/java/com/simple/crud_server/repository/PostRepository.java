package com.simple.crud_server.repository;

import com.simple.crud_server.entity.Post;
import com.simple.crud_server.entity.PostSummaryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {

    @Query("select new com.simple.crud_server.entity.PostSummaryDto(p.postid, p.title, p.date, p.id, p.nickname) from Post p order by p.date desc")
    List<PostSummaryDto> findAllPostsummaries();
}
