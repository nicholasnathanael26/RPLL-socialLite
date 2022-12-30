package com.joseph.social_lite.data.repository;

import com.joseph.social_lite.domain.entity.Comment;
import com.joseph.social_lite.domain.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByCommentedPost(Post post);
}
