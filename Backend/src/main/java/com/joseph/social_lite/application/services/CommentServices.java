package com.joseph.social_lite.application.services;

import com.joseph.social_lite.data.dto.CommentDto;
import com.joseph.social_lite.data.repository.CommentRepository;
import com.joseph.social_lite.data.repository.MemberRepository;
import com.joseph.social_lite.data.repository.PostRepository;
import com.joseph.social_lite.domain.entity.Comment;
import com.joseph.social_lite.domain.entity.Member;
import com.joseph.social_lite.domain.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServices {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostServices postServices;

    private Member member;
    private Post post;
    private Comment commentObject;

    public LocalDateTime currentDate(){
        LocalDateTime date = LocalDateTime.now();
        return date;
    }

    public void addComment(long idPost,long idMember, String comment){
        member = new Member();
        member = memberRepository.getOne(idMember);

        post = new Post();
        post = postRepository.getOne(idPost);

        commentObject = new Comment();
        commentObject.setComment(comment);
        commentObject.setDateComment(currentDate());
        commentObject.setFrom(member);
        commentObject.setCommentedPost(post);
        postServices.updatePostCommentCountOrLikeCount(idPost, true, postServices.COMMENT);
        System.out.println(commentObject);
        commentRepository.save(commentObject);
    }

    public ArrayList<CommentDto> getCommentForPost(long idPost){
        post = new Post();
        post = postRepository.getOne(idPost);
        ArrayList<CommentDto> listComment = new ArrayList<>();

        List<Comment> tempListComment = commentRepository.findAllByCommentedPost(post);
        for(Comment tempComment : tempListComment){
            CommentDto comment = new CommentDto();
            comment.setComment(tempComment.getComment());
            comment.setDateComment(tempComment.getDateComment());
            comment.setUsername(tempComment.getFrom().getUsername());
            listComment.add(comment);
        }
        return listComment;
    }
}
