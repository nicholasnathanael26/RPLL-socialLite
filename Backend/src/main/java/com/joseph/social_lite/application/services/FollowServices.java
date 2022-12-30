package com.joseph.social_lite.application.services;

import com.joseph.social_lite.data.repository.FollowRepository;
import com.joseph.social_lite.data.repository.MemberRepository;
import com.joseph.social_lite.domain.entity.Follow;
import com.joseph.social_lite.domain.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class FollowServices {
    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private MemberRepository memberRepository;

    private Follow follow;
    private Member follower;
    private Member following;

    public LocalDateTime currentDate(){
        LocalDateTime date = LocalDateTime.now();
        return date;
    }

    public void follow(long followerId,long followingId){
        this.follower = new Member();
        this.following = new Member();

        this.follower = memberRepository.getOne(followerId);
        this.following = memberRepository.getOne(followingId);

        this.follow = new Follow();
        this.follow.setDateFollow(currentDate());
        this.follow.setFollower(this.follower);
        this.follow.setFollowing(this.following);
        this.follow.setStatus(true);

        Follow temp = followRepository.getFirstByFollowerAndFollowingAndStatus(this.follower, this.following, true);

        if(temp == null) {
            if (followerId == followingId) {
                throw new IllegalStateException("Can't follow your self");
            } else {
                this.followRepository.save(this.follow);
            }
        }else if(!temp.isStatus()){
            if (followerId == followingId) {
                throw new IllegalStateException("Can't follow your self");
            } else {
                this.followRepository.save(this.follow);
            }
        }else{
            throw new IllegalStateException("follow is already exist");
        }
    }

    public ArrayList<Member> getFollowing(long id){
        this.follower = new Member();
        this.follower = memberRepository.getOne(id);

        ArrayList<Member> listMember = new ArrayList<>();
        ArrayList<Follow> listFollow = followRepository.findAllByFollowerAndStatus(follower,true);

        for(Follow follow: listFollow){
            listMember.add(follow.getFollowing());
        }
        return listMember;
    }

    public ArrayList<Member> getFollower(long id){
        this.following = new Member();
        this.following = memberRepository.getOne(id);

        ArrayList<Member> listMember = new ArrayList<>();
        ArrayList<Follow> listFollow = followRepository.findAllByFollowingAndStatus(following,true);

        for(Follow follow: listFollow){
            listMember.add(follow.getFollower());
        }
        return listMember;
    }

    @Transactional
    public void unfollow(long followerId,long followingId){
        this.follower = new Member();
        this.following = new Member();

        this.follower = memberRepository.getOne(followerId);
        this.following = memberRepository.getOne(followingId);

        this.follow = new Follow();
        this.follow = followRepository.getFirstByFollowerAndFollowingAndStatus(this.follower,this.following, true);
        if(follow != null){
            this.follow.setStatus(false);
        }else{
            throw new IllegalStateException("follow is not exist");
        }
    }
}
