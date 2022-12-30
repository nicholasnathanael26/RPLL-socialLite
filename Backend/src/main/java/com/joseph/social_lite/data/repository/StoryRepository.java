package com.joseph.social_lite.data.repository;

import com.joseph.social_lite.domain.entity.Member;
import com.joseph.social_lite.domain.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    ArrayList<Story> findAllByOwnerAndStatus(Member member, Boolean status);
    ArrayList<Story> findAllByStatus(Boolean status);
}
