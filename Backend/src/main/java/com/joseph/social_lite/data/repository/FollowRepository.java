package com.joseph.social_lite.data.repository;

import com.joseph.social_lite.domain.entity.Follow;
import com.joseph.social_lite.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Follow getFirstByFollowerAndFollowingAndStatus(Member follower, Member following, Boolean status);
    ArrayList<Follow> findAllByFollowerAndStatus(Member follower, Boolean status);
    ArrayList<Follow> findAllByFollowingAndStatus(Member following, Boolean status);
}
