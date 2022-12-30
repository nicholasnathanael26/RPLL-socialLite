package com.joseph.social_lite.application.services;

import com.joseph.social_lite.data.repository.MemberRepository;
import com.joseph.social_lite.data.repository.PostRepository;
import com.joseph.social_lite.domain.entity.Member;
import com.joseph.social_lite.domain.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PostServices {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private FollowServices followServices;

    private Post post;
    private Member member;
    public final int COMMENT = 0;
    public final int LIKE = 1;

    public LocalDateTime currentDate(){
        LocalDateTime date = LocalDateTime.now();
        return date;
    }

    public void posting(MultipartFile file,long id, String caption){
        member = new Member();
        member = memberRepository.getOne(id);
        this.post = new Post();

        String filename = StringUtils.cleanPath(file.getOriginalFilename());

        if (filename.contains("..")){
            System.out.println("not a valid file");
        }

        this.post.setFilename(filename);
        try {
            this.post.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
        }catch (IOException e){
            e.printStackTrace();
        }

        this.post.setOwner(member);
        this.post.setDatePost(currentDate());
        this.post.setCaption(caption);
        postRepository.save(this.post);
    }

    public ArrayList<Post> getPostByIdMember(long id){
        member = new Member();
        member = memberRepository.getOne(id);
        return postRepository.findAllByOwnerOrderByDatePostDesc(member);
    }

    public ArrayList<Post> getPostForUser(){
        long countPost = postRepository.count();
        ArrayList<Post> listPost = new ArrayList<>();
        ArrayList<Long> showed = new ArrayList<>();

        List<Post> tempListPost = postRepository.findAll();

        listPost.addAll(tempListPost);
        if(listPost == null){
            return null;
        }
        Collections.shuffle(listPost);

        return listPost;
    }

    @Transactional
    public void editCaption(long id, String caption){
        post = this.postRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "post with id " + id + " does not exist"
                ));
        post.setCaption(caption);
    }

    @Transactional
    public void updatePostCommentCountOrLikeCount(long id, boolean add, int type) {
        post = this.postRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "post with id " + id + " does not exist"
                ));
        if(type == 0){
            if (add) {
                post.setCountComment(post.getCountComment() + 1);
            } else {
                post.setCountComment(post.getCountComment() - 1);
            }
        }else{
            if (add) {
                post.setCountLike(post.getCountLike() + 1);
            } else {
                post.setCountLike(post.getCountLike() - 1);
            }
        }
    }

    public ArrayList<Post> getPostForMember(long idMember) {
        ArrayList<Member> listFollowing = followServices.getFollowing(idMember);
        List<Post> allPost = postRepository.findAll();
        ArrayList<Post> listPost = new ArrayList<>();
        if(listFollowing.size() == 0 || listFollowing == null){
            System.out.println("masuk");
            return getPostForUser();
        }
        for(Post post: allPost){
            if(listFollowing.contains(post.getOwner())){
                listPost.add(post);
            }
        }
//        for(Member member: listFollowing){
//            listPost.addAll(postRepository.findAllByOwnerOrderByDatePostDesc(member));
//        }
        Collections.reverse(listPost);
        return listPost;
    }

    public Post getPostByIdPost(long idPost){
        return postRepository.getOne(idPost);
    }
}
