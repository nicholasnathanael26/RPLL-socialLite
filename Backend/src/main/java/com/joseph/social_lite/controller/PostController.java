package com.joseph.social_lite.controller;

import com.joseph.social_lite.application.services.PostServices;
import com.joseph.social_lite.domain.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class PostController {
    @Autowired
    private PostServices postServices;

    @PostMapping("post/{id}")
    public void posting(@RequestParam("file") MultipartFile file , @RequestParam("caption") String caption , @PathVariable("id") Long id){
        postServices.posting(file, id, caption);
    }

    @GetMapping("getPost/{id}")
    public ArrayList<Post> getPost(@PathVariable("id") Long id){
        return postServices.getPostByIdMember(id);
    }

    @GetMapping("getPostForUser")
    public ArrayList<Post> getPostForUser(){
        return postServices.getPostForUser();
    }

    @GetMapping("getPostForMember/{idMember}")
    public ArrayList<Post> getPostForMember(@PathVariable("idMember") Long idMember){
        return postServices.getPostForMember(idMember);
    }

    @GetMapping("getPostByIdPost/{idPost}")
    public Post getPostByIdPost(@PathVariable("idPost") long idPost){
        return postServices.getPostByIdPost(idPost);
    }

    @PostMapping("editCaption/{id}")
    public void editCaption(@PathVariable("id") Long id, String caption){
        postServices.editCaption(id, caption);
    }
}
