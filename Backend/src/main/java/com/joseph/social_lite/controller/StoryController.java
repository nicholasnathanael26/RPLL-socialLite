package com.joseph.social_lite.controller;

import com.joseph.social_lite.application.services.StoryServices;
import com.joseph.social_lite.domain.entity.Story;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class StoryController {
    @Autowired
    private StoryServices storyServices;

    @PostMapping("AddStory/{idMember}")
    public void addStory(@RequestParam("file") MultipartFile file , @RequestParam("duration") int duration , @PathVariable("idMember") Long idMember){
        storyServices.addStory(file,idMember,duration);
    }

    @GetMapping("FindAllFollowedStory/{idMember}")
    public ArrayList<Story> findAllFollowedStory(@PathVariable("idMember") Long idMember){
        return storyServices.findStoryByMember(idMember);
    }

    @DeleteMapping("RemoveStory")
    public void removeStory(){
        storyServices.removeStory();
    }
}
