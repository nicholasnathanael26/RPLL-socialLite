package com.joseph.social_lite.application.services;

import com.joseph.social_lite.data.repository.MemberRepository;
import com.joseph.social_lite.domain.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class SuggestedAccountServices {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private FollowServices followServices;

    public ArrayList<Member> getSugestedAccount(long idMember){
        ArrayList<Member> listMember = new ArrayList<>();
        ArrayList<Member> listFollowingMember = followServices.getFollowing(idMember);
        Member self = memberRepository.getOne(idMember);

        List<Member> allMember = memberRepository.findAll();

        for(Member member: allMember){
            if(!member.equals(self) && !listFollowingMember.contains(member)){
                listMember.add(member);
            }
        }
        if(listMember == null){
            return null;
        }

        Collections.shuffle(listMember);
        return listMember;
    }
}
