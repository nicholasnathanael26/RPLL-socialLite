package com.joseph.social_lite.data.repository;

import com.joseph.social_lite.domain.entity.Member;
import com.joseph.social_lite.domain.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    ArrayList<Post> findAllByOwnerOrderByDatePostDesc(Member owner);
}
