package com.joseph.social_lite.application.services;

import com.joseph.social_lite.data.repository.LikeRepository;
import com.joseph.social_lite.data.repository.MemberRepository;
import com.joseph.social_lite.data.repository.PostRepository;
import com.joseph.social_lite.domain.entity.Like;
import com.joseph.social_lite.domain.entity.Member;
import com.joseph.social_lite.domain.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class LikeServices {
    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostServices postServices;

    private Member member;
    private Post post;
    private Like likeObject;

    public LocalDateTime currentDate(){
        LocalDateTime date = LocalDateTime.now();
        return date;
    }

    public void addlike(long idPost, long idMember){
        member = new Member();
        member = memberRepository.getOne(idMember);

        post = new Post();
        post = postRepository.getOne(idPost);

        System.out.println("post =>" + post);
        likeObject = new Like();
        likeObject.setDateLike(currentDate());
        likeObject.setFrom(member);
        likeObject.setStatus(true);
        likeObject.setLikedPost(post);
        postServices.updatePostCommentCountOrLikeCount(idPost, true, postServices.LIKE);
        System.out.println("Like =>" + likeObject);
        likeRepository.save(likeObject);
    }

    public ArrayList<Long> getLikedPost(long idMember){
        member = new Member();
        member = memberRepository.getOne(idMember);
        ArrayList<Long> listIdPost = new ArrayList<>();
        List<Like> tempListLike = likeRepository.findAllByFromAndStatus(member, true);
        for(Like tempLike: tempListLike){
            Long idPost = tempLike.getLikedPost().getId();
            listIdPost.add(idPost);
        }
        return listIdPost;
    }

    @Transactional
    public void unlike(long idMember, long idPost){
        member = new Member();
        member = memberRepository.getOne(idMember);

        post = new Post();
        post = postRepository.getOne(idPost);

        likeObject = new Like();
        likeObject = likeRepository.getFirstByFromAndLikedPostAndStatus(member, post, true  );
        likeObject.setStatus(false);
        postServices.updatePostCommentCountOrLikeCount(idPost, false, postServices.LIKE);
    }
}
