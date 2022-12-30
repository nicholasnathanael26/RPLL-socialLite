package com.joseph.social_lite.application.services;

import com.joseph.social_lite.data.repository.BookmarkRepository;
import com.joseph.social_lite.data.repository.MemberRepository;
import com.joseph.social_lite.data.repository.PostRepository;
import com.joseph.social_lite.domain.entity.Bookmark;
import com.joseph.social_lite.domain.entity.Member;
import com.joseph.social_lite.domain.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class BookmarkServices {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private BookmarkRepository bookmarkRepository;
    @Autowired
    private MemberRepository memberRepository;

    private Post post;
    private Member member;
    private Bookmark bookmark;

    public LocalDateTime currentDate(){
        LocalDateTime date = LocalDateTime.now();
        return date;
    }

    public void addBookmark(long idPost, long idMember){
        member = new Member();
        member = memberRepository.getOne(idMember);

        post = new Post();
        post = postRepository.getOne(idPost);

        bookmark = new Bookmark();
        bookmark.setDateBookmark(currentDate());
        bookmark.setBookmarkPost(post);
        bookmark.setMember(member);
        bookmark.setStatus(true);
        bookmarkRepository.save(bookmark);
    }

    @Transactional
    public void removeBookmark(long idMember, long idPost){
        member = new Member();
        member = memberRepository.getOne(idMember);

        post = new Post();
        post = postRepository.getOne(idPost);

        bookmark = new Bookmark();
        bookmark = bookmarkRepository.getFirstByMemberAndBookmarkPostAndStatus(member, post, true);
        bookmark.setStatus(false);
    }

    public ArrayList<Post> getBookmarkedPost(long idMember){
        member = new Member();
        member = memberRepository.getOne(idMember);

        ArrayList<Bookmark> listBookmark = bookmarkRepository.findAllByMember(member);
        ArrayList<Post> listPost = new ArrayList<>();

        for(Bookmark bm : listBookmark){
            if (bm.getStatus()){
                listPost.add(bm.getBookmarkPost());
            }
        }
        return listPost;
    }
}
