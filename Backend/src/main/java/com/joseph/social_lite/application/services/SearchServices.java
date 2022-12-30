package com.joseph.social_lite.application.services;

import com.joseph.social_lite.data.repository.MemberRepository;
import com.joseph.social_lite.domain.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchServices {
    @Autowired
    private MemberRepository memberRepository;

    public List<Member> find(Specification<Member> specs) {
        return memberRepository.findAll(Specification.where(specs));
    }
}
