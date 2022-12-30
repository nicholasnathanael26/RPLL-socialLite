package com.joseph.social_lite.application.services;

import com.joseph.social_lite.data.repository.MemberRepository;
import com.joseph.social_lite.data.repository.StoryRepository;
import com.joseph.social_lite.domain.entity.Member;
import com.joseph.social_lite.domain.entity.Story;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;

@Service
public class StoryServices {
    @Autowired
    private StoryRepository storyRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private FollowServices followServices;
    private Story story;
    private Member member;

    public LocalDateTime currentDate(){
        LocalDateTime date = LocalDateTime.now();
        return date;
    }

    public void addStory(MultipartFile file, long idMember, int duration){
        member = new Member();
        member = memberRepository.getOne(idMember);

        story = new Story();

        try {
            story.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
        }catch (IOException e){
            e.printStackTrace();
        }
        story.setDatePost(currentDate());
        story.setOwner(member);
        story.setDuration(duration);
        story.setStatus(true);
        storyRepository.save(story);
    }

    public ArrayList<Story> findStoryByMember(long idMember){
        ArrayList<Member> listFollowing = followServices.getFollowing(idMember);
        if(listFollowing == null){
            return null;
        }
        ArrayList<Story> listStory = new ArrayList<>();
        for(Member member : listFollowing){
            listStory.addAll(storyRepository.findAllByOwnerAndStatus(member,true));
        }
        return listStory;
    }

    public void removeStory(){
        ArrayList<Story> listStory = storyRepository.findAllByStatus(true);
        if(listStory != null){
            for(Story story: listStory) {
                LocalDateTime datePost = story.getDatePost();
                long tempMinDuration = 0;
                long tempDayDuration = (int) (story.getDuration() / 1440);
                tempMinDuration = story.getDuration() % 1440;
                long tempHourDuration = (int) (tempMinDuration / 60);
                tempMinDuration = tempMinDuration % 60;

                if (tempDayDuration >= 2 && tempHourDuration >= 0 && tempMinDuration >= 0) {
                    tempDayDuration = 2;
                    tempHourDuration = 0;
                    tempMinDuration = 0;
                }
                datePost = datePost.plusDays(tempDayDuration);
                datePost = datePost.plusHours(tempHourDuration);
                datePost = datePost.plusMinutes(tempMinDuration);

                if (datePost.isBefore(currentDate())) {
                    storyRepository.deleteById(story.getId());
                }
                System.out.println(datePost);
            }
        }
    }
}
