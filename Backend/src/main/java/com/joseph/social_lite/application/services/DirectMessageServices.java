package com.joseph.social_lite.application.services;

import com.joseph.social_lite.data.dto.DirectMessageDto;
import com.joseph.social_lite.data.repository.DirectMessageRepository;
import com.joseph.social_lite.data.repository.MemberRepository;
import com.joseph.social_lite.domain.entity.DirectMessage;
import com.joseph.social_lite.domain.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DirectMessageServices {
    @Autowired
    private DirectMessageRepository directMessageRepository;

    @Autowired
    private MemberRepository memberRepository;

    private DirectMessage directMessage;
    private Member from;
    private Member to;

    public LocalDateTime currentDate(){
        LocalDateTime date = LocalDateTime.now();
        return date;
    }

    public List<DirectMessage> findAllDirectMessage(){
        return directMessageRepository.findAll();
    }
    public List<DirectMessage> findAllDirectMessageByFromAndTo(long from,long to){
        this.from = new Member();
        this.to = new Member();

        this.from = memberRepository.getOne(from);
        this.to = memberRepository.getOne(to);
        return directMessageRepository.findDirectMessages(this.from, this.to, this.to, this.from);
    }

    public ArrayList<Member> findAllChatMember(long from){
        this.from = new Member();
        this.from = memberRepository.getOne(from);

        ArrayList<Member> listMember = new ArrayList<>();
        ArrayList<DirectMessage> listDM = directMessageRepository.findAllByFrom(this.from);

        for(DirectMessage dm : listDM){
            if(!listMember.contains(dm.getTo())){
                listMember.add(dm.getTo());
            }
        }
        listDM = directMessageRepository.findAllByTo(this.from);
        for(DirectMessage dm : listDM){
            if(!listMember.contains(dm.getFrom())){
                listMember.add(dm.getFrom());
            }
        }

        return listMember;
    }


    public void sendMessage(DirectMessageDto directMessageDto){
        from = new Member();
        to = new Member();
        from = memberRepository.getOne(directMessageDto.getFrom());
        to = memberRepository.getOne(directMessageDto.getTo());

        this.directMessage = new DirectMessage();
        this.directMessage.setMessage(directMessageDto.getMessage());
        this.directMessage.setFrom(from);
        this.directMessage.setTo(to);
        this.directMessage.setDateMessage(currentDate());

        this.directMessageRepository.save(this.directMessage);
    }

}
