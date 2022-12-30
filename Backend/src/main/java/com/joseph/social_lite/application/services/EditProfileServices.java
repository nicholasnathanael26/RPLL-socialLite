package com.joseph.social_lite.application.services;

import com.joseph.social_lite.data.repository.MemberRepository;
import com.joseph.social_lite.domain.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@Service
public class EditProfileServices {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private AuthServices authServices;

    @Transactional
    public void changePassword(Long memberId, String oldPassword, String newPassword, String reTypeNewPassword){
        Member member = this.memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException(
                        "Member with id " + memberId + " does not exist"
                ));

        String password = member.getPassword().toString();

        if(oldPassword == null){
            throw new IllegalStateException("Old password is required");
        }else if(newPassword == null){
            throw new IllegalStateException("New password is required");
        }else if(reTypeNewPassword == null){
            throw new IllegalStateException("Retype new password is required");
        }else if(!oldPassword.equals(password)){
            throw new IllegalStateException("Old password doesn't match");
        }else if(!newPassword.equals(reTypeNewPassword)){
            throw new IllegalStateException("Retype new password doesn't match");
        }else if(oldPassword.equals(newPassword)){
            throw new IllegalStateException("the old password and the new password are the same");
        }else{
            member.setPassword(authServices.passwordToMD5(newPassword));
        }
    }

    @Transactional
    public void editProfile(Long memberId, String name, String username, String bio, String email, String phoneNumber){
        Member member = this.memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException(
                        "Member with id " + memberId + " does not exist"
                ));
        String tempUsername = member.getUsername();

        if(name != null && !name.equals("")){
            member.setFullname(name);
        }

        if(username != null && !username.equals("") && !username.equals(tempUsername)){
            Optional<Member> memberUsername = this.memberRepository.findMemberByUsername(member.getUsername());
            if (memberUsername.isPresent()){
                throw new IllegalStateException("Username is already exist");
            }else {
                member.setUsername(username);
            }
        }
        if(bio != null && !bio.equals("")){
            member.setBio(bio);
        }
        if(email != null && !email.equals("")){
            member.setEmail(email);
        }
        if(phoneNumber != null && !phoneNumber.equals("")){
            member.setPhoneNumber(phoneNumber);
        }

    }

    @Transactional
    public void editPhotoProfile(Long memberId, MultipartFile file){
        Member member = this.memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException(
                        "Member with id " + memberId + " does not exist"
                ));

        String filename = StringUtils.cleanPath(file.getOriginalFilename());

        if (filename.contains("..")){
            System.out.println("not a valid file");
        }

        try {
            member.setProfileImage(Base64.getEncoder().encodeToString(file.getBytes()));
        }catch (IOException e) {
            e.printStackTrace();
        }
    }
}
