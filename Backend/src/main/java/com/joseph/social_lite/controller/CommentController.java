package com.joseph.social_lite.controller;

import com.joseph.social_lite.application.services.CommentServices;
import com.joseph.social_lite.data.dto.CommentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class CommentController {
    @Autowired
    private CommentServices commentServices;

    @PostMapping("CommentPost/{idPost}/{idMember}")
    public void addComment(@PathVariable("idPost") long idPost, @PathVariable("idMember") long idMember, @RequestParam("comment") String comment){
        commentServices.addComment(idPost, idMember, comment);
    }

    @GetMapping("GetCommentForPost/{idPost}")
    public ArrayList<CommentDto> getCommentForPost(@PathVariable("idPost") long idPost){
        return commentServices.getCommentForPost(idPost);
    }
}
