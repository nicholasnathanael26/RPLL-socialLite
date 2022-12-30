package com.joseph.social_lite.controller;

import com.joseph.social_lite.application.services.FollowServices;
import com.joseph.social_lite.domain.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class FollowController {
    @Autowired
    private FollowServices followServices;

    @PostMapping("follow/{followerId}/{followingId}")
    public void follow(@PathVariable("followerId") long followerId, @PathVariable("followingId") long followingId){
        this.followServices.follow(followerId, followingId);
    }

    @GetMapping("GetFollower/{id}")
    public ArrayList<Member> getFollower(@PathVariable("id") long id){
        return this.followServices.getFollower(id);
    }

    @GetMapping("GetFollowing/{id}")
    public ArrayList<Member> getFollowing(@PathVariable("id") long id){
        return this.followServices.getFollowing(id);
    }
    @PostMapping("Unfollow/{followerId}/{followingId}")
    public void unfollow(@PathVariable("followerId") long followerId, @PathVariable("followingId") long followingId){
        this.followServices.unfollow(followerId, followingId);
    }
}
