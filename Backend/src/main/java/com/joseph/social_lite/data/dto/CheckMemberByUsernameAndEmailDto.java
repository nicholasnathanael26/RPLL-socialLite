package com.joseph.social_lite.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CheckMemberByUsernameAndEmailDto {
    @JsonProperty("username")
    private String username;
    @JsonProperty("email")
    private String email;
}
