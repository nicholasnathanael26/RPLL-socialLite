package com.joseph.social_lite.controller;

import com.joseph.social_lite.application.services.LikeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class LikeController {
    @Autowired
    private LikeServices likeServices;

    @PostMapping("LikePost/{idPost}/{idMember}")
    public void addLike(@PathVariable("idPost") long idPost, @PathVariable("idMember") long idMember){
        likeServices.addlike(idPost, idMember);
    }

    @GetMapping("GetLikedPost/{idMember}")
    public ArrayList<Long> getLikedPost(@PathVariable("idMember") long idMember){
        return likeServices.getLikedPost(idMember);
    }

    @PostMapping("UnlikePost/{idPost}/{idMember}")
    public void unlike(@PathVariable("idPost") long idPost, @PathVariable("idMember") long idMember){
        likeServices.unlike(idMember, idPost);
    }
}
