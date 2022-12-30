package com.joseph.social_lite.controller;

import com.joseph.social_lite.domain.entity.Member;
import com.joseph.social_lite.application.services.AuthServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class RegisterController {

    @Autowired
    private AuthServices authServices;

    @PostMapping(value = "/SignUp")
    public Member signUpToDB(@RequestBody final Member member){
        return this.authServices.signUp(member);
    }
}
