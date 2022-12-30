package com.joseph.social_lite.controller;

import com.joseph.social_lite.application.services.SearchServices;
import com.joseph.social_lite.domain.entity.Member;
import com.sipios.springsearch.anotation.SearchSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class SearchController {
    @Autowired
    private SearchServices searchServices;

    @GetMapping("")
    public List<Member> find(@SearchSpec Specification<Member> specs) {
        System.out.println(searchServices.find(specs));
        return searchServices.find(specs);
    }

}
