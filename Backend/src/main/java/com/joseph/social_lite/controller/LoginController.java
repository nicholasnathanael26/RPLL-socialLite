package com.joseph.social_lite.controller;

import com.joseph.social_lite.data.dto.LoginDto;
import com.joseph.social_lite.domain.entity.Member;
import com.joseph.social_lite.application.services.AuthServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class LoginController {

    @Autowired
    private AuthServices authServices;

    @GetMapping("GetUsers")
    public List<Member> getUsers(){
        return this.authServices.getUsers();
    }

    @PostMapping("Login")
    public Optional<Member> login(@RequestBody LoginDto loginDto){
        this.authServices.login(loginDto.getUsername(), loginDto.getPassword());
        return this.authServices.getMemberById();
    }

}
