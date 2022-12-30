package com.joseph.social_lite.controller;

import com.joseph.social_lite.application.services.DirectMessageServices;
import com.joseph.social_lite.data.dto.DirectMessageDto;
import com.joseph.social_lite.domain.entity.DirectMessage;
import com.joseph.social_lite.domain.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class DirectMessageController {
    @Autowired
    private DirectMessageServices directMessageServices;

    @GetMapping("findAllDM")
    public List<DirectMessage> getDirectMessage(){
        return this.directMessageServices.findAllDirectMessage();
    }

    @GetMapping("findAllChatMember/{idMember}")
    public ArrayList<Member> findAllChatMember(@PathVariable("idMember") long idMember){
        return directMessageServices.findAllChatMember(idMember);
    }

    @GetMapping("findAllDirectMessage/{from}/{to}")
    public List<DirectMessage> getDirectMessageByFromAndTo(@PathVariable("from") Long from,@PathVariable("to") Long to){
        return this.directMessageServices.findAllDirectMessageByFromAndTo(from, to);
    }
    @PostMapping("directMessage")
    public void sendMessage(@RequestBody DirectMessageDto directMessageDto){
        this.directMessageServices.sendMessage(directMessageDto);
    }
}