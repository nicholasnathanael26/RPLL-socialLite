package com.joseph.social_lite.controller;

import com.joseph.social_lite.application.services.SuggestedAccountServices;
import com.joseph.social_lite.domain.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class SuggestAccountController {
    @Autowired
    private SuggestedAccountServices sugestAccountServices;

    @GetMapping("suggestedAccount/{idMember}")
    public ArrayList<Member> getSugestedAccount(@PathVariable("idMember") long idMember){
        return sugestAccountServices.getSugestedAccount(idMember);
    }
}
