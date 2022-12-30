package com.joseph.social_lite.controller;

import com.joseph.social_lite.application.services.EditProfileServices;
import com.joseph.social_lite.data.dto.ChangePasswordDto;
import com.joseph.social_lite.data.dto.EditProfileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class EditProfileController {
    @Autowired
    private EditProfileServices editProfileServices;

    @PostMapping("/ChangePassword/{memberId}")
    public void changePassword(
            @PathVariable("memberId") Long memberId,
            @RequestBody ChangePasswordDto changePasswordDto){
        this.editProfileServices.changePassword(memberId, changePasswordDto.getOldPassword(), changePasswordDto.getNewPassword(), changePasswordDto.getReTypeNewPassword());
    }

    @PostMapping("/EditProfile/{memberId}")
    public void editProfile(
            @PathVariable("memberId") Long memberId,
            @RequestBody EditProfileDto editProfileDto){
        this.editProfileServices.editProfile(memberId, editProfileDto.getName(), editProfileDto.getUsername(), editProfileDto.getBio(), editProfileDto.getEmail(), editProfileDto.getPhoneNumber());
    }

    @PostMapping("/EditPhotoProfile/{memberId}")
    public void editPhotoProfile(@PathVariable("memberId") Long memberId, @RequestParam("file") MultipartFile file){
        this.editProfileServices.editPhotoProfile(memberId, file);
    }
}
