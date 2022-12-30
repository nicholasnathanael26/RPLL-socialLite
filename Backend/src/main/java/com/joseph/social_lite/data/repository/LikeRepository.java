package com.joseph.social_lite.data.repository;

import com.joseph.social_lite.domain.entity.Like;
import com.joseph.social_lite.domain.entity.Member;
import com.joseph.social_lite.domain.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findAllByFromAndStatus(Member from, Boolean status);
    Like getFirstByFromAndLikedPostAndStatus(Member from, Post post, Boolean status);
}
