package com.joseph.social_lite.controller;

import com.joseph.social_lite.application.services.BookmarkServices;
import com.joseph.social_lite.data.dto.AddAndDeleteBookmarkDto;
import com.joseph.social_lite.domain.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class BookmarkController {
    @Autowired
    private BookmarkServices bookmarkServices;

    @PostMapping("AddBookmark")
    public void addBookmark(@RequestBody AddAndDeleteBookmarkDto addAndDeleteBookmarkDto){
        bookmarkServices.addBookmark(addAndDeleteBookmarkDto.getIdPost(), addAndDeleteBookmarkDto.getIdMember());
    }

    @GetMapping("GetBookmarkedPost/{id}")
    public ArrayList<Post> getBookmarkedPost(@PathVariable("id") long idMember){
        return bookmarkServices.getBookmarkedPost(idMember);
    }

    @PostMapping("RemoveBookmark")
    public void removeBookmark(@RequestBody AddAndDeleteBookmarkDto addAndDeleteBookmarkDto){
        bookmarkServices.removeBookmark(addAndDeleteBookmarkDto.getIdMember(), addAndDeleteBookmarkDto.getIdPost());
    }
}
