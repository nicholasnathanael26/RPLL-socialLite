package com.joseph.social_lite.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ForgetPasswordDto {
    @JsonProperty("newPassword")
    private String newPassword;
    @JsonProperty("reTypeNewPassword")
    private String reTypeNewPassword;
}
